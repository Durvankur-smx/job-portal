export default function StatCard({ label, value, note }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-card">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-ink">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{note}</p>
    </div>
  );
}
