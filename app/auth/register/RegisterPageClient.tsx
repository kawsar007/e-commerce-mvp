'use client';

import { validateRegister } from '@/lib/validators';
import { useAuthStore } from '@/store/authStore';
import type { RegisterErrors, RegisterForm } from '@/types';
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle,
  Eye, EyeOff,
  Loader2,
  Lock,
  LogIn,
  Mail,
  Map,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

const DISTRICTS = [
  'Bagerhat', 'Bandarban', 'Barguna', 'Barishal', 'Bhola', 'Bogura', 'Brahmanbaria',
  'Chandpur', 'Chapai Nawabganj', 'Chattogram', 'Chuadanga', "Cox's Bazar", 'Cumilla',
  'Dhaka', 'Dinajpur', 'Faridpur', 'Feni', 'Gaibandha', 'Gazipur', 'Gopalganj',
  'Habiganj', 'Jamalpur', 'Jashore', 'Jhalokati', 'Jhenaidah', 'Joypurhat',
  'Khagrachhari', 'Khulna', 'Kishoreganj', 'Kurigram', 'Kushtia', 'Lakshmipur',
  'Lalmonirhat', 'Madaripur', 'Magura', 'Manikganj', 'Meherpur', 'Moulvibazar',
  'Munshiganj', 'Mymensingh', 'Naogaon', 'Narail', 'Narayanganj', 'Narsingdi',
  'Natore', 'Netrokona', 'Nilphamari', 'Noakhali', 'Pabna', 'Panchagarh',
  'Patuakhali', 'Pirojpur', 'Rajbari', 'Rajshahi', 'Rangamati', 'Rangpur',
  'Satkhira', 'Shariatpur', 'Sherpur', 'Sirajganj', 'Sunamganj', 'Sylhet',
  'Tangail', 'Thakurgaon',
];

const EMPTY: RegisterForm = {
  name: '', email: '', phone: '', password: '', confirmPassword: '',
  address: '', city: '', district: '', agreeToTerms: false,
};

function getStrength(pw: string): { level: 0 | 1 | 2 | 3 | 4; label: string; color: string } {
  if (!pw) return { level: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[@$!%*?&]/.test(pw)) score++;
  const map = [
    { level: 0 as const, label: '', color: '' },
    { level: 1 as const, label: 'Weak', color: '#ef4444' },
    { level: 2 as const, label: 'Fair', color: '#f59e0b' },
    { level: 3 as const, label: 'Good', color: '#3b82f6' },
    { level: 4 as const, label: 'Strong', color: '#22c55e' },
  ];
  return map[score];
}

