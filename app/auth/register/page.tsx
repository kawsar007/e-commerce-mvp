import type { Metadata } from 'next';
import { RegisterPageClient } from './RegisterPageClient';

export const metadata: Metadata = {
  title: 'Create Account – PrintCraft',
  description: 'Register a new PrintCraft account to start shopping premium 3D printed decor.',
};

export default function RegisterPage() {
  return <RegisterPageClient />;
}