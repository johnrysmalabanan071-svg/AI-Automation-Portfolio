import type { Metadata } from 'next';
import { Geist_Mono, Inter, Manrope } from 'next/font/google';
import './globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });
const manrope = Manrope({ variable: '--font-manrope', subsets: ['latin'] });
const mono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] });

// PLACEHOLDER: Set NEXT_PUBLIC_SITE_URL to your final custom domain when you add one.
const deploymentHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (deploymentHost ? `https://${deploymentHost}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'John Rys Clanor — AI Automation Specialist',
    template: '%s · John Rys Clanor',
  },
  description: 'John Rys Clanor helps businesses eliminate repetitive manual work through AI-powered automation, voice agents, CRM workflows, lead scoring, n8n, Make.com, Zapier, and OpenAI or Claude APIs.',
  keywords: ['AI automation specialist', 'GoHighLevel automation', 'Make.com expert', 'n8n automation', 'Zapier consultant', 'AI agents', 'CRM automation'],
  authors: [{ name: 'John Rys Clanor' }],
  creator: 'John Rys Clanor',
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png', sizes: '256x256' }],
    apple: [{ url: '/icon.png', sizes: '256x256' }],
  },
  openGraph: {
    type: 'website',
    title: 'Turning Manual Work into Automated Systems.',
    description: 'John Rys Clanor · AI Automation Specialist building production-style automations with n8n, Make.com, Zapier, and OpenAI or Claude APIs.',
    url: '/',
    siteName: 'John Rys Clanor · AI Automation Specialist',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Turning Manual Work into Automated Systems. John Rys Clanor, AI Automation Specialist.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turning Manual Work into Automated Systems.',
    description: 'John Rys Clanor · AI Automation Specialist building production-style automations with n8n, Make.com, Zapier, and OpenAI or Claude APIs.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.variable} ${manrope.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
