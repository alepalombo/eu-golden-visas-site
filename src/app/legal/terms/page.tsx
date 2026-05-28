export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[700px] px-6 py-24 pt-28">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
        Legal
      </p>
      <h1 className="mb-8 font-serif text-3xl font-light tracking-tight">
        Terms of Service
      </h1>
      <div className="space-y-6 text-sm leading-relaxed text-muted">
        <p>
          <strong className="text-foreground">Last updated:</strong> May 27, 2026
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">1. Overview</h2>
        <p>
          This website is operated by Alessandro Palombo. By accessing or registering for the webinar
          &ldquo;Top European Golden Visas, Compared&rdquo;, you agree to be bound by these Terms of Service.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">2. Webinar Registration</h2>
        <p>
          Registration is free. By submitting your name and email address, you will receive webinar access details
          and be subscribed to both Alessandro Palombo&apos;s newsletter (delivered via Substack)
          and the Bitizenship newsletter. You may unsubscribe from either at any time via the
          link in any email.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">3. Content Disclaimer</h2>
        <p>
          The information provided during the webinar is for educational and informational purposes only.
          It does not constitute legal, tax, immigration, or financial advice. Programs, thresholds, and tax rates
          referenced are accurate to the best of our knowledge as of the date of the webinar; rules change.
          You should consult qualified professionals licensed in the relevant jurisdiction before making decisions
          or transferring funds based on the information presented.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">4. No Investment Solicitation</h2>
        <p>
          Nothing in the webinar or on this website is an offer to sell securities, a solicitation of investment,
          or a guarantee of any visa, residency, or citizenship outcome. References to products operated by
          Bitizenship describe products we operate; any decision to invest must be made on the basis of the relevant
          product documentation, your own due diligence, and your own professional advisors &mdash; not on the basis
          of the webinar content.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">5. Intellectual Property</h2>
        <p>
          All content, materials, and recordings from the webinar are the property of Alessandro Palombo
          and may not be reproduced, distributed, or shared without prior written consent.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">6. Limitation of Liability</h2>
        <p>
          Alessandro Palombo shall not be held liable for any direct, indirect, incidental, or
          consequential damages arising from your use of the webinar content or reliance on the
          information presented.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">7. Changes</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use of this website
          constitutes acceptance of any changes.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">8. Contact</h2>
        <p>
          For questions about these terms, reach out via{' '}
          <a href="https://x.com/thealepalombo" className="text-accent underline hover:text-accent-hover">
            @thealepalombo
          </a>.
        </p>
      </div>
    </div>
  );
}