export function RegisterPageClient() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);

  const [form, setForm] = useState<RegisterForm>(EMPTY);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [serverErr, setServerErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);

  const pwStrength = getStrength(form.password);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const target = e.target as HTMLInputElement;
      const { name, value, type } = target;
      const val = type === 'checkbox' ? target.checked : value;
      setForm((f) => ({ ...f, [name]: val }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
      setServerErr('');
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateRegister(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setTimeout(() => {
        const first = document.querySelector('[aria-invalid="true"]') as HTMLElement;
        first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }

    setLoading(true);
    setServerErr('');
    const { confirmPassword: _c, agreeToTerms: _a, ...payload } = form;
    const result = await register(payload);
    setLoading(false);

    if (!result.ok) {
      setServerErr(result.error ?? 'Registration failed. Please try again.');
      return;
    }
    setSuccess(true);
    setTimeout(() => router.push('/'), 1500);
  };

  // Helpers
  const FieldError = ({ id, msg }: { id: string; msg?: string }) =>
    msg ? (
      <p id={id} role="alert" className="mt-1.5 text-xs text-red-500 flex items-start gap-1">
        <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" /> {msg}
      </p>
    ) : null;

  const errStyle = (f: keyof RegisterErrors): React.CSSProperties =>
    errors[f] ? { borderColor: '#ef4444', boxShadow: '0 0 0 1px #ef4444' } : {};

  // Section divider
  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-gray-100" />
      <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400 shrink-0">
        {children}
      </span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );

  return (
    <div className="min-h-[calc(100dvh-120px)] bg-gray-50 flex items-start md:items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-2xl">

        {/* ── Card ──────────────────────────────────────────── */}
        <div className="bg-white shadow-md border border-gray-100 overflow-hidden rounded-sm">
          <div className="h-1 w-full" style={{ backgroundColor: '#0e7490' }} />

          <div className="px-5 sm:px-8 lg:px-10 py-7 sm:py-8">

            {/* Logo + heading */}
            <div className="text-center mb-6">
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <Package className="w-7 h-7" style={{ color: '#0e7490' }} />
                <span className="font-display text-2xl font-bold text-gray-800">
                  Print<span style={{ color: '#0e7490' }}>Craft</span>
                </span>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Create your account</h1>
              <p className="text-sm text-gray-500 mt-1">Join thousands of happy customers</p>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
              {[
                { icon: ShieldCheck, text: 'Secure Signup' },
                { icon: Package, text: 'Free Delivery' },
                { icon: CheckCircle, text: 'Easy Returns' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1 py-2.5 px-1 bg-gray-50 rounded text-center">
                  <Icon className="w-4 h-4" style={{ color: '#0e7490' }} />
                  <span className="text-[10px] sm:text-[11px] font-medium text-gray-600 leading-tight">{text}</span>
                </div>
              ))}
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
                <span>Account created! Welcome to PrintCraft — redirecting…</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>

              {/* ── Personal Info ──────────────────────────── */}
              <SectionLabel>Personal Information</SectionLabel>

              <div className="space-y-4">
                {/* Full name — full width */}
                <div>
                  <label htmlFor="reg-name" className="label">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                      style={{ color: errors.name ? '#ef4444' : '#9ca3af' }} />
                    <input
                      id="reg-name" name="name" type="text"
                      autoComplete="name"
                      value={form.name} onChange={handleChange}
                      placeholder="Rahim Uddin"
                      className="input-field pl-10 text-base sm:text-sm"
                      style={errStyle('name')}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'reg-name-err' : undefined}
                    />
                  </div>
                  <FieldError id="reg-name-err" msg={errors.name} />
                </div>

                {/* Email + Phone — stack on mobile, side-by-side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reg-email" className="label">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                        style={{ color: errors.email ? '#ef4444' : '#9ca3af' }} />
                      <input
                        id="reg-email" name="email" type="email"
                        inputMode="email" autoComplete="email" autoCapitalize="none"
                        value={form.email} onChange={handleChange}
                        placeholder="you@example.com"
                        className="input-field pl-10 text-base sm:text-sm"
                        style={errStyle('email')}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'reg-email-err' : undefined}
                      />
                    </div>
                    <FieldError id="reg-email-err" msg={errors.email} />
                  </div>

                  <div>
                    <label htmlFor="reg-phone" className="label">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                        style={{ color: errors.phone ? '#ef4444' : '#9ca3af' }} />
                      <input
                        id="reg-phone" name="phone" type="tel"
                        inputMode="tel" autoComplete="tel"
                        value={form.phone} onChange={handleChange}
                        placeholder="01700000000"
                        className="input-field pl-10 text-base sm:text-sm"
                        style={errStyle('phone')}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'reg-phone-err' : undefined}
                      />
                    </div>
                    <FieldError id="reg-phone-err" msg={errors.phone} />
                  </div>
                </div>
              </div>

              {/* ── Security ───────────────────────────────── */}
              <SectionLabel>Password & Security</SectionLabel>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Password */}
                <div>
                  <label htmlFor="reg-password" className="label">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                      style={{ color: errors.password ? '#ef4444' : '#9ca3af' }} />
                    <input
                      id="reg-password" name="password"
                      type={showPw ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={form.password} onChange={handleChange}
                      placeholder="Min 8 characters"
                      className="input-field pl-10 pr-11 text-base sm:text-sm"
                      style={errStyle('password')}
                      aria-invalid={!!errors.password}
                      aria-describedby="reg-pw-hint reg-pw-err"
                    />
                    <button type="button" onClick={() => setShowPw((v) => !v)}
                      className="absolute right-0 top-0 h-full w-11 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showPw ? 'Hide password' : 'Show password'}>
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Strength bar */}
                  {form.password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex gap-1 h-1.5">
                        {[1, 2, 3, 4].map((n) => (
                          <div key={n} className="flex-1 rounded-full transition-all duration-300"
                            style={{ backgroundColor: n <= pwStrength.level ? pwStrength.color : '#e5e7eb' }} />
                        ))}
                      </div>
                      {pwStrength.label && (
                        <p className="text-[11px] font-semibold" style={{ color: pwStrength.color }}>
                          {pwStrength.label} password
                        </p>
                      )}
                    </div>
                  )}
                  <p id="reg-pw-hint" className="mt-1.5 text-[11px] text-gray-400 leading-tight">
                    8+ chars with uppercase, digit & special char (@$!%*?&)
                  </p>
                  <FieldError id="reg-pw-err" msg={errors.password} />
                </div>

                {/* Confirm password */}
                <div>
                  <label htmlFor="reg-cpw" className="label">
                    Confirm Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                      style={{ color: errors.confirmPassword ? '#ef4444' : '#9ca3af' }} />
                    <input
                      id="reg-cpw" name="confirmPassword"
                      type={showCPw ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={form.confirmPassword} onChange={handleChange}
                      placeholder="Repeat password"
                      className="input-field pl-10 pr-11 text-base sm:text-sm"
                      style={errStyle('confirmPassword')}
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby={errors.confirmPassword ? 'reg-cpw-err' : undefined}
                    />
                    <button type="button" onClick={() => setShowCPw((v) => !v)}
                      className="absolute right-0 top-0 h-full w-11 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showCPw ? 'Hide password' : 'Show password'}>
                      {showCPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Live match indicator */}
                  {form.confirmPassword && (
                    <p className={`mt-1.5 text-[11px] flex items-center gap-1 font-medium ${form.password === form.confirmPassword ? 'text-green-600' : 'text-red-500'
                      }`}>
                      {form.password === form.confirmPassword
                        ? <><CheckCircle className="w-3 h-3 shrink-0" /> Passwords match</>
                        : <><AlertCircle className="w-3 h-3 shrink-0" /> Passwords do not match</>}
                    </p>
                  )}
                  <FieldError id="reg-cpw-err" msg={errors.confirmPassword} />
                </div>
              </div>

              {/* ── Delivery Address ───────────────────────── */}
              <SectionLabel>Delivery Address</SectionLabel>

              <div className="space-y-4">
                {/* Street address */}
                <div>
                  <label htmlFor="reg-address" className="label">
                    Street Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 pointer-events-none"
                      style={{ color: errors.address ? '#ef4444' : '#9ca3af' }} />
                    <textarea
                      id="reg-address" name="address"
                      value={form.address} onChange={handleChange}
                      placeholder="House no, Road, Area — e.g. House 12, Road 5, Dhanmondi"
                      rows={2}
                      className="input-field pl-10 resize-none text-base sm:text-sm"
                      style={errStyle('address')}
                      aria-invalid={!!errors.address}
                      aria-describedby={errors.address ? 'reg-addr-err' : undefined}
                    />
                  </div>
                  <FieldError id="reg-addr-err" msg={errors.address} />
                </div>

                {/* City + District */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reg-city" className="label">
                      City / Thana <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                        style={{ color: errors.city ? '#ef4444' : '#9ca3af' }} />
                      <input
                        id="reg-city" name="city" type="text"
                        autoComplete="address-level2"
                        value={form.city} onChange={handleChange}
                        placeholder="Dhanmondi"
                        className="input-field pl-10 text-base sm:text-sm"
                        style={errStyle('city')}
                        aria-invalid={!!errors.city}
                        aria-describedby={errors.city ? 'reg-city-err' : undefined}
                      />
                    </div>
                    <FieldError id="reg-city-err" msg={errors.city} />
                  </div>

                  <div>
                    <label htmlFor="reg-district" className="label">
                      District <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10"
                        style={{ color: errors.district ? '#ef4444' : '#9ca3af' }} />
                      <select
                        id="reg-district" name="district"
                        value={form.district} onChange={handleChange}
                        className="input-field pl-10 appearance-none bg-white cursor-pointer text-base sm:text-sm"
                        style={errStyle('district')}
                        aria-invalid={!!errors.district}
                        aria-describedby={errors.district ? 'reg-dist-err' : undefined}
                      >
                        <option value="">Select district…</option>
                        {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <FieldError id="reg-dist-err" msg={errors.district} />
                  </div>
                </div>
              </div>

              {/* ── Terms ──────────────────────────────────── */}
              <div className="mt-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    name="agreeToTerms"
                    type="checkbox"
                    checked={form.agreeToTerms}
                    onChange={handleChange}
                    className="w-5 h-5 mt-0.5 shrink-0 accent-[#0e7490]"
                    aria-describedby={errors.agreeToTerms ? 'reg-terms-err' : undefined}
                  />
                  <span className="text-sm text-gray-600 leading-relaxed">
                    I agree to the{' '}
                    <Link href="#" className="font-medium hover:underline" style={{ color: '#0e7490' }}>
                      Terms of Service
                    </Link>{' '}and{' '}
                    <Link href="#" className="font-medium hover:underline" style={{ color: '#0e7490' }}>
                      Privacy Policy
                    </Link>
                    . I consent to receive order updates via SMS and email.
                  </span>
                </label>
                <FieldError id="reg-terms-err" msg={errors.agreeToTerms} />
              </div>

              {/* ── Submit ─────────────────────────────────── */}
              <button
                type="submit"
                disabled={loading || success}
                className="btn-primary w-full gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ minHeight: '48px', fontSize: '0.9rem' }}
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Creating account…</>
                ) : success ? (
                  <><CheckCircle className="w-4 h-4" /> Account created!</>
                ) : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            {/* Divider + login link */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-gray-400">Already have an account?</span>
              </div>
            </div>

            <Link
              href="/auth/login"
              className="flex items-center justify-center gap-2 w-full border-2 text-sm font-semibold transition-colors rounded-sm"
              style={{ borderColor: '#0e7490', color: '#0e7490', minHeight: '48px' }}
            >
              <LogIn className="w-4 h-4" />
              Sign In Instead
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5 px-2">
          Your data is secured with 256-bit encryption. 🔒
        </p>
      </div>
    </div>
  );
}