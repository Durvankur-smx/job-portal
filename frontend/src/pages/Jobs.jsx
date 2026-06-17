import { useMemo, useState } from 'react';
import JobCard from '../components/JobCard.jsx';

export default function Jobs({ jobs, onNavigate }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');

  const jobTypes = ['All', ...new Set(jobs.map((job) => job.type))];
  const filteredJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesType = type === 'All' || job.type === type;
      const matchesQuery =
        !normalizedQuery ||
        [job.title, job.company, job.location, ...job.tags]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesType && matchesQuery;
    });
  }, [jobs, query, type]);

  return (
    <section className="container-shell py-12">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-eyebrow">Open positions</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Jobs</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Search handpicked roles and apply to the opportunities that match
            your skills, location, and work style.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[minmax(220px,1fr)_180px] lg:w-[520px]">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search jobs"
            className="field-input"
          />
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="field-input"
          >
            {jobTypes.map((jobType) => (
              <option key={jobType}>{jobType}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onApply={() => onNavigate('applications')}
          />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-2xl font-black text-ink">No jobs found</h2>
          <p className="mt-2 text-slate-600">
            Try a different keyword or job type.
          </p>
        </div>
      )}
    </section>
  );
}
