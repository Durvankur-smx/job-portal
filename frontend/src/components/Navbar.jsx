import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'jobs', label: 'Jobs' },
  { id: 'applications', label: 'Applications' },
  { id: 'profile', label: 'Profile' },
];

export default function Navbar({ activePage, onNavigate, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const initials = useMemo(() => {
    const label = user?.name || user?.email || 'User';
    return label
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }, [user]);

  const handleNavigate = (page) => {
    onNavigate(page);
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 text-white shadow-lg backdrop-blur">
      <nav className="container-shell flex min-h-20 items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => handleNavigate('home')}
          className="flex items-center gap-3 rounded-xl text-left transition hover:scale-[1.02]"
          aria-label="Go to home"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-base font-black text-white shadow-lg shadow-brand-700/20">
            JP
          </span>
          <span>
            <span className="block text-lg font-black leading-5 text-white">
              JobPortal
            </span>
            <span className="block text-xs font-bold text-slate-400">
              Hire and get hired
            </span>
          </span>
        </button>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition duration-200 ${
                activePage === item.id
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen((value) => !value)}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1 pl-1 pr-3 transition hover:bg-white/10"
                aria-label="Open profile menu"
                aria-expanded={isProfileOpen}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-sm font-black text-white">
                  {initials}
                </span>
                <span className="max-w-32 truncate text-sm font-bold text-slate-200">
                  {user?.name || user?.email}
                </span>
                <svg
                  className={`h-4 w-4 text-slate-400 transition ${
                    isProfileOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.2 7.2a1 1 0 0 1 1.4 0L10 10.6l3.4-3.4a1 1 0 1 1 1.4 1.4l-4.1 4.1a1 1 0 0 1-1.4 0L5.2 8.6a1 1 0 0 1 0-1.4Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 text-slate-900 shadow-lift">
                  <div className="border-b border-slate-100 px-3 py-3">
                    <p className="truncate text-sm font-black">
                      {user?.name || 'Job Portal User'}
                    </p>
                    <p className="truncate text-xs font-bold text-slate-500">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('profile')}
                    className="mt-2 w-full rounded-xl px-3 py-2 text-left text-sm font-bold transition hover:bg-slate-100"
                  >
                    View Profile
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-xl px-3 py-2 text-left text-sm font-bold text-red-600 transition hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => handleNavigate('auth')}
              className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-black text-white transition hover:border-brand-500 hover:bg-brand-600"
            >
              Login
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white shadow-sm transition hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="flex h-5 w-5 flex-col justify-center gap-1.5">
            <span
              className={`h-0.5 rounded-full bg-white transition ${
                isOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 rounded-full bg-white transition ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 rounded-full bg-white transition ${
                isOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-slate-950 md:hidden">
          <div className="container-shell flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
                  activePage === item.id
                    ? 'bg-white text-slate-950'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="mt-3 border-t border-white/10 pt-3">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-600 text-sm font-black text-white">
                      {initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-black text-white">
                        {user?.name || 'Job Portal User'}
                      </p>
                      <p className="truncate text-xs font-bold text-slate-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-xl border border-white/10 px-4 py-3 text-left text-sm font-black text-white transition hover:border-red-400 hover:bg-red-500/10 hover:text-red-100"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleNavigate('auth')}
                  className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-black text-white transition hover:bg-brand-500"
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
