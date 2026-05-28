export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[700px] px-6 py-24 pt-28">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted">
        Legal
      </p>
      <h1 className="mb-8 font-serif text-3xl font-light tracking-tight">
        Privacy Policy
      </h1>
      <div className="space-y-6 text-sm leading-relaxed text-muted">
        <p>
          <strong className="text-foreground">Last updated:</strong> May 27, 2026
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">1. Data Controller</h2>
        <p>
          Alessandro Palombo is the data controller for personal data collected through this website.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">2. Data We Collect</h2>
        <p>
          We collect the name and email address you provide when registering for the webinar.
          We do not collect any other personal data through this website.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">3. How We Use Your Data</h2>
        <p>Your name and email address are used to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Send you the webinar access link and calendar invite</li>
          <li>Send the webinar recording after the event</li>
          <li>Subscribe you to Alessandro Palombo&apos;s newsletter (delivered via Substack)</li>
          <li>Subscribe you to the Bitizenship newsletter</li>
        </ul>

        <h2 className="pt-4 text-base font-semibold text-foreground">4. Third-Party Services</h2>
        <p>
          We use <strong className="text-foreground">ConvertKit</strong> (now Kit) to process registrations,
          <strong className="text-foreground"> Substack</strong> for delivery of Alessandro Palombo&apos;s newsletter,
          and <strong className="text-foreground">Bitizenship</strong> (bitizenship.com) for delivery of its newsletter.
          Each of these services has its own privacy policy governing how it handles your data.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">5. Data Retention</h2>
        <p>
          Your email is retained for as long as you remain subscribed to our communications.
          You can unsubscribe at any time using the link in any email, which will remove you from
          future communications.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">6. Your Rights</h2>
        <p>
          Under GDPR and applicable privacy laws, you have the right to access, correct, delete,
          or port your personal data. To exercise these rights, contact us directly.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">7. Cookies</h2>
        <p>
          This website does not use tracking cookies. Essential cookies may be used by the hosting
          provider (Vercel) for performance and security purposes.
        </p>

        <h2 className="pt-4 text-base font-semibold text-foreground">8. Contact</h2>
        <p>
          For privacy-related inquiries, reach out via{' '}
          <a href="https://x.com/thealepalombo" className="text-accent underline hover:text-accent-hover">
            @thealepalombo
          </a>.
        </p>
      </div>
    </div>
  );
}
