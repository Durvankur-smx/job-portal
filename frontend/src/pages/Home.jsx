import JobCard from '../components/JobCard.jsx';
import StatCard from '../components/StatCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const dashboardLinks = [
  { label: 'Browse Jobs', page: 'jobs' },
  { label: 'Applications', page: 'applications' },
  { label: 'Profile', page: 'profile' },
];

export default function Home({ featuredJobs, jobs, onNavigate }) {
  const { user, isAuthenticated } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <section className="container-shell py-8 sm:py-12">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg lg:sticky lg:top-28 lg:h-max">
          <div className="mb-6">
            <p className="section-eyebrow">Dashboard</p>
            <h2 className="mt-2 text-2xl font-black text-ink">JobPortal</h2>
          </div>

          <nav className="space-y-2" aria-label="Dashboard navigation">
            {dashboardLinks.map((item) => (
              <button
                key={item.page}
                type="button"
                onClick={() => onNavigate(item.page)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-black text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
                <span aria-hidden="true">+</span>
              </button>
            ))}
          </nav>

          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-500">Profile status</p>
            <div className="mt-3 h-2 rounded-full bg-slate-200">
              <div className="h-2 w-[92%] rounded-full bg-brand-700" />
            </div>
            <p className="mt-3 text-xs font-bold text-slate-500">
              92% complete
            </p>
          </div>
        </aside>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="section-eyebrow">
                  {isAuthenticated ? 'Welcome back' : 'Welcome'}
                </p>
                <h1 className="mt-2 text-4xl font-black leading-tight text-ink">
                  Hi {firstName}, ready to find your next role?
                </h1>
                <p className="mt-3 max-w-2xl text-slate-600">
                  Track applications, review recent roles, and keep your job
                  search moving from one clean dashboard.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('jobs')}
                  className="btn-primary"
                >
                  View Jobs
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('applications')}
                  className="btn-secondary"
                >
                  Applications
                </button>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <StatCard
              label="Total Jobs"
              value={jobs.length}
              note="Open roles available"
            />
            <StatCard
              label="Applications"
              value="18"
              note="Tracked this month"
            />
            <StatCard label="Saved Jobs" value="7" note="Ready to review" />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-eyebrow">Recent jobs</p>
                <h2 className="mt-2 text-3xl font-black text-ink">
                  Latest opportunities
                </h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('jobs')}
                className="btn-secondary w-max"
              >
                View All
              </button>
            </div>

            <div className="grid gap-5 xl:grid-cols-3">
              {featuredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={() => onNavigate('applications')}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
