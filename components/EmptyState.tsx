export function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-indigo-200/80 bg-white/75 px-5 py-8 text-center text-sm font-medium text-slate-600 backdrop-blur-md">
      {label}
    </div>
  );
}
