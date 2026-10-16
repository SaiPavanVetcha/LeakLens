import type { Metadata } from 'next';
import './globals.css';
import { DataProvider } from '@/context/DataContext';

export const metadata: Metadata = {
  title: 'LeakLens — Revenue Leak Detection & Diagnostic Platform',
  description: 'AI-powered decision-support platform that detects enterprise revenue leaks, explains root causes with ML models, and delivers high-confidence remediation playbooks.',
  keywords: ['revenue leak', 'analytics', 'retail SaaS', 'loss prevention', 'stockout risk', 'campaign ROAS'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-300">
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
