export default function JobCard({ job, onApply }) {
  const logoInitials = job.company
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-brand-100 hover:shadow-lift">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-base font-black text-brand-700 ring-1 ring-brand-100 transition group-hover:bg-brand-700 group-hover:text-white">
            {logoInitials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-brand-700">
              {job.company}
            </p>
            <h3 className="mt-1 text-xl font-black leading-snug text-ink">
              {job.title}
            </h3>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
          {job.type}
        </span>
      </div>

      <p className="line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
        {job.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 text-sm font-bold text-slate-600 sm:grid-cols-2">
        <span className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-brand-700"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 21s7-5.3 7-12a7 7 0 1 0-14 0c0 6.7 7 12 7 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {job.location}
        </span>
        <span className="flex items-center gap-2 sm:justify-end">
          <svg
            className="h-5 w-5 text-brand-700"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 2v20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {job.salary}
        </span>
      </div>

      <button
        type="button"
        onClick={onApply}
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-black text-white shadow-md transition hover:bg-brand-600 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-100"
      >
        Apply Now
      </button>
    </article>
  );
}
