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
  'Chandpur', 'Chapai Nawabganj', 'Chattogram', 'Chuadanga', 'Cox\'s Bazar', 'Cumilla',
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

// Password strength scorer
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
      const checked = type === 'checkbox' ? target.checked : undefined;
      setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
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
      // Scroll to first error
      const first = document.querySelector('[aria-invalid="true"]') as HTMLElement;
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);
    setServerErr('');
    const { confirmPassword: _, agreeToTerms: __, ...payload } = form;
    const result = await register(payload);
    setLoading(false);

    if (!result.ok) {
      setServerErr(result.error ?? 'Registration failed. Please try again.');
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push('/'), 1500);
  };

  // Reusable field error
  const FieldError = ({ id, msg }: { id: string; msg?: string }) =>
    msg ? (
      <p id={id} className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
        <AlertCircle className="w-3 h-3 shrink-0" /> {msg}
      </p>
    ) : null;

  // Input style with error state
  const inputStyle = (field: keyof RegisterErrors): React.CSSProperties =>
    errors[field] ? { borderColor: '#ef4444', boxShadow: '0 0 0 1px #ef4444' } : {};

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-2xl">

        {/* Card */}
        <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-1 w-full" style={{ backgroundColor: '#0e7490' }} />

          <div className="px-6 sm:px-10 py-8">
            {/* Logo + heading */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2 mb-5">
                <Package className="w-7 h-7" style={{ color: '#0e7490' }} />
                <span className="font-display text-2xl font-bold text-gray-800">
                  Print<span style={{ color: '#0e7490' }}>Craft</span>
                </span>
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Create your account</h1>
              <p className="text-sm text-gray-500 mt-1">Join thousands of happy customers</p>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mb-7">
              {[
                { icon: ShieldCheck, text: 'Secure Signup' },
                { icon: Package, text: 'Free Delivery' },
                { icon: CheckCircle, text: 'Easy Returns' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1 py-2.5 px-2 bg-gray-50 rounded text-center">
                  <Icon className="w-4 h-4" style={{ color: '#0e7490' }} />
                  <span className="text-[10px] font-medium text-gray-600 leading-tight">{text}</span>
                </div>
              ))}
            </div>

            {/* Server error */}
            {serverErr && (
              <div className="flex items-center gap-2 p-3 mb-5 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
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
              {/* ── Section: Personal Info ──────────────────── */}
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 flex items-center gap-2">
                <span className="flex-1 h-px bg-gray-100" />
                Personal Information
                <span className="flex-1 h-px bg-gray-100" />
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="label">Full Name <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: errors.name ? '#ef4444' : '#9ca3af' }} />
                    <input
                      id="name" name="name" type="text"
                      autoComplete="name"
                      value={form.name} onChange={handleChange}
                      placeholder="Rahim Uddin"
                      className="input-field pl-10"
                      style={inputStyle('name')}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-err' : undefined}
                    />
                  </div>
                  <FieldError id="name-err" msg={errors.name} />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="label">Email Address <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: errors.email ? '#ef4444' : '#9ca3af' }} />
                    <input
                      id="email" name="email" type="email"
                      autoComplete="email"
                      value={form.email} onChange={handleChange}
                      placeholder="you@example.com"
                      className="input-field pl-10"
                      style={inputStyle('email')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-err' : undefined}
                    />
                  </div>
                  <FieldError id="email-err" msg={errors.email} />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="label">Phone Number <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: errors.phone ? '#ef4444' : '#9ca3af' }} />
                    <input
                      id="phone" name="phone" type="tel"
                      autoComplete="tel"
                      value={form.phone} onChange={handleChange}
                      placeholder="01700000000"
                      className="input-field pl-10"
                      style={inputStyle('phone')}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-err' : undefined}
                    />
                  </div>
                  <FieldError id="phone-err" msg={errors.phone} />
                </div>
              </div>

              {/* ── Section: Security ────────────────────────── */}
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 mt-6 flex items-center gap-2">
                <span className="flex-1 h-px bg-gray-100" />
                Security
                <span className="flex-1 h-px bg-gray-100" />
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Password */}
                <div>
                  <label htmlFor="password" className="label">Password <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: errors.password ? '#ef4444' : '#9ca3af' }} />
                    <input
                      id="password" name="password"
                      type={showPw ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={form.password} onChange={handleChange}
                      placeholder="Min 8 characters"
                      className="input-field pl-10 pr-10"
                      style={inputStyle('password')}
                      aria-invalid={!!errors.password}
                      aria-describedby="pw-hint pw-err"
                    />
                    <button type="button" onClick={() => setShowPw(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showPw ? 'Hide password' : 'Show password'}>
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Strength bar */}
                  {form.password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex gap-1 h-1">
                        {[1, 2, 3, 4].map((n) => (
                          <div key={n} className="flex-1 rounded-full transition-all duration-300"
                            style={{ backgroundColor: n <= pwStrength.level ? pwStrength.color : '#e5e7eb' }} />
                        ))}
                      </div>
                      {pwStrength.label && (
                        <p className="text-[11px] font-medium" style={{ color: pwStrength.color }}>
                          {pwStrength.label} password
                        </p>
                      )}
                    </div>
                  )}
                  <p id="pw-hint" className="mt-1.5 text-[11px] text-gray-400 leading-tight">
                    Use 8+ chars with uppercase, number & special character (@$!%*?&)
                  </p>
                  <FieldError id="pw-err" msg={errors.password} />
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="label">Confirm Password <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: errors.confirmPassword ? '#ef4444' : '#9ca3af' }} />
                    <input
                      id="confirmPassword" name="confirmPassword"
                      type={showCPw ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={form.confirmPassword} onChange={handleChange}
                      placeholder="Repeat password"
                      className="input-field pl-10 pr-10"
                      style={inputStyle('confirmPassword')}
                      aria-invalid={!!errors.confirmPassword}
                      aria-describedby={errors.confirmPassword ? 'cpw-err' : undefined}
                    />
                    <button type="button" onClick={() => setShowCPw(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showCPw ? 'Hide password' : 'Show password'}>
                      {showCPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Match indicator */}
                  {form.confirmPassword && (
                    <p className={`mt-1.5 text-[11px] flex items-center gap-1 ${form.password === form.confirmPassword ? 'text-green-600' : 'text-red-500'}`}>
                      {form.password === form.confirmPassword
                        ? <><CheckCircle className="w-3 h-3" /> Passwords match</>
                        : <><AlertCircle className="w-3 h-3" /> Passwords do not match</>}
                    </p>
                  )}
                  <FieldError id="cpw-err" msg={errors.confirmPassword} />
                </div>
              </div>

              {/* ── Section: Delivery Address ─────────────────── */}
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 mt-6 flex items-center gap-2">
                <span className="flex-1 h-px bg-gray-100" />
                Delivery Address
                <span className="flex-1 h-px bg-gray-100" />
              </p>

              <div className="space-y-4 mb-4">
                {/* Street Address */}
                <div>
                  <label htmlFor="address" className="label">Street Address <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 pointer-events-none" style={{ color: errors.address ? '#ef4444' : '#9ca3af' }} />
                    <textarea
                      id="address" name="address"
                      value={form.address} onChange={handleChange}
                      placeholder="House no, Road no, Area (e.g. House 12, Road 5, Dhanmondi)"
                      rows={2}
                      className="input-field pl-10 resize-none"
                      style={inputStyle('address')}
                      aria-invalid={!!errors.address}
                      aria-describedby={errors.address ? 'addr-err' : undefined}
                    />
                  </div>
                  <FieldError id="addr-err" msg={errors.address} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* City */}
                  <div>
                    <label htmlFor="city" className="label">City / Thana <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: errors.city ? '#ef4444' : '#9ca3af' }} />
                      <input
                        id="city" name="city" type="text"
                        value={form.city} onChange={handleChange}
                        placeholder="Dhanmondi"
                        className="input-field pl-10"
                        style={inputStyle('city')}
                        aria-invalid={!!errors.city}
                        aria-describedby={errors.city ? 'city-err' : undefined}
                      />
                    </div>
                    <FieldError id="city-err" msg={errors.city} />
                  </div>

                  {/* District */}
                  <div>
                    <label htmlFor="district" className="label">District <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <Map className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10" style={{ color: errors.district ? '#ef4444' : '#9ca3af' }} />
                      <select
                        id="district" name="district"
                        value={form.district} onChange={handleChange}
                        className="input-field pl-10 appearance-none bg-white cursor-pointer"
                        style={inputStyle('district')}
                        aria-invalid={!!errors.district}
                        aria-describedby={errors.district ? 'dist-err' : undefined}
                      >
                        <option value="">Select district…</option>
                        {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                      {/* Custom chevron */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <FieldError id="dist-err" msg={errors.district} />
                  </div>
                </div>
              </div>

              {/* ── Terms ────────────────────────────────────── */}
              <div className="mt-5">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    name="agreeToTerms"
                    type="checkbox"
                    checked={form.agreeToTerms}
                    onChange={handleChange}
                    className="w-4 h-4 mt-0.5 shrink-0 accent-[#0e7490]"
                    aria-describedby={errors.agreeToTerms ? 'terms-err' : undefined}
                  />
                  <span className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
                    I agree to the{' '}
                    <Link href="#" className="font-medium hover:underline" style={{ color: '#0e7490' }}>Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="#" className="font-medium hover:underline" style={{ color: '#0e7490' }}>Privacy Policy</Link>
                    . I consent to receive order updates via SMS and email.
                  </span>
                </label>
                <FieldError id="terms-err" msg={errors.agreeToTerms} />
              </div>

              {/* ── Submit ────────────────────────────────────── */}
              <button
                type="submit"
                disabled={loading || success}
                className="btn-primary w-full py-3.5 text-sm gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
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
            <Link href="/auth/login" className="btn-secondary w-full py-3 text-sm justify-center">
              Sign In Instead
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          Your data is secured with 256-bit encryption.
        </p>
      </div>
    </div>
  );
}