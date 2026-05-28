import type { Metadata } from 'next';
import { Inter, Lora } from 'next/font/google';
import Image from 'next/image';
import Script from 'next/script';
import './globals.css';

const META_PIXEL_ID = '844659498309338';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  display: 'swap',
});

const siteUrl = 'https://www.eu-golden-visas.alepalombo.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  title: 'Top European Golden Visas, Compared — Free Live Webinar',
  description:
    'The five EU residency-by-investment programs left standing in 2026. What they actually cost, who they actually fit, and which one fits you. 60-minute live webinar with Q&A. Free registration.',
  openGraph: {
    title: 'Top European Golden Visas, Compared — Free Live Webinar',
    description:
      'The five EU programs left standing in 2026. What they actually cost, who they actually fit, and which one fits you. Free registration.',
    url: siteUrl,
    siteName: 'Alessandro Palombo — EU Golden Visas 2026',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@thealepalombo',
    creator: '@thealepalombo',
    title: 'Top European Golden Visas, Compared — Free Live Webinar',
    description:
      'Italy · Greece · Portugal · Hungary · Malta · Cyprus. The five EU programs left, side by side. 60-min live session with Q&A. Free.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} antialiased`}>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {/* Minimal sticky header */}
        <header className="fixed top-0 z-50 w-full border-b border-border/20 bg-background/90 backdrop-blur-lg">
          <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
            <a
              href="/"
              className="flex flex-col items-center transition-opacity hover:opacity-70"
            >
              <span className="font-serif text-[13px] tracking-[0.08em] text-foreground/80">
                ALESSANDRO PALOMBO
              </span>
              <span className="text-[10px] uppercase tracking-[0.08em] text-muted/50">
                EU Golden Visas 2026
              </span>
            </a>
            <a
              href="https://x.com/thealepalombo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted/50 transition-colors hover:text-foreground"
            >
              @thealepalombo
            </a>
          </div>
        </header>

        <main>{children}</main>

        {/* Compact footer */}
        <footer className="border-t border-border/20 py-8">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <a
                href="https://www.bitizenship.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 transition-opacity hover:opacity-70"
              >
                <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-muted/40">
                  Sponsored by
                </span>
                <Image
                  src="/bitizenship-logo-black.png"
                  alt="Bitizenship"
                  width={1190}
                  height={200}
                  className="h-5 w-auto"
                />
              </a>
              <div className="flex items-center gap-4 text-[10px] text-muted/40">
                <a href="/legal/terms" className="transition-colors hover:text-foreground">Terms</a>
                <span>&middot;</span>
                <a href="/legal/privacy" className="transition-colors hover:text-foreground">Privacy</a>
                <span>&middot;</span>
                <a href="https://alepalombo.com" className="transition-colors hover:text-foreground">alepalombo.com</a>
              </div>
              <p className="text-[10px] text-muted/25">
                &copy; {new Date().getFullYear()} Alessandro Palombo. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
