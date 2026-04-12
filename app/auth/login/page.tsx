import type { Metadata } from 'next';
import { LoginPageClient } from './LoginPageClient';

export const metadata: Metadata = {
  title: 'Login – PrintCraft',
  description: 'Sign in to your PrintCraft account to manage orders and profile.',
};

export default function LoginPage() {
  return <LoginPageClient />;
}