import { Suspense } from 'react';

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div className="min-h-screen" />}>{children}</Suspense>;
}
