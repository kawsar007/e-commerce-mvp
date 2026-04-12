'use client';

import { validateLogin } from '@/lib/validators';
import { useAuthStore } from '@/store/authStore';
import type { LoginErrors, LoginForm } from '@/types';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Eye, EyeOff,
  Loader2,
  Lock,
  Mail,
  Package,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

const EMPTY: LoginForm = { email: '', password: '', rememberMe: false };

export function LoginPageClient() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [form, setForm] = useState<LoginForm>(EMPTY);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [serverErr, setServerErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerErr('');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateLogin(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setServerErr('');
    const result = await login(form.email, form.password);
    setLoading(false);

    if (!result.ok) {
      setServerErr(result.error ?? 'Login failed. Please try again.');
      return;
    }
    setSuccess(true);
    setTimeout(() => router.push('/'), 1200);
  };

  return (
    /* Full-viewport flex — centres card vertically on all screens */
    <div className="min-h-[calc(100dvh-120px)] flex items-center justify-center bg-gray-50 px-4 py-8 sm:py-12">
      <div className="w-full max-w-md">

        {/* ── Card ─────────────────────────────────────────── */}
        <div className="bg-white shadow-md border border-gray-100 overflow-hidden rounded-sm">
          <div className="h-1 w-full" style={{ backgroundColor: '#0e7490' }} />

          <div className="px-5 sm:px-8 py-7 sm:py-8">

            {/* Logo + heading */}
            <div className="text-center mb-6 sm:mb-8">
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <Package className="w-7 h-7" style={{ color: '#0e7490' }} />
                <span className="font-display text-2xl font-bold text-gray-800">
                  Print<span style={{ color: '#0e7490' }}>Craft</span>
                </span>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Welcome back</h1>
              <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
            </div>

            {/* Demo hint */}
            <div
              className="flex items-start gap-2.5 p-3 mb-5 text-xs rounded"
              style={{ backgroundColor: '#f0fdfa', borderLeft: '3px solid #0e7490' }}
            >
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#0e7490' }} />
              <div className="text-gray-600 break-all">
                <span className="font-semibold text-gray-800">Demo: </span>
                demo@printcraft.com / Demo@1234
              </div>
            </div>

            {/* Server error */}
            {serverErr && (
              <div className="flex items-start gap-2 p-3 mb-5 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{serverErr}</span>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="flex items-center gap-2 p-3 mb-5 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Login successful! Redirecting…</span>
              </div>
            )}

            {/* ── Form ─────────────────────────────────────── */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">

              {/* Email */}
              <div>
                <label htmlFor="login-email" className="label">Email Address</label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    style={{ color: errors.email ? '#ef4444' : '#9ca3af' }}
                  />
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="input-field pl-10 text-base sm:text-sm"
                    style={errors.email ? { borderColor: '#ef4444', boxShadow: '0 0 0 1px #ef4444' } : {}}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'login-email-err' : undefined}
                  />
                </div>
                {errors.email && (
                  <p id="login-email-err" role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="login-password" className="label mb-0">Password</label>
                  <Link
                    href="#"
                    className="text-xs font-medium hover:underline"
                    style={{ color: '#0e7490' }}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    style={{ color: errors.password ? '#ef4444' : '#9ca3af' }}
                  />
                  <input
                    id="login-password"
                    name="password"
                    type={showPw ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="input-field pl-10 pr-11 text-base sm:text-sm"
                    style={errors.password ? { borderColor: '#ef4444', boxShadow: '0 0 0 1px #ef4444' } : {}}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'login-pw-err' : undefined}
                  />
                  {/* Show/hide toggle — large tap target for mobile */}
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-0 top-0 h-full w-11 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p id="login-pw-err" role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" /> {errors.password}
                  </p>
                )}
              </div>

              {/* Remember me — large tap target */}
              <label className="flex items-center gap-3 cursor-pointer select-none py-1">
                <input
                  id="login-rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={form.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded accent-[#0e7490] shrink-0"
                />
                <span className="text-sm text-gray-600">Remember me for 30 days</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || success}
                className="btn-primary w-full py-3.5 text-sm gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                style={{ minHeight: '48px' }}
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Signing in…</>
                ) : success ? (
                  <><CheckCircle className="w-4 h-4" /> Signed in!</>
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-gray-400">New to PrintCraft?</span>
              </div>
            </div>

            {/* Register CTA */}
            <Link
              href="/auth/register"
              className="flex items-center justify-center gap-2 w-full py-3.5 border-2 text-sm font-semibold transition-colors rounded-sm"
              style={{ borderColor: '#0e7490', color: '#0e7490', minHeight: '48px' }}
            >
              <UserPlus className="w-4 h-4" />
              Create a Free Account
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-5 px-2">
          By signing in you agree to our{' '}
          <Link href="#" className="underline hover:text-gray-600">Terms</Link> and{' '}
          <Link href="#" className="underline hover:text-gray-600">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}