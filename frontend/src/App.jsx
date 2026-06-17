import { useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Jobs from './pages/Jobs.jsx';
import Applications from './pages/Applications.jsx';
import Profile from './pages/Profile.jsx';
import LoginRegister from './pages/LoginRegister.jsx';
import { jobs as initialJobs } from './data/jobs.js';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const pages = {
  home: Home,
  jobs: Jobs,
  applications: Applications,
  profile: Profile,
  auth: LoginRegister,
};

const protectedPages = new Set(['applications', 'profile']);

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [jobs] = useState(initialJobs);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState('profile');
  const { isAuthenticated, logout } = useAuth();

  const Page = pages[activePage] ?? Home;
  const featuredJobs = useMemo(() => jobs.slice(0, 3), [jobs]);

  const navigate = (page) => {
    if (protectedPages.has(page) && !isAuthenticated) {
      setRedirectAfterLogin(page);
      setActivePage('auth');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = () => {
    setActivePage(redirectAfterLogin || 'profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    logout();
    setActivePage('home');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-ink">
      <Navbar
        activePage={activePage}
        onNavigate={navigate}
        onLogout={handleLogout}
      />
      <main>
        {protectedPages.has(activePage) ? (
          <ProtectedRoute onNavigate={navigate}>
            <Page
              jobs={jobs}
              featuredJobs={featuredJobs}
              onNavigate={navigate}
            />
          </ProtectedRoute>
        ) : (
          <Page
            jobs={jobs}
            featuredJobs={featuredJobs}
            onNavigate={navigate}
            onAuthSuccess={handleAuthSuccess}
          />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
