import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState('');

  const displayName = user?.name || 'Job Portal User';
  const displayEmail = user?.email || 'user@example.com';
  const displayRole = (user?.role || 'USER').toUpperCase();

  const initials = useMemo(
    () =>
      displayName
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    [displayName],
  );

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <section className="container-shell py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="section-eyebrow">Account</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Profile</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Manage your personal details and profile image for job applications.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="flex flex-col items-center md:w-64">
              <div className="relative">
                <div className="grid h-36 w-36 overflow-hidden rounded-full bg-brand-50 text-4xl font-black text-brand-700 ring-4 ring-white shadow-lg">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="grid place-items-center">{initials}</span>
                  )}
                </div>
                <label className="absolute bottom-1 right-1 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-ink text-white shadow-lg transition hover:bg-brand-700 focus-within:ring-4 focus-within:ring-brand-100">
                  <span className="sr-only">Upload profile image</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 17.5V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="m7 9 5-5 5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 4v13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="sr-only"
                  />
                </label>
              </div>

              <p className="mt-4 text-center text-sm font-bold text-slate-500">
                Upload profile image
              </p>
            </div>

            <div className="flex-1">
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-3xl font-black text-ink">{displayName}</h2>
                  <p className="mt-2 text-base font-bold text-slate-500">
                    {displayEmail}
                  </p>
                </div>
                <span className="w-max rounded-full bg-brand-50 px-4 py-2 text-xs font-black text-brand-700 ring-1 ring-brand-100">
                  {displayRole}
                </span>
              </div>

              <div className="grid gap-4 py-6 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase tracking-normal text-slate-500">
                    Name
                  </p>
                  <p className="mt-2 font-black text-ink">{displayName}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase tracking-normal text-slate-500">
                    Email
                  </p>
                  <p className="mt-2 break-all font-black text-ink">
                    {displayEmail}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase tracking-normal text-slate-500">
                    Role
                  </p>
                  <p className="mt-2 font-black text-ink">{displayRole}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-black uppercase tracking-normal text-slate-500">
                    Status
                  </p>
                  <p className="mt-2 font-black text-ink">Active</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="button" className="btn-primary">
                  Edit Profile
                </button>
                <label className="btn-secondary cursor-pointer">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
