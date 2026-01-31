import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '@/components/ConditionalLayout';
import { siteConfig } from '@/lib/constants';
import Script from 'next/script';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - Gen Z Tech Firm`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: ['web development', 'next.js', 'react', 'tailwind', 'supabase', 'pixel webpages'],
  authors: [{ name: 'Pixel WebPages' }],
  creator: 'Pixel WebPages',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: 'https://i.ibb.co/MDRZ7svJ/1.png',
    shortcut: 'https://i.ibb.co/MDRZ7svJ/1.png',
    apple: 'https://i.ibb.co/MDRZ7svJ/1.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        {/* Google Analytics */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>

        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
