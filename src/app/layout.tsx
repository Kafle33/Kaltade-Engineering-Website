import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileActionBar } from '@/components/layout/MobileActionBar';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const fontDisplay = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'Kaltade Engineering Services Pvt. Ltd. | Engineering • Valuation • Real Estate',
    template: '%s | Kaltade Engineering Services',
  },
  description:
    'Professional engineering consultancy, institutional property valuation, DPR preparation, building design, and real estate advisory in Dhangadhi, Kailali, Nepal. Trusted by banks, BFIs, investors, and property owners.',
  keywords: [
    'engineering consultancy Nepal',
    'property valuation Nepal',
    'property valuation Dhangadhi',
    'land valuation Kailali',
    'DPR consultant Nepal',
    'building design Nepal',
    'real estate consultancy Nepal',
    'property for sale Dhangadhi',
    'commercial property Nepal',
    'land for sale Kailali',
  ],
  authors: [{ name: 'Kaltade Engineering Services Pvt. Ltd.' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Kaltade Engineering Services',
    title: 'Kaltade Engineering Services Pvt. Ltd.',
    description:
      'Engineering Expertise. Property Intelligence. Real Estate Solutions. Professional consultancy in Dhangadhi, Kailali, Nepal.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeInitializerScript = `
  (function() {
    try {
      var stored = localStorage.getItem('kaltade_theme');
      var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontDisplay.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
      </head>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-dark-bg dark:text-dark-text min-h-screen">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <MobileActionBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
