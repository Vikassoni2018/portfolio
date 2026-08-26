/**
 * Renders a schema.org graph. Server component, so the markup is in the
 * initial HTML where crawlers can read it without executing JavaScript.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
