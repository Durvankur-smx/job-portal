const applications = [
  {
    id: 1,
    role: 'Frontend Developer',
    company: 'TechNova',
    status: 'Interview',
    date: 'Apr 22, 2026',
  },
  {
    id: 2,
    role: 'Product Designer',
    company: 'Northstar Labs',
    status: 'Applied',
    date: 'Apr 20, 2026',
  },
  {
    id: 3,
    role: 'Data Analyst',
    company: 'BrightPath',
    status: 'Saved',
    date: 'Apr 18, 2026',
  },
];

export default function Applications() {
  return (
    <section className="container-shell py-12">
      <div className="mb-8">
        <p className="section-eyebrow">Application tracker</p>
        <h1 className="mt-2 text-4xl font-black text-ink">Applications</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Keep tabs on each opportunity from saved role to final conversation.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-card">
        <div className="hidden grid-cols-[1.2fr_1fr_140px_150px] border-b border-slate-200 bg-slate-100 px-5 py-4 text-sm font-black text-slate-600 md:grid">
          <span>Role</span>
          <span>Company</span>
          <span>Status</span>
          <span>Date</span>
        </div>
        <div className="divide-y divide-slate-100">
          {applications.map((application) => (
            <article
              key={application.id}
              className="grid gap-3 px-5 py-5 transition hover:bg-brand-50 md:grid-cols-[1.2fr_1fr_140px_150px] md:items-center"
            >
              <h2 className="font-black text-ink">{application.role}</h2>
              <p className="font-bold text-slate-600">{application.company}</p>
              <span className="w-max rounded-lg bg-brand-50 px-3 py-1 text-xs font-black text-brand-700">
                {application.status}
              </span>
              <p className="text-sm font-bold text-slate-500">
                {application.date}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
