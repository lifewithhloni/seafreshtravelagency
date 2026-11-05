# SeaFresh Travel Agency — website

Marketing and enquiry website for SeaFresh Travel Agency, built by LM Media Solutions.

**Stack:** Next.js 16 (App Router, static generation) · React 19 · TypeScript · Tailwind CSS 4. No database, backend or payment processing.

## Run it

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint
npm run typecheck
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public site address (SEO, sitemap, Open Graph) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number, international digits only, e.g. `27XXXXXXXXX` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Business email that receives enquiries |

If the WhatsApp number or email is missing or invalid, their buttons are hidden and the site says the channel is "coming soon". Rebuild after changing these values.

## Where to edit content

| What | File |
| --- | --- |
| Brand name, tagline, logo switch, social links, developer credit | `src/config/site.ts` |
| Colours and fonts (provisional) | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |
| Navigation | `src/content/navigation.ts` |
| Destinations | `src/content/destinations.ts` |
| Group trips (currently none, with a template at the bottom) | `src/content/trips.ts` |
| Holiday form options (holiday types, budget ranges) | `src/content/enquiry-options.ts` |
| FAQs | `src/content/faqs.ts` |
| Homepage copy | `src/content/home.ts` |
| About Us (draft mission and vision, optional sections) | `src/content/about.ts` |
| WhatsApp and email message wording | `src/lib/contact.ts`, `src/lib/enquiry.ts` |

## Logo

- Original file: `logo/Seafresh Travel Logo Version Sheet (1).png` (629×305 PNG with no transparency).
- Copied unchanged to `public/images/brand/seafresh-logo.png`.
- A text wordmark shows until you set `logo.approved = true` in `src/config/site.ts`.
- For dark backgrounds, add a transparent or white version and set `logo.darkBackgroundSrc`. Without one, the footer shows the logo on a white panel.
- A higher-resolution PNG (at least 2× size) or an SVG is recommended.
- `logo/Seafresh Travel Logo Version Sheet (2).png` is a round emblem (palm, plane and wave; 288×214, no transparency). Once approved, it would suit a favicon or social profile image. It is not used yet.

## Photos

Drop files at these paths (all are filled except the homepage hero, which shows an illustrated background with destination postcards). Until a file exists, a branded illustrated placeholder appears at the same size, so nothing breaks or shifts. Use landscape JPGs at least 1600 px wide, and only photos SeaFresh owns or is licensed to use. Rebuild after adding them.

```
public/images/hero/home-hero.jpg
public/images/destinations/sun-city.jpg
public/images/destinations/mpumalanga.jpg
public/images/destinations/hartbeespoort.jpg
public/images/destinations/namib-desert.jpg
public/images/destinations/victoria-falls.jpg
public/images/destinations/xai-xai-beach.jpg
public/images/group-trips/group-travel.jpg            (homepage "Group Trips" card and Group Trips page)
public/images/group-trips/<trip-slug>.jpg             (each published trip)
public/images/individual-holidays/individual-holiday.jpg        (homepage card)
public/images/individual-holidays/individual-holidays-hero.jpg  (Individual Holidays page)
```

## How enquiries work

There is no backend. Forms validate and sanitise the input, then build a message. The visitor sends it themselves through WhatsApp (`wa.me`) or their own email app (`mailto:`). The site never claims an enquiry was received, and it doesn't store or log personal details.
