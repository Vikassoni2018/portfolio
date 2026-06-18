const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outputPath = path.join(root, "public/uploads/resume/vikas_cv_updated.pdf");

const profile = readJson("data/profile.json");
const projects = readJson("data/projects.json");
const experience = readJson("data/experience.json");
const education = readJson("data/education.json");

const projectDetails = {
  "product-subscription-app": {
    role: "Full Stack Developer",
    stack: "Shopify APIs, PHP, Symfony, REST APIs, webhooks, recurring billing, wallet/card payments",
    bullets: [
      "Built recurring order workflows for flexible delivery cycles, pause, skip, cancel, renew, and customer self-service actions.",
      "Implemented payment and webhook flows to synchronize billing, order, admin, and customer subscription states.",
      "Improved merchant controls for subscription plans, customer subscriptions, transaction status, and support operations."
    ]
  },
  "payment-service-api-docs": {
    role: "Backend/API Developer",
    stack: "PHP, Symfony, Stripe, PayPal, Razorpay, REST APIs, webhooks, refunds, API documentation",
    bullets: [
      "Developed reusable payment APIs for payment creation, transaction status checks, refunds, and webhook processing.",
      "Created integration-ready API documentation and endpoint structures for external application usage.",
      "Mapped gateway responses into reliable internal transaction states with secure request handling."
    ]
  },
  "fizazzle-booking-platform": {
    role: "Full Stack Developer",
    stack: "Laravel, Inertia, React, Stripe, booking workflows, vendor assignment, invoices, email templates",
    bullets: [
      "Built booking flows across customer, admin, and vendor panels for service selection, assignment, and status management.",
      "Worked on invoices, PDF output, Stripe settings, payment status handling, and customer/vendor/admin email templates.",
      "Implemented vendor booking and earnings workflows while keeping customer-facing booking views simple and focused."
    ]
  },
  "user-central-webkul": {
    role: "Full Stack Developer",
    stack: "PHP, Symfony, account management, authentication, service workflows, admin/customer modules",
    bullets: [
      "Contributed to centralized account and customer service workflows for a user management portal.",
      "Worked on backend logic, interface refinements, account flows, and customer-facing service handling.",
      "Supported maintainable module structure for reliable access and service operations."
    ]
  },
  "reviewhub-stellen-infotech": {
    role: "Shopify App Developer",
    stack: "Shopify, PHP/Symfony, webhooks, product reviews, Liquid widgets, storefront scripts",
    bullets: [
      "Developed product review, star rating, testimonial, moderation, and storefront widget features.",
      "Worked on storefront templates, average rating widgets, review forms, and review administration flows.",
      "Integrated Shopify order webhook-based review request flows and customer/product review data handling."
    ]
  },
  "shopify-amp-app": {
    role: "Shopify Developer",
    stack: "Shopify, AMP templates, Liquid, performance optimization, SEO, responsive storefront UI",
    bullets: [
      "Built AMP-compatible storefront templates for faster mobile pages and SEO readiness.",
      "Worked on merchant configuration, responsive rendering, storefront compatibility, and speed improvements.",
      "Optimized UI structure and assets for fast-loading mobile commerce experiences."
    ]
  }
};

const skillGroups = [
  ["Backend", "PHP, Symfony, Laravel, Node.js, REST APIs, GraphQL, MySQL, Redis, RabbitMQ"],
  ["Shopify", "Shopify app development, Shopify APIs, Liquid, themes, app blocks, webhooks, storefront widgets"],
  ["Payments", "Stripe, PayPal, Razorpay, refunds, wallet payments, card payments, transaction status handling"],
  ["Frontend", "React, Next.js, Inertia, JavaScript, Ajax, Tailwind CSS, Less CSS, responsive UI"],
  ["Tools", "Git, GitHub, Postman, API documentation, Agile workflows, code review, team mentoring"]
];

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const M = 42;
const W = PAGE_W - M * 2;

const pages = [];
let ops = [];
let y = PAGE_H - M;

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
}

