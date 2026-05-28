'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const UTM_STORAGE_KEY = 'eu_gv_webinar_utms';

function captureUtmsFromUrl() {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) fromUrl[k] = v;
  }
  if (Object.keys(fromUrl).length > 0) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl));
  }
}

function getUtms(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

// Kit source tags — same numeric IDs as the Italy webinar (shared Bitizenship Kit account).
// Format: utm_source=<source>&utm_medium=<medium> → maps to `source:<source>-<medium>` tag.
const UTM_TAG_IDS: Record<string, number> = {
  'x-social': 19205040,
  'youtube-social': 19205273,
  'substack-newsletter': 19205274,
  'bitizenship-newsletter': 19205278,
  'bitizenship-paid': 19205279,
};

function lookupSourceTagId(utms: Record<string, string>): number | null {
  const source = utms.utm_source?.trim().toLowerCase();
  const medium = utms.utm_medium?.trim().toLowerCase();
  if (!source || !medium) return null;
  const tagId = UTM_TAG_IDS[`${source}-${medium}`];
  return tagId && tagId > 0 ? tagId : null;
}

/* ─────────────────────────── IMAGES ─────────────────────────── */

// Hero: Porto golden-hour cityscape
const HERO_IMG = '/portugal.jpg';

// Country image breaks (3 total — Italy uses 2, EU spans 6 countries)
const SANTORINI_IMG = '/santorini.jpg';
const LISBON_IMG = '/lisbon.jpg';
const BUDAPEST_IMG = '/hungary.jpg';

/* ─────────────────────────── DATA ─────────────────────────── */

const AGENDA_SECTIONS = [
  {
    title: 'Why this matters: the Plan B / political pendulum case',
    duration: '5 min',
    desc: 'Why optionality is the right frame for any EU Golden Visa, what the political pendulum costs you if you don’t hedge in time, the Thiel/Dalio frame (and how the placement industry misuses it), and why most readers don’t actually need any of these programs.',
  },
  {
    title: 'The ratchet & the five active programs',
    duration: '7 min',
    desc: 'Eleven of seventeen major EU and EU-adjacent programs closed in 4 years. The CJEU April 2025 ruling that ended Malta CBI permanently. Spain Apr 2025, Bulgaria 2022, Montenegro 2022, Ireland 2023, Portugal real estate 2023. What survived, what didn’t, and the constitutional line that’s now binding.',
  },
  {
    title: 'The five active programs side by side',
    duration: '18 min',
    desc: 'Italy Investor Visa €250K, Greek GV €250K (Zone C), Portugal GV €500K funds or €250K donation, Hungary GIP €250K AIF, Malta MPRP €375K + €37K, Cyprus PR €300K. Mechanics, math, who fits, the honest catch, the verdict on each.',
  },
  {
    title: 'The four tests — how to evaluate any program',
    duration: '5 min',
    desc: 'Recoverability (is the capital yours?), presence (what does holding cost you?), citizenship trigger (does exercise yield something durable?), expiry risk (closure cycle position). The framework you can apply to any program, today or in 2030 when the active-program list changes again.',
  },
  {
    title: 'Tax stacking — the visa is not the tax break',
    duration: '7 min',
    desc: 'Italy 24-bis / 24-ter / Impatriati / Researcher. Greek 5A (€100K) / 5B (7%). Cyprus 60-day non-dom 17 years. Malta non-dom + refundable. Portugal IFICI (narrow). €5M foreign-income worked example across all five jurisdictions side by side. Match the regime to your profile, then pick the visa.',
  },
  {
    title: 'Decision matrix — who fits which program',
    duration: '6 min',
    desc: 'UK ex-non-doms on a burning clock, US tech founders pre-exit, foreign-pension retirees, UHNW with foreign-source income, founders selling business, the do-nothing baseline. Profile is filter #1. The visa is filter #4. Plus the descent check most placement decks skip.',
  },
  {
    title: 'Honest costs, red flags + Live Q&A',
    duration: '12 min',
    desc: 'The fees the placement industry doesn’t publish. Guarantees you should refuse. The five rules nobody tells you before buying EU optionality. Then live Q&A on your specific situation.',
  },
];

const PROFILES = [
  {
    title: 'UHNW with €5M+ foreign income',
    desc: 'Italy 24-bis at €300K/yr or Greek 5A at €100K/yr. Math closes hard above €1M.',
  },
  {
    title: 'UK ex-non-doms on a burning clock',
    desc: 'The 4-year UK transition ends April 2029. Italy 24-bis + Investor Visa is the cleanest exit.',
  },
  {
    title: 'Foreign-pension retirees',
    desc: 'Greek 5B (7% on foreign pension) or Italy 24-ter (7% Southern). Stack with the respective Golden Visa.',
  },
  {
    title: 'Founders pre-exit, citizenship-desired',
    desc: 'Portugal GV at €500K (or €250K donation). EU PR without moving — though the May 2026 reform doubled the citizenship clock to 10 years (7 for CPLP).',
  },
];

const STATS = [
  { num: '6', label: 'Programs covered' },
  { num: '11/17', label: 'Closed since 2022' },
  { num: '€250K', label: 'Lowest live entry' },
  { num: '2030', label: 'List will be shorter' },
];

const COUNTRIES = [
  {
    name: 'Italy',
    program: 'Investor Visa',
    entry: '€250K',
    tax: '24-bis €300K · 24-ter 7% · Impatriati 50%',
    verdict: 'Rational 2026 default',
    image: '/italy.jpg',
  },
  {
    name: 'Cyprus',
    program: 'PR',
    entry: '€300K',
    tax: '60-day non-dom · 17-year SDC exemption',
    verdict: 'Durability winner',
    image: '/cyprus.jpg',
  },
  {
    name: 'Portugal',
    program: 'Golden Visa',
    entry: '€500K / €250K donation',
    tax: 'IFICI (narrow — R&D, PhD, tech)',
    verdict: 'EU PR without moving (citizenship now 10y)',
    image: '/portugal.jpg',
  },
  {
    name: 'Greece',
    program: 'Golden Visa',
    entry: '€250K (Zone C)',
    tax: '5A €100K/y · 5B 7% retiree',
    verdict: 'Cheapest UHNW tax election',
    image: '/greece.jpg',
  },
  {
    name: 'Hungary',
    program: 'GIP',
    entry: '€250K AIF',
    tax: 'No notable expat regime',
    verdict: 'Trough buy, barbell only',
    image: '/hungary.jpg',
  },
  {
    name: 'Malta',
    program: 'MPRP',
    entry: '€375K + €37K',
    tax: 'Non-dom + refundable ~5% effective',
    verdict: 'Foreign-source business income only',
    image: '/malta.jpg',
  },
];

/* ─────────────────────────── CTA FORM ─────────────────────────── */

const KIT_FORM_ID = '9494799';
const KIT_API_KEY = 'dljaxwYy4AbxYkhZIV3eqQ';

function RegisterForm({ id, dark = false }: { id: string; dark?: boolean }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName) return;
    setStatus('loading');

    const utms = getUtms();
    const sourceTagId = lookupSourceTagId(utms);

    try {
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: KIT_API_KEY,
            email,
            first_name: firstName,
            ...(sourceTagId ? { tags: [sourceTagId] } : {}),
          }),
        }
      );

      if (!res.ok) throw new Error('Kit API error');
      setStatus('success');
      window.fbq?.('track', 'Lead', {
        content_name: 'EU Golden Visas 2026',
        content_category: 'Webinar Registration',
        ...utms,
      });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`rounded border px-6 py-6 text-left ${dark ? 'border-accent/20 bg-white/5' : 'border-accent/20 bg-accent/5'}`}>
        <p className="mb-3 font-serif text-lg font-medium text-accent">
          You&apos;re registered! Check your inbox.
        </p>
        <p className={`text-sm leading-relaxed ${dark ? 'text-white/60' : 'text-muted'}`}>
          We&apos;ve sent a confirmation to <strong className={dark ? 'text-white/80' : 'text-foreground'}>{email}</strong>. You&apos;ll receive the Zoom link and calendar invite before the event. Recording will also be sent to all registrants.
        </p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id={`${id}-name`}
            type="text"
            placeholder="Your name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={`flex-1 px-5 py-4 text-sm transition-all focus:outline-none ${
              dark
                ? 'border border-white/15 bg-white/5 text-white placeholder:text-white/35 focus:border-accent/60'
                : 'border border-border bg-white text-foreground placeholder:text-muted/40 focus:border-accent'
            }`}
          />
          <input
            id={id}
            type="email"
            placeholder="Your best email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`flex-1 px-5 py-4 text-sm transition-all focus:outline-none ${
              dark
                ? 'border border-white/15 bg-white/5 text-white placeholder:text-white/35 focus:border-accent/60'
                : 'border border-border bg-white text-foreground placeholder:text-muted/40 focus:border-accent'
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-accent px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50 whitespace-nowrap"
        >
          {status === 'loading' ? 'Registering…' : 'Save Your Seat Now →'}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-2 text-xs text-red-400">Something went wrong. Please try again.</p>
      )}
      <p className={`mt-3 text-[11px] ${dark ? 'text-white/50' : 'text-muted/40'}`}>
        Free &middot; Recording sent to all registrants &middot; No spam
      </p>
      <p className={`mt-1.5 text-[10px] leading-relaxed ${dark ? 'text-white/30' : 'text-muted/30'}`}>
        By registering you agree to our{' '}
        <a href="/legal/terms" className="underline hover:text-accent">Terms</a>{' '}
        and{' '}
        <a href="/legal/privacy" className="underline hover:text-accent">Privacy Policy</a>.
        Your email will be used to send webinar information and you will be automatically subscribed to both Alessandro Palombo&apos;s newsletter (via Substack) and the Bitizenship newsletter. You can unsubscribe from either at any time.
      </p>
    </div>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function LandingPage() {
  const topFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    captureUtmsFromUrl();
  }, []);

  const scrollToForm = () => {
    topFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="pt-14">

      {/* ═══════════════════════════════════════════════════════════
          BANNER
      ═══════════════════════════════════════════════════════════ */}
      <div className="bg-dark text-center py-3 px-6">
        <p className="text-[12px] text-white/75 font-medium tracking-wide">
          Thursday, June 18th &middot; 5pm Lisbon &middot; 6pm Rome &middot; 12pm New York &middot; 9am California
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] overflow-hidden bg-dark">
        <Image
          src={HERO_IMG}
          alt="European Mediterranean cityscape"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/75 to-dark/95" />
        <div className="grain pointer-events-none absolute inset-0" />

        <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-[1100px] items-center justify-center px-6 pt-24 pb-32">
          <div className="w-full max-w-[760px] text-center text-white">
            <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
              Free Live Webinar &middot; June 18, 2026
            </p>

            <h1 className="mb-8 font-serif text-5xl font-normal leading-[1.05] tracking-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.4)] sm:text-6xl md:text-7xl lg:text-[4.5rem]">
              Top European
              <br />
              Golden Visas, <span className="italic">Compared.</span>
            </h1>

            <p className="mx-auto mb-5 max-w-xl text-lg font-medium leading-relaxed text-white md:text-xl [text-shadow:0_1px_10px_rgba(0,0,0,0.4)]">
              The five EU residency-by-investment programs still active in 2026, plus Cyprus PR. <span className="font-bold">60 minutes covering the essentials</span> on Italy, Greece, Portugal, Hungary, Malta and Cyprus &mdash; honestly compared.
            </p>

            <p className="mx-auto mb-10 max-w-md text-sm font-medium text-white/80">
              Thursday, June 18th at 5:00 PM Lisbon time (6:00 PM Rome). ~60 min live on Zoom with Q&A.
            </p>

            <div ref={topFormRef} className="w-full max-w-lg mx-auto">
              <RegisterForm id="hero-form" dark />
            </div>
          </div>
        </div>

        {/* Sponsor credit */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-6">
          <a
            href="https://www.bitizenship.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 transition-opacity hover:opacity-80"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">
              Sponsored by
            </span>
            <Image
              src="/bitizenship-logo-white.png"
              alt="Bitizenship"
              width={952}
              height={160}
              className="h-5 w-auto"
            />
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          THE RATCHET — why now
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-dark text-white">
        <div className="mx-auto max-w-[800px] px-6 py-20 md:py-24">
          <div className="mb-12 text-center">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent/70">
              Why this matters, why now
            </p>
            <h2 className="font-serif text-3xl font-light tracking-tight md:text-4xl">
              Eleven of seventeen closed. <span className="italic">Five are still active.</span>
            </h2>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-white/70 max-w-lg mx-auto text-center">
            <p>
              Spain Golden Visa terminated April 2025. Malta CBI struck down by CJEU. Portugal killed real estate. Bulgaria, Montenegro, Ireland, UK Tier&nbsp;1 — all closed.
            </p>
            <p>
              <strong className="font-semibold text-white">Eleven of seventeen major EU and EU-adjacent programs ran the closure cycle in four years.</strong> Five EU residency programs are still active, plus Cyprus PR which functions as one.
            </p>
            <p>
              Their prices are higher, their citizenship clocks are slower, and most placement advisors are pitching the wrong one to the wrong buyer. This webinar walks through all six, honestly compared.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="border border-white/10 bg-white/5 px-4 py-5 text-center">
                <p className="font-serif text-xl font-light text-white md:text-2xl">{s.num}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WHO'S HOSTING
      ═══════════════════════════════════════════════════════════ */}
      <section className="border-b border-border/20">
        <div className="mx-auto max-w-[800px] px-6 py-24 md:py-28">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
            Who&apos;s Hosting
          </p>
          <h2 className="mb-4 font-serif text-2xl font-light tracking-tight md:text-3xl">
            Not a placement deck. <span className="italic">Independent intelligence.</span>
          </h2>
          {/* Alessandro */}
          <div className="flex flex-col gap-10 md:flex-row md:gap-14">
            <div className="flex-shrink-0 flex justify-center md:justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/alessandro-white.png"
                alt="Alessandro Palombo"
                className="h-40 w-40 rounded-full object-cover object-top ring-2 ring-border/20 md:h-48 md:w-48"
              />
            </div>

            <div className="flex-1 space-y-4 text-sm leading-relaxed text-muted md:text-[15px]">
              <p>
                <strong className="font-semibold text-foreground">Alessandro Palombo</strong> &mdash;
                Ph.D. in Public Law, qualified Italian lawyer, master in regulation of global markets. A decade building businesses, residencies and investment structures across European and non-European jurisdictions. &euro;25M+ moved through these programs from the inside &mdash; not from a placement deck. The person behind some of the most-followed jurisdictional intelligence content on the internet.
              </p>
              <p>
                <strong className="text-foreground">No placement fees on any program in this webinar.</strong>{' '}
                The honest analysis sometimes returns &ldquo;do nothing,&rdquo; and there is no commission on &ldquo;do nothing.&rdquo;
                Bitizenship operates two products disclosed openly: an Italian innovative startup for the Investor Visa, and a Portuguese Bitcoin-aligned fund. Everything else &mdash; including this webinar &mdash; is content.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-4">
                {[
                  { num: '100K+', label: 'Followers' },
                  { num: '300M+', label: 'Impressions' },
                  { num: '6', label: 'Jurisdictions' },
                  { num: '€25M+', label: 'Operated' },
                ].map((s) => (
                  <div key={s.label} className="border-l-2 border-accent/20 pl-3">
                    <p className="font-serif text-lg font-light text-foreground">{s.num}</p>
                    <p className="text-[10px] text-muted/60">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          IMAGE BREAK — Lisbon (pull quote)
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[50vh] min-h-[320px] overflow-hidden md:h-[60vh]">
        <Image
          src={LISBON_IMG}
          alt="Lisbon, Portugal"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <p className="mx-auto max-w-2xl font-serif text-lg italic leading-relaxed text-white/90 md:text-xl">
            &ldquo;A European Golden Visa is an option on European residency, not a tax product or a relocation contract. Price it like an option.&rdquo;
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-widest text-white/50">
            &mdash; Alessandro Palombo
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SIX COUNTRIES VISUAL GRID
      ═══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-[1100px] px-6 py-24 md:py-28">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
          Six countries, side by side
        </p>
        <h2 className="mb-4 font-serif text-2xl font-light tracking-tight md:text-3xl">
          Six programs left. <span className="italic">Six honest verdicts.</span>
        </h2>
        <p className="mb-12 max-w-xl text-sm leading-relaxed text-muted">
          The webinar walks each program in depth &mdash; mechanics, math, who fits, the honest catch, the verdict. Below, the photo-friendly snapshot. The slide you&apos;ll screenshot.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COUNTRIES.map((c, i) => (
            <div
              key={c.name}
              className="group overflow-hidden border border-border/40 bg-white transition-all hover:border-accent/40 hover:shadow-md"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />
                <span className="absolute top-3 right-4 font-serif text-2xl font-light text-white/60 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="absolute bottom-4 left-5">
                  <p className="font-serif text-2xl font-medium text-white tracking-tight [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
                    {c.name}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85">{c.program}</p>
                </div>
              </div>
              <div className="px-5 py-5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted/60">Entry</p>
                  <p className="text-sm font-semibold text-foreground">{c.entry}</p>
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted/60">Tax stack</p>
                  <p className="text-right text-[11px] leading-snug text-muted">{c.tax}</p>
                </div>
                <div className="mt-3 border-t border-border/40 pt-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-accent/70">Verdict</p>
                  <p className="mt-1 text-sm font-medium leading-snug text-foreground">{c.verdict}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={scrollToForm}
            className="border border-accent/30 bg-accent/5 px-8 py-3.5 text-sm font-medium text-accent transition-all hover:bg-accent/10"
          >
            Save Your Seat Now &rarr;
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          IMAGE BREAK — Santorini
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[45vh] min-h-[280px] overflow-hidden md:h-[55vh]">
        <Image
          src={SANTORINI_IMG}
          alt="Santorini, Greece"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/55 via-transparent to-dark/15" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <p className="mx-auto max-w-2xl font-serif text-base italic leading-relaxed text-white/90 md:text-lg">
            &ldquo;The visa is filter #4. Profile is filter #1.&rdquo;
          </p>
          <p className="mt-3 text-xs font-medium uppercase tracking-widest text-white/50">
            &mdash; Alessandro Palombo
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          AGENDA
      ═══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-[800px] px-6 py-24 md:py-28">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
          What You&apos;ll Get
        </p>
        <h2 className="mb-4 font-serif text-2xl font-light tracking-tight md:text-3xl">
          60 minutes, 7 sections, <span className="italic">full Q&A.</span>
        </h2>
        <p className="mb-14 max-w-lg text-sm leading-relaxed text-muted">
          Everything you need to evaluate the EU Golden Visa landscape in 2026, structured so you leave with a clear picture of which program — if any — fits you, and what the honest math looks like.
        </p>

        <div className="grid gap-4">
          {AGENDA_SECTIONS.map((item, i) => (
            <div
              key={i}
              className="group flex items-start gap-5 border border-border/40 bg-white px-6 py-5 transition-all hover:border-accent/30 hover:shadow-sm"
            >
              <div className="flex-shrink-0 pt-0.5">
                <span className="font-serif text-2xl font-light text-accent/30">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-3">
                  <h3 className="text-sm font-semibold tracking-wide text-foreground">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-muted/50">{item.duration}</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={scrollToForm}
            className="border border-accent/30 bg-accent/5 px-8 py-3.5 text-sm font-medium text-accent transition-all hover:bg-accent/10"
          >
            Save Your Seat Now &rarr;
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WHO THIS IS FOR
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-surface/30 border-y border-border/20">
        <div className="mx-auto max-w-[800px] px-6 py-24 md:py-28">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
            Who This Is For
          </p>
          <h2 className="mb-4 font-serif text-2xl font-light tracking-tight md:text-3xl">
            Calibrated for <span className="italic">four profiles.</span>
          </h2>
          <p className="mb-14 max-w-lg text-sm leading-relaxed text-muted">
            $5M&ndash;$50M of liquid net worth. Within that range, the right program changes meaningfully by profile. If you are one of these, this webinar will save you weeks of research.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {PROFILES.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-4 border border-border/40 bg-white px-5 py-5 transition-all hover:border-accent/30 hover:shadow-sm"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-accent/20 bg-accent/5 font-serif text-sm text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-[12px] leading-relaxed text-muted/60 max-w-lg">
            If you don&apos;t see yourself clearly in any of these archetypes, you&apos;re probably in the
            {' '}<em>do nothing yet</em>{' '}
            bucket. That&apos;s not a failure &mdash; that&apos;s a discipline. The webinar covers when
            {' '}<em>do nothing</em>{' '}
            is the right answer too.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          IMAGE BREAK — Budapest
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[40vh] min-h-[260px] overflow-hidden md:h-[50vh]">
        <Image
          src={BUDAPEST_IMG}
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-dark/20" />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          LOGISTICS
      ═══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-[800px] px-6 py-24 md:py-28">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
          When is the webinar
        </p>
        <h2 className="mb-10 font-serif text-2xl font-light tracking-tight md:text-3xl">
          Thursday, June 18th at <span className="italic">5:00 PM Lisbon time.</span>
        </h2>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: 'Format', value: 'Live on Zoom, ~60 minutes including Q&A' },
            { label: 'Cost', value: 'Free' },
            { label: 'Recording', value: 'Sent to all registrants if you can’t make it live' },
            { label: 'Language', value: 'English' },
          ].map((item) => (
            <div key={item.label} className="border-l-2 border-accent/10 pl-5 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted/50">{item.label}</p>
              <p className="mt-1 text-sm text-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-[12px] leading-relaxed text-muted/60 max-w-lg">
          Specialist counsel for each jurisdiction (migration, tax, investment vehicle) joins the Q&amp;A as relevant. Per-jurisdiction introductions provided post-webinar to registrants who request them.
        </p>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          BOTTOM CTA
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <Image
          src={HERO_IMG}
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-dark/85" />
        <div className="grain pointer-events-none absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-[700px] px-6 py-24 text-center text-white md:py-32">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-accent/60">
            Free Live Webinar
          </p>
          <h2 className="mb-4 font-serif text-2xl font-light tracking-tight md:text-3xl">
            One hour that will save you <span className="italic">weeks of research.</span>
          </h2>
          <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-white/50">
            Most people considering an EU Golden Visa spend months piecing together fragmented information from placement decks, blog posts, and outdated guides. Sixty minutes with one practitioner who runs jurisdictional intelligence as a full-time discipline is the fastest way to see the full landscape honestly &mdash; and know which program, if any, fits you.
            <br /><br />
            The previous Italy webinar drew 850+ registrants.
            <br />
            <strong className="text-white/80">Reserve your seat now</strong> to guarantee live access and Q&A participation.
          </p>

          <div className="mx-auto max-w-lg">
            <RegisterForm id="bottom-form" dark />
          </div>
        </div>
      </section>
    </div>
  );
}
