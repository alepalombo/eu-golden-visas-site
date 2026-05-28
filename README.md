# EU Golden Visas Compared — Landing Page

Next.js landing page for the *Top European Golden Visas, Compared* webinar. Mirrors `italy-webinar-site` architecture exactly.

## Stack

- Next.js 15 (App Router)
- React 19
- Tailwind 4
- TypeScript
- Inter (sans) + Lora (serif) via `next/font/google`
- Meta Pixel + Kit (ConvertKit) form integration
- UTM capture + Kit-tag mapping
- Edge-rendered Open Graph image + favicon

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`.

## Before deploying — TODO

1. **Webinar date and time.** Confirmed as **Wednesday, June 10th, 2026 — 5:00 PM Lisbon (6:00 PM Rome / 12:00 PM New York / 9:00 AM California).** The date appears in the top banner, hero, logistics block, OG image, and Master Deck Document.
2. **Kit form ID.** Replace `KIT_FORM_ID = 'REPLACE_ME'` in `src/app/page.tsx` with the actual Kit form ID once the EU Golden Visas Kit form is created.
3. **Kit UTM tag IDs.** Once the Kit form has tags configured for traffic sources, populate `UTM_TAG_IDS` in `src/app/page.tsx` (mirroring the Italy webinar mapping).
4. **Site URL.** The canonical URL is set to `https://www.eu-golden-visas.alepalombo.com` in `src/app/layout.tsx` and `src/app/opengraph-image.tsx`. Update if the production domain differs.
5. **Hero / mid images.** The site uses three Unsplash images by default:
   - Hero: `photo-1555881400-74d7acaacd8b` (Lisbon-style cityscape)
   - Mid #1: `photo-1533105079780-92b9be482077` (Mediterranean coast)
   - Mid #2: `photo-1499856871958-5b9627545d1a` (European architecture)
   
   Replace the URLs in `src/app/page.tsx` (`HERO_IMG`, `MID_IMG_1`, `MID_IMG_2`) with chosen alternatives or local assets in `public/`. The Italy site uses local images for two of three breaks — same pattern applies here.
6. **Sponsor logo.** Logos are copied from the Italy site into `public/`. No change required unless the sponsor relationship changes.
7. **Meta Pixel ID.** Currently set to the same ID as the Italy site (`844659498309338`). Change in `src/app/layout.tsx` if a separate pixel is needed for this campaign.

## Deployment

Same flow as the Italy webinar site:

```bash
# Create a new Vercel project (will write to .vercel/)
vercel link

# Push first deploy
vercel --prod
```

Then add the production domain in the Vercel dashboard (e.g. `eu-golden-visas.alepalombo.com`).

## Source content

The site copy is derived from:

- `Claude Cowork/Guides/EU Golden Visas Compared/EU Golden Visas Compared - Substack Essay v0.4.docx`

If the essay changes, update the relevant sections of `src/app/page.tsx`:

- Hero subhead & banner line — match the executive summary opener
- "Why this matters" block — match the ratchet section
- Programs at a glance table — match the visual summary table in the essay
- Agenda — match the 7-section structure (already mapped)
- Profiles — match the decision matrix archetypes