function clean(value) {
  return String(value || "")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "");
}

function esc(value) {
  return clean(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function rgb(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => (parseInt(h.slice(i, i + 2), 16) / 255).toFixed(3)).join(" ");
}

function color(hex, stroke = false) {
  ops.push(`${rgb(hex)} ${stroke ? "RG" : "rg"}`);
}

function newPage() {
  if (ops.length) pages.push(ops.join("\n"));
  ops = [];
  y = PAGE_H - M;
}

function rect(x, yy, w, h, hex) {
  color(hex);
  ops.push(`${x} ${yy} ${w} ${h} re f`);
}

function line(x1, y1, x2, y2, hex = "#d1d5db", width = 0.7) {
  color(hex, true);
  ops.push(`${width} w ${x1} ${y1} m ${x2} ${y2} l S`);
}

function text(value, x, yy, size = 9, font = "F1", hex = "#111827") {
  color(hex);
  ops.push(`BT /${font} ${size} Tf ${x.toFixed(2)} ${yy.toFixed(2)} Td (${esc(value)}) Tj ET`);
}

function approx(value, size) {
  return clean(value).length * size * 0.47;
}

function wrap(value, size, maxW) {
  const words = clean(value).split(/\s+/).filter(Boolean);
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (approx(candidate, size) <= maxW || !current) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function ensure(height) {
  if (y - height < M) newPage();
}

function para(value, x = M, maxW = W, size = 8.7, leading = 11.5, hex = "#374151") {
  const lines = wrap(value, size, maxW);
  ensure(lines.length * leading + 2);
  for (const item of lines) {
    text(item, x, y, size, "F1", hex);
    y -= leading;
  }
}

function bullet(value, x = M, maxW = W, size = 8.4, leading = 11.1) {
  const lines = wrap(value, size, maxW - 13);
  ensure(lines.length * leading + 1);
  text("-", x, y, size, "F2", "#0f766e");
  text(lines[0] || "", x + 12, y, size, "F1", "#374151");
  y -= leading;
  for (const item of lines.slice(1)) {
    text(item, x + 12, y, size, "F1", "#374151");
    y -= leading;
  }
}

function section(title) {
  ensure(28);
  y -= 8;
  text(title.toUpperCase(), M, y, 10.5, "F2", "#0f766e");
  y -= 6;
  line(M, y, PAGE_W - M, y, "#99f6e4", 1.1);
  y -= 12;
}

function renderHeader() {
  rect(0, PAGE_H - 108, PAGE_W, 108, "#f8fafc");
  rect(0, PAGE_H - 108, PAGE_W, 6, "#0f766e");
  text(profile.name, M, PAGE_H - 42, 25, "F2", "#111827");
  text(profile.title, M, PAGE_H - 60, 9.8, "F1", "#0f766e");
  text([profile.email, profile.mobile, profile.location].filter(Boolean).join("  |  "), M, PAGE_H - 78, 8.9, "F1", "#475569");
  y = PAGE_H - 128;
}

function renderSkills() {
  section("Technical Skills");
  const leftX = M;
  const rightX = M + W / 2 + 12;
  const colW = W / 2 - 12;
  for (let index = 0; index < skillGroups.length; index += 2) {
    ensure(38);
    const rowY = y;
    const left = skillGroups[index];
    const right = skillGroups[index + 1];

    renderSkillCell(left, leftX, rowY, colW);
    if (right) renderSkillCell(right, rightX, rowY, colW);

    const leftH = 12 + wrap(left[1], 7.8, colW).length * 10;
    const rightH = right ? 12 + wrap(right[1], 7.8, colW).length * 10 : 0;
    y -= Math.max(leftH, rightH) + 6;
  }
}

function renderSkillCell(skill, x, yy, maxW) {
  text(skill[0], x, yy, 8.7, "F2", "#111827");
  const lines = wrap(skill[1], 7.8, maxW);
  let lineY = yy - 11;
  for (const item of lines) {
    text(item, x, lineY, 7.8, "F1", "#475569");
    lineY -= 10;
  }
}

function renderExperience() {
  section("Professional Experience");
  for (const item of experience) {
    ensure(82);
    text(item.role, M, y, 10.2, "F2", "#111827");
    text(`${item.company} | ${item.startDate} - ${item.endDate}`, M + 280, y, 8.4, "F1", "#475569");
    y -= 13;
    para(item.description, M, W, 8.4, 11.2);

    if (item.company === "Stellen Infotech") {
      bullet("Deliver Shopify and Laravel workflows with admin/customer/vendor panels, email templates, payment settings, and polished UI behavior.");
      bullet("Review intern work, clarify implementation details, and help maintain consistent coding practices.");
    } else if (item.company === "Webkul") {
      bullet("Built production Shopify app features around subscriptions, payment integrations, AMP storefronts, APIs, and merchant/customer workflows.");
      bullet("Coordinated with stakeholders, analyzed requirements, mentored team members, reviewed code, and supported feature delivery.");
    } else {
      bullet("Prepared requirement documents, tested web/mobile features, and reported issues clearly.");
    }
    y -= 4;
  }
}

function renderProjects() {
  section("Selected Projects");
  for (const project of projects) {
    const detail = projectDetails[project.id] || {};
    ensure(104);
    text(project.name, M, y, 10.1, "F2", "#111827");
    y -= 11;
    text(`${detail.role || "Full Stack Developer"} | ${project.link}`, M, y, 7.8, "F1", "#0f766e");
    y -= 11;
    para(`Tech: ${detail.stack || "PHP, Shopify, APIs, frontend/backend workflows"}`, M, W, 8, 10.8, "#475569");
    para(project.description, M, W, 8.2, 10.9, "#374151");
    for (const item of detail.bullets || []) bullet(item, M, W, 8.1, 10.8);
    y -= 5;
  }
}

function renderEducation() {
  section("Education");
  for (const item of education) {
    ensure(30);
    text(item.degree, M, y, 9.4, "F2", "#111827");
    text(`${item.institution} | ${item.startYear} - ${item.endYear}`, M + 245, y, 8.2, "F1", "#475569");
    y -= 12;
    para(item.description, M, W, 8.2, 10.8, "#374151");
    y -= 3;
  }
}

function renderPdf() {
  renderHeader();
  section("Professional Summary");
  para(profile.bio, M, W, 8.8, 11.7);
  bullet("Strong hands-on experience across Shopify SaaS apps, payment integrations, booking systems, custom storefront experiences, and backend services.");
  bullet("Comfortable owning features end to end: requirement analysis, database/API design, admin and customer UI, webhook handling, testing, and maintenance.");
  bullet("Experienced in guiding junior developers through implementation, reviews, task breakdowns, and knowledge transfer.");
  renderSkills();
  renderExperience();
  renderProjects();
  renderEducation();
}

function writePdf() {
  if (ops.length) pages.push(ops.join("\n"));

  const objects = [];
  const add = (obj) => {
    objects.push(obj);
    return objects.length;
  };

  const fontRegular = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const fontBold = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const pageIds = [];
  const contentIds = [];

  for (const page of pages) {
    const stream = Buffer.from(page, "ascii");
    contentIds.push(add(`<< /Length ${stream.length} >>\nstream\n${page}\nendstream`));
  }

  const pagesId = objects.length + pages.length + 1;
  for (let i = 0; i < pages.length; i += 1) {
    pageIds.push(
      add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 ${fontRegular} 0 R /F2 ${fontBold} 0 R >> >> /Contents ${contentIds[i]} 0 R >>`)
    );
  }

  add(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`);
  const catalogId = add(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 0; i < objects.length; i += 1) {
    offsets.push(Buffer.byteLength(pdf, "ascii"));
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xref = Buffer.byteLength(pdf, "ascii");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

  fs.writeFileSync(outputPath, Buffer.from(pdf, "ascii"));
  console.log(`Wrote ${outputPath} with ${pages.length} page(s).`);
}

renderPdf();
writePdf();
