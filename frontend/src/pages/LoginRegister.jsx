import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const EyeIcon = ({ hidden }) => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    {hidden ? (
      <>
        <path
          d="m3 3 18 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M10.6 10.6a2 2 0 0 0 2.8 2.8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9.9 5.2A10.5 10.5 0 0 1 12 5c5.5 0 9 5.5 9 7a8.2 8.2 0 0 1-2.2 3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.1 6.8C4.2 8.1 3 10.2 3 12c0 1.5 3.5 7 9 7 1.4 0 2.7-.3 3.8-.9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ) : (
      <>
        <path
          d="M3 12c0-1.5 3.5-7 9-7s9 5.5 9 7-3.5 7-9 7-9-5.5-9-7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )}
  </svg>
);

export default function LoginRegister({ onAuthSuccess }) {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login, register, authError, setAuthError } = useAuth();

  const isRegister = mode === 'register';

  const handleChange = (event) => {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setAuthError('');

    try {
      if (isRegister) {
        await register(form);
      } else {
        await login({ email: form.email, password: form.password });
      }

      setForm({ name: '', email: '', password: '' });
      onAuthSuccess?.();
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(isRegister ? 'login' : 'register');
    setShowPassword(false);
    setIsLoading(false);
    setAuthError('');
  };

  return (
    <section className="container-shell grid min-h-[calc(100vh-80px)] place-items-center py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ink text-lg font-black text-white shadow-lg">
            JP
          </div>
          <h1 className="mt-5 text-3xl font-black text-ink">
            {isRegister ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {isRegister
              ? 'Start saving jobs and tracking applications in one place.'
              : 'Login to manage your profile, jobs, and applications.'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {isRegister && (
              <label className="block">
                <span className="field-label">Full name</span>
                <input
                  className="field-input mt-2"
                  name="name"
                  type="text"
                  placeholder="Druv Sharma"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />
              </label>
            )}

            <label className="block">
              <span className="field-label">Email address</span>
              <input
                className="field-input mt-2"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </label>

            <label className="block">
              <span className="field-label">Password</span>
              <div className="relative mt-2">
                <input
                  className="field-input pr-12"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-ink focus:outline-none focus:ring-4 focus:ring-brand-100"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon hidden={showPassword} />
                </button>
              </div>
            </label>

            {!isRegister && (
              <div className="flex items-center justify-between gap-4 text-sm">
                <label className="flex items-center gap-2 font-bold text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-brand-700 focus:ring-brand-100"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="font-black text-brand-700 transition hover:text-brand-600"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {authError && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand-700 px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lift focus:outline-none focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  {isRegister ? 'Creating account' : 'Signing in'}
                </span>
              ) : isRegister ? (
                'Create Account'
              ) : (
                'Login'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm font-bold text-slate-500">
            {isRegister ? 'Already have an account?' : 'New to JobPortal?'}{' '}
            <button
              type="button"
              onClick={switchMode}
              className="font-black text-brand-700 transition hover:text-brand-600"
            >
              {isRegister ? 'Login' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
