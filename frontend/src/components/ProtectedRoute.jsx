import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children, onNavigate }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return children;
  }

  return (
    <section className="container-shell grid min-h-[calc(100vh-80px)] place-items-center py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        <p className="section-eyebrow">Protected page</p>
        <h1 className="mt-3 text-3xl font-black text-ink">Login required</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Please login to access this section of your job portal workspace.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('auth')}
          className="btn-primary mt-6 w-full"
        >
          Go to Login
        </button>
      </div>
    </section>
  );
}
