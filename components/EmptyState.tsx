export function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-5 py-8 text-center text-sm text-[#77737f]">
      {label}
    </div>
  );
}
