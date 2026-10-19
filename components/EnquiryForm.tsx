"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import {
  enquiryBudgets,
  enquiryServices,
  validateEnquiry,
  type EnquiryErrors,
} from "@/lib/enquiry";
import { trackConversion } from "@/lib/analytics";

export function EnquiryForm({ email }: { email: string }) {
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef(0);
  const pending = useRef(false);
  const attempt = useRef({ fingerprint: "", id: "" });
  const start = () => {
    if (!startedAt.current) startedAt.current = Date.now();
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form));
    const { data, errors: validation } = validateEnquiry(raw);
    setErrors(validation);
    if (Object.keys(validation).length) {
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      form
        .querySelector<HTMLElement>(`[name="${Object.keys(validation)[0]}"]`)
        ?.focus();
      return;
    }
    pending.current = true;
    setStatus("loading");
    setMessage("");
    const fingerprint = JSON.stringify(data);
    if (attempt.current.fingerprint !== fingerprint)
      attempt.current = { fingerprint, id: crypto.randomUUID() };
    trackConversion("contact_form_submit", { service: data.service });
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          website: raw.website,
          startedAt: startedAt.current,
          requestId: attempt.current.id,
        }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        setErrors(result?.errors ?? {});
        throw new Error(
          result?.error ||
            "Your enquiry could not be sent. Please email me directly.",
        );
      }
      setStatus("success");
      setMessage(result.message);
      trackConversion("enquiry_success", { service: data.service });
      form.reset();
      startedAt.current = 0;
      attempt.current = { fingerprint: "", id: "" };
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "Delivery could not be confirmed. Please retry or email me directly.",
      );
    } finally {
      pending.current = false;
    }
  }

  const fieldClass =
    "mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-base text-slate-950 shadow-sm focus:border-blue-600 focus:outline-blue-600";
  const errorFor = (name: keyof EnquiryErrors) =>
    errors[name] ? (
      <p
        id={`${name}-error`}
        className="mt-2 text-sm font-semibold text-red-700"
      >
        {errors[name]}
      </p>
    ) : null;
  const errorProps = (name: keyof EnquiryErrors) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  return (
    <form
      onSubmit={submit}
      onFocus={start}
      onPointerDown={start}
      noValidate
      className="relative mt-10 rounded-2xl bg-white p-5 text-slate-950 sm:p-8"
      aria-labelledby="enquiry-title"
      aria-busy={status === "loading"}
    >
      <h3 id="enquiry-title" className="text-2xl font-extrabold">
        Tell me about your project
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Share the problem, your current setup and your timeline. Fields marked *
        are required.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="enquiry-name" className="text-sm font-bold">
            Name *
          </label>
          <input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            className={fieldClass}
            {...errorProps("name")}
          />
          {errorFor("name")}
        </div>
        <div>
          <label htmlFor="enquiry-email" className="text-sm font-bold">
            Business Email *
          </label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            className={fieldClass}
            {...errorProps("email")}
          />
          {errorFor("email")}
        </div>
        <div>
          <label htmlFor="enquiry-url" className="text-sm font-bold">
            Company / Store URL{" "}
            <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input
            id="enquiry-url"
            name="companyUrl"
            type="url"
            autoComplete="url"
            placeholder="https://yourstore.com"
            maxLength={500}
            className={fieldClass}
            {...errorProps("companyUrl")}
          />
          {errorFor("companyUrl")}
        </div>
        <div>
          <label htmlFor="enquiry-service" className="text-sm font-bold">
            Service Needed *
          </label>
          <select
            id="enquiry-service"
            name="service"
            required
            defaultValue=""
            className={fieldClass}
            {...errorProps("service")}
          >
            <option value="" disabled>
              Select a service
            </option>
            {enquiryServices.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
          {errorFor("service")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-description" className="text-sm font-bold">
            Project Description *
          </label>
          <textarea
            id="enquiry-description"
            name="description"
            required
            minLength={30}
            maxLength={5000}
            rows={5}
            placeholder="What needs to change? Include your current setup and preferred timeline."
            className={fieldClass}
            {...errorProps("description")}
          />
          {errorFor("description")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="enquiry-budget" className="text-sm font-bold">
            Budget Range{" "}
            <span className="font-normal text-slate-500">(optional, USD)</span>
          </label>
          <select
            id="enquiry-budget"
            name="budget"
            defaultValue=""
            className={fieldClass}
            {...errorProps("budget")}
          >
            <option value="">Select a range (optional)</option>
            {enquiryBudgets.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
          {errorFor("budget")}
        </div>
      </div>
      <div aria-hidden="true" className="enquiry-honeypot">
        <label htmlFor="enquiry-website">Leave this field empty</label>
        <input
          id="enquiry-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <p className="mt-5 text-xs leading-5 text-slate-500">
        Your details are used to respond to this enquiry and sent by email
        through Resend. Please omit passwords, API keys and confidential
        customer data.
      </p>
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <LoaderCircle
              className="animate-spin"
              size={18}
              aria-hidden="true"
            />{" "}
            Sending enquiry…
          </>
        ) : (
          <>
            Send Project Enquiry <ArrowUpRight size={18} aria-hidden="true" />
          </>
        )}
      </button>
      <div aria-live="polite" aria-atomic="true">
        {message ? (
          <p
            role={status === "error" ? "alert" : "status"}
            className={`mt-5 rounded-xl border p-4 text-sm leading-6 ${status === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-red-200 bg-red-50 text-red-900"}`}
          >
            {message}
          </p>
        ) : null}
      </div>
      <p className="mt-4 break-words text-sm text-slate-600">
        Prefer email?{" "}
        <a
          href={`mailto:${email}`}
          className="font-bold text-blue-700 underline underline-offset-4"
        >
          {email}
        </a>
      </p>
      <noscript>
        <p className="mt-4 text-sm">
          This form needs JavaScript. Please use the email link to send your
          brief.
        </p>
      </noscript>
    </form>
  );
}
