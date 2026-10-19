import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
const compile = (file) =>
  ts.transpileModule(
    readFileSync(new URL(`../${file}`, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText;
function moduleFrom(file, dependencies = {}, globals = {}) {
  const exports = {};
  vm.runInNewContext(compile(file), {
    exports,
    require: (name) => dependencies[name] ?? require(name),
    URL,
    Request,
    Response,
    Buffer,
    AbortSignal,
    fetch: () => {
      throw new Error("Real network calls forbidden in tests");
    },
    process: { env: {} },
    ...globals,
  });
  return exports;
}
const validation = moduleFrom("lib/enquiry.ts");
const delivery = moduleFrom("lib/enquiry-delivery.ts");
const valid = {
  name: "Test Person",
  email: "test@example.com",
  companyUrl: "https://example.com",
  service: validation.enquiryServices[0],
  description: "A test-only project description with enough characters.",
  budget: "",
};
const config = {
  apiKey: "test-key",
  from: "sender@example.com",
  to: "owner@example.com",
};
const requestId = "7d75a52c-1b19-4c9a-a79d-f8a7a16aeabc";
const payload = () => ({
  ...valid,
  website: "",
  startedAt: Date.now() - 6000,
  requestId,
});
const request = (body = payload(), headers = {}) =>
  new Request("http://localhost:3000/api/enquiry", {
    method: "POST",
    headers: {
      origin: "http://localhost:3000",
      "Content-Type": "application/json",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
function route(env = {}, send) {
  return moduleFrom(
    "app/api/enquiry/route.ts",
    {
      "@/lib/enquiry": validation,
      "@/lib/enquiry-delivery": {
        ...delivery,
        deliverEnquiry: (data, settings, key) =>
          delivery.deliverEnquiry(data, settings, key, send),
      },
    },
    { process: { env } },
  );
}
const configuredEnv = {
  RESEND_API_KEY: "test-key",
  CONTACT_FROM_EMAIL: "sender@example.com",
  CONTACT_TO_EMAIL: "owner@example.com",
};

test("validates required fields and accepts optional fields omitted", () => {
  assert.equal(
    Object.keys(validation.validateEnquiry({ ...valid, companyUrl: "" }).errors)
      .length,
    0,
  );
  const errors = validation.validateEnquiry({
    name: "x",
    email: "bad",
    companyUrl: "javascript:alert(1)",
    service: "invented",
    description: "short",
    budget: "invalid",
  }).errors;
  assert.equal(Object.keys(errors).length, 6);
});
test("rejects header injection, invalid field types and oversized descriptions", () => {
  const errors = validation.validateEnquiry({
    ...valid,
    name: "Name\r\nInjected",
    email: "a@example.com\r\nBcc:a@evil.com",
    description: "x".repeat(5001),
  }).errors;
  assert.ok(errors.name && errors.email && errors.description);
  assert.ok(validation.validateEnquiry({ ...valid, name: 42 }).errors.name);
  assert.ok(
    validation.validateEnquiry({
      ...valid,
      companyUrl: "https://user:password@example.com",
    }).errors.companyUrl,
  );
});
test("delivery uses server credentials, safe plain text, reply-to and idempotency", async () => {
  let called = false;
  const id = await delivery.deliverEnquiry(
    valid,
    config,
    "test-id",
    async (url, options) => {
      called = true;
      assert.equal(url, "https://api.resend.com/emails");
      assert.equal(options.headers.Authorization, "Bearer test-key");
      assert.equal(options.headers["Idempotency-Key"], "test-id");
      const email = JSON.parse(options.body);
      assert.equal(email.reply_to, valid.email);
      assert.deepEqual(email.to, [config.to]);
      assert.equal(email.html, undefined);
      assert.ok(email.text.includes(valid.description));
      return Response.json({ id: "provider-accepted-id" });
    },
  );
  assert.equal(id, "provider-accepted-id");
  assert.ok(called);
});
test("delivery never succeeds without config or provider acknowledgement", async () => {
  await assert.rejects(() => delivery.deliverEnquiry(valid, {}, "id"));
  await assert.rejects(() =>
    delivery.deliverEnquiry(valid, config, "id", async () =>
      Response.json({ error: "rejected" }, { status: 401 }),
    ),
  );
  await assert.rejects(() =>
    delivery.deliverEnquiry(valid, config, "id", async () => Response.json({})),
  );
  await assert.rejects(() =>
    delivery.deliverEnquiry(valid, config, "id", async () => {
      throw new Error("timeout");
    }),
  );
});
test("unconfigured route reports 503 and never reports sent", async () => {
  const response = await route().POST(request());
  assert.equal(response.status, 503);
  const body = await response.json();
  assert.equal(body.ok, undefined);
  assert.match(body.error, /not been sent/);
});
test("route rejects cross-origin, wrong content type, invalid JSON and oversized body", async () => {
  assert.equal(
    (
      await route().POST(
        request(payload(), { origin: "https://other.example" }),
      )
    ).status,
    403,
  );
  assert.equal(
    (await route().POST(request(payload(), { "Content-Type": "text/plain" })))
      .status,
    415,
  );
  assert.equal((await route().POST(request("{broken"))).status, 400);
  assert.equal(
    (
      await route().POST(
        request({ ...payload(), description: "x".repeat(25000) }),
      )
    ).status,
    413,
  );
});
test("route blocks honeypot and rapid completion, validates before delivery", async () => {
  assert.equal(
    (await route().POST(request({ ...payload(), website: "bot" }))).status,
    400,
  );
  assert.equal(
    (await route().POST(request({ ...payload(), startedAt: Date.now() })))
      .status,
    400,
  );
  const response = await route().POST(request({ ...payload(), email: "bad" }));
  assert.equal(response.status, 422);
  assert.ok((await response.json()).errors.email);
});
test("route rate limits repeated attempts", async () => {
  const api = route();
  for (let index = 0; index < 5; index++)
    assert.equal((await api.POST(request())).status, 503);
  const response = await api.POST(request());
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "900");
});
test("route succeeds only after provider acceptance, with stable retry key", async () => {
  const keys = [];
  const api = route(configuredEnv, async (_url, options) => {
    keys.push(options.headers["Idempotency-Key"]);
    return Response.json({ id: "mock-message-id" });
  });
  for (let index = 0; index < 2; index++) {
    const response = await api.POST(request());
    assert.equal(response.status, 200);
    assert.equal((await response.json()).ok, true);
  }
  assert.equal(keys[0], keys[1]);
});
test("route reports provider failure without leaking credentials", async () => {
  const response = await route(configuredEnv, async () =>
    Response.json({ error: "secret-provider-response" }, { status: 500 }),
  ).POST(request());
  assert.equal(response.status, 502);
  const body = JSON.stringify(await response.json());
  assert.ok(
    !body.includes("secret-provider-response") && !body.includes("test-key"),
  );
});
test("15-hour offer data, wording, position and destination are preserved", () => {
  const current = JSON.parse(
    readFileSync(new URL("../data/profile.json", import.meta.url), "utf8"),
  );
  assert.equal(
    current.offerLabel,
    "Launch offer: Your first 15 development hours are free. Standard charges apply after that.",
  );
  const navbar = readFileSync(
    new URL("../components/PublicNavbar.tsx", import.meta.url),
    "utf8",
  );
  assert.match(
    navbar,
    /href="\/#contact"[\s\S]*?<span>\{profile.offerLabel\}<\/span>/,
  );
  assert.ok(navbar.indexOf("{profile.offerLabel ?") < navbar.indexOf("<nav"));
});
