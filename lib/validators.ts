/**
 * validators.ts
 * ─────────────
 * Pure validation functions for Login and Register forms.
 * Returns an errors object — empty object means valid.
 */

import type { LoginErrors, LoginForm, RegisterErrors, RegisterForm } from '@/types';

// ── Regex patterns ────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^(?:\+?880|0)1[3-9]\d{8}$/;         // BD mobile numbers
const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// At least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char

export function validateLogin(form: LoginForm): LoginErrors {
  const errors: LoginErrors = {};

  if (!form.email.trim()) errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(form.email)) errors.email = 'Enter a valid email address.';

  if (!form.password) errors.password = 'Password is required.';
  else if (form.password.length < 8) errors.password = 'Password must be at least 8 characters.';

  return errors;
}

export function validateRegister(form: RegisterForm): RegisterErrors {
  const errors: RegisterErrors = {};

  // Name
  if (!form.name.trim())
    errors.name = 'Full name is required.';
  else if (form.name.trim().length < 3)
    errors.name = 'Name must be at least 3 characters.';

  // Email
  if (!form.email.trim())
    errors.email = 'Email is required.';
  else if (!EMAIL_RE.test(form.email))
    errors.email = 'Enter a valid email address.';

  // Phone
  if (!form.phone.trim())
    errors.phone = 'Phone number is required.';
  else if (!PHONE_RE.test(form.phone.replace(/\s/g, '')))
    errors.phone = 'Enter a valid Bangladeshi mobile number (e.g. 01700000000).';

  // Password
  if (!form.password)
    errors.password = 'Password is required.';
  else if (!PASSWORD_RE.test(form.password))
    errors.password =
      'Min 8 chars with uppercase, lowercase, number and special character (@$!%*?&).';

  // Confirm password
  if (!form.confirmPassword)
    errors.confirmPassword = 'Please confirm your password.';
  else if (form.password !== form.confirmPassword)
    errors.confirmPassword = 'Passwords do not match.';

  // Address
  if (!form.address.trim())
    errors.address = 'Street address is required.';
  else if (form.address.trim().length < 10)
    errors.address = 'Please enter your full street address.';

  // City
  if (!form.city.trim())
    errors.city = 'City is required.';

  // District
  if (!form.district)
    errors.district = 'Please select your district.';

  // Terms
  if (!form.agreeToTerms)
    errors.agreeToTerms = 'You must agree to the terms and privacy policy.';

  return errors;
}