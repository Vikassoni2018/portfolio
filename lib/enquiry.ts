export const enquiryServices = [
  "Custom Shopify App Development",
  "Shopify GraphQL API Integrations",
  "Shopify Backend Automation",
  "Shopify Subscription App Development",
  "Payment Gateway and Third-Party Integrations",
  "Shopify Store Customization and Performance Optimization",
  "PHP / Symfony / Other",
] as const;
export const enquiryBudgets = [
  "Prefer to discuss",
  "Under $1,000",
  "$1,000–$3,000",
  "$3,000–$10,000",
  "$10,000+",
] as const;
export type Enquiry = {
  name: string;
  email: string;
  companyUrl: string;
  service: string;
  description: string;
  budget: string;
};
export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;
export const emailPattern = /^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/;

export function validateEnquiry(input: unknown): {
  data: Enquiry;
  errors: EnquiryErrors;
} {
  const source =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};
  const read = (key: keyof Enquiry) =>
    typeof source[key] === "string" ? source[key].trim() : "";
  const data: Enquiry = {
    name: read("name"),
    email: read("email"),
    companyUrl: read("companyUrl"),
    service: read("service"),
    description: read("description"),
    budget: read("budget"),
  };
  const errors: EnquiryErrors = {};
  if (
    data.name.length < 2 ||
    data.name.length > 100 ||
    /[\r\n\x00-\x1f]/.test(data.name)
  )
    errors.name = "Enter your name (2–100 characters).";
  if (!emailPattern.test(data.email) || data.email.length > 254)
    errors.email = "Enter a valid email address.";
  if (!enquiryServices.some((item) => item === data.service))
    errors.service = "Choose the service you need.";
  if (data.description.length < 30 || data.description.length > 5000)
    errors.description = "Describe your project in 30–5,000 characters.";
  if (data.budget && !enquiryBudgets.some((item) => item === data.budget))
    errors.budget = "Choose a listed budget range.";
  if (data.companyUrl) {
    try {
      const url = new URL(data.companyUrl);
      if (
        !["http:", "https:"].includes(url.protocol) ||
        !url.hostname.includes(".") ||
        url.username ||
        url.password ||
        data.companyUrl.length > 500
      )
        throw new Error();
    } catch {
      errors.companyUrl =
        "Enter a full website URL, such as https://yourstore.com.";
    }
  }
  return { data, errors };
}
