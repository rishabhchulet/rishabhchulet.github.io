# creet.in – public site for all Creet products

This folder is the whole website for `creet.in`, published by GitHub Pages from `main` of the
repository `rishabhchulet/rishabhchulet.github.io` (the account's user site). A push to `main`
deploys it.

| Path | What it is |
|---|---|
| `index.html`, `icon.svg` | Home page listing the eight products with their status, and the Creet icon. ITR Desk and Dispatch Desk link their Chrome Web Store, Edge Add-ons (published 3 Nov 2026) and Firefox Add-ons (approved 2 Nov 2026) listings. Portal Request View Plus (Jira Service Management Forge app, live on the Atlassian Marketplace since 10 Nov 2026: `https://marketplace.atlassian.com/apps/3056940292/portal-request-view-plus-for-jira-service-management`) has its pages in the separate `portal-request-view` repository, served at `portal-request-view/`; it has a sheet and footer link but no hero form field. Media Tag Manager (free Wix App Market app, `https://www.wix.com/app-market/creet-media-tag-manager`) has no product page here, only the guide in `media-tag-manager/`: its sheet's button and its footer link go to the listing, the sheet also links the guide, and its privacy policy is hosted on Wix |
| `styles.css` | Shared stylesheet for every page, including `gstr2b/` (linked as `../styles.css`) |
| `gstr2b/` | GSTR-2B Reconciler: home, privacy, terms, refunds, post-purchase page |
| `gstr2b/guide.html` | SEO guide, "How to reconcile GSTR-2B with the purchase register in Google Sheets": the portal download, the Tally/Busy/Zoho export, the import settings and what to do with each result tab, ending at the Marketplace listing. Add-on facts follow the add-on's README; keep them in step |
| `resource-lens/` | Resource Lens (PhpStorm plugin): overview, EULA, privacy; `lens.css` adds its teal carbon colour. Its Marketplace listing uses `https://creet.in/resource-lens/` (website), `.../eula.html` (licence) and `.../privacy.html` |
| `returns-portal/` | Returns Portal (Wix App Market app): overview, privacy, terms, support; `returns.css` adds its azure (Wix blue) colour. The overview's five screenshots, `img/shot-1-dashboard.png` to `img/shot-5-rules.png` (4:3, 1600x1200), are added separately: until then the gallery shows their alt text. Its listing uses `https://creet.in/returns-portal/` (website), `.../privacy.html`, `.../terms.html` and `.../support.html` |
| `pickup-points-for-packeta/` | Pickup Points for Packeta (Wix App Market app, free, live since 27 Oct 2026 at `https://www.wix.com/app-market/creet-pickup-points-for-packeta`; the overview's hero button and the home page's tool sheet link there): overview, privacy, terms. Since release 2.0.0 (28 Oct 2026) the overview, its FAQ and the home page entry also describe manual packet creation, labels and tracking; automatic creation is added after release 2.1.0. `packeta.css` adds its kraft (parcel-box brown) colour, the example checkout and the gallery. The overview's four screenshots, `img/shot-1-checkout.png`, `img/shot-3-map.png`, `img/shot-2-settings.png` and `img/shot-4-packets.png` (in that order; 4:3, 1600x1200), are the listing images from the app's repository (`wix-packeta/listing/out/`, images 1, 2, 3 and 4). The listing uses `https://creet.in/pickup-points-for-packeta/privacy` and `.../terms`: GitHub Pages serves `privacy.html` and `terms.html` at those extensionless URLs, and each page's canonical link points to them. `icon.svg` is the app's listing icon. Keep the "not affiliated with or endorsed by Packeta" line on every page that names Packeta |
| `media-tag-manager/remove-auto-generated-tags.html` | SEO guide (14 Nov 2026), "How to remove auto-generated tags from the Wix Media Manager": what Wix's automatic tags are for, the manual way, then the app's batch actions, clean-up of new uploads, backup and restore, and its limits, ending at the App Market listing. The folder has no `index.html`, so the header's product link goes to the home page sheet. Lilac closing sheet: `.cta-sheet.cta-lilac` in `styles.css`. App facts follow the App Market listing; keep them in step |
| `CNAME` | `creet.in`, so GitHub Pages serves the site on the custom domain |
| `.nojekyll` | Serve files as they are (no Jekyll processing) |
| `sitemap.xml`, `robots.txt` | Every public page for search engines, and the pointer to the sitemap. Add a `<url>` for each new page |
| `analytics.js` | Google Analytics 4 for every page on creet.in. Each page, here and in the `dispatch-desk` and `itr-desk` repositories, loads it with `<script src="/analytics.js" async></script>` before `</head>`; add that line to every new page. The measurement ID (`G-77H7NNY4YP`, GA account "Creet" under rishabhchulet777@gmail.com) is set once in this file. It runs only on the creet.in hostname; visitors in the EEA, UK and Switzerland get analytics storage denied (no cookies); ads storage and Google signals are off. Every query parameter except `utm_*` is removed from the address before the tag loads (Dodo's return to `thanks.html` carries payment details). The ID loads Google tag container `GTM-PCP84MF8`, which sends page views itself and ignores `gtag('config')` fields, so the per-product content group is set in GA (stream "creet.in web" → Modify events, one rule per product folder: add a rule for every new product folder). It also adds `utm_source=creet.in&utm_medium=website&utm_campaign=<folder or home>` to links pointing at the Chrome Web Store, Edge Add-ons, Firefox Add-ons, Google Workspace Marketplace, JetBrains Marketplace and the Wix App Market, unless the link already has tags |
| `privacy.html` | Website privacy notice (Google Analytics, hosting, fonts), linked from the home page footer. Each product's privacy policy has a "This website" section pointing here. Keep it in step with `analytics.js` |

ITR Desk and Dispatch Desk are not copied here. They stay in their own repositories
(`itr-desk` from `main` `/docs`, `dispatch-desk` from `main` root). Once this user site has the
custom domain, GitHub serves them at `creet.in/itr-desk/` and `creet.in/dispatch-desk/`
automatically ("a custom domain on a user site is used for all project sites owned by the
same account", GitHub docs). Check after launch that the old
`rishabhchulet.github.io/itr-desk/` links redirect; ITR Desk's Dodo redirect and Chrome Web
Store listing use them.

## Before publishing: fill the placeholders

They show as amber boxes on the pages. This must print nothing before you publish:

```bash
grep -rn "TODO" --include=*.html .
```

| Placeholder | Where | Replace with |
|---|---|---|
| `TODO: legal name of the owner or business` | gstr2b privacy, terms | Legal name or registered business name |
| `TODO: postal address` | gstr2b privacy, terms | A contact address |
| `TODO: support email`, `mailto:TODO_SUPPORT_EMAIL` | every page | e.g. `support@creet.in` (forwarded to your inbox, below) |
| `<!-- TODO WIX_LISTING_URL ... -->` | returns-portal index (hero button, `href="#"`) | The Wix App Market listing URL; then delete the comment |

Also set the "Last updated" date on the privacy, terms and refunds pages to the publish day.

Returns Portal's plans (Free: 5 return requests a month; Pro: 19 USD a month, 17% less yearly, 14-day free trial) appear in four places, each between `<!-- PRICING:START -->` and `<!-- PRICING:END -->` comments: the pricing section of `returns-portal/index.html`, clause 3 of `returns-portal/terms.html`, the note at the end of `returns-portal/support.html`, and the Returns Portal sheet on the home page. Change them together: `grep -rn "PRICING:" --include=*.html .`

## Publish (about 30 minutes, after the domain is bought)

1. **Cloudflare DNS (free).** Add `creet.in` to a free Cloudflare account, then at Spaceship
   change the domain's nameservers to the two Cloudflare gives you. In Cloudflare DNS add,
   all set to **DNS only** (grey cloud) so GitHub can issue the HTTPS certificate:
   - `A` `creet.in` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` `www` → `rishabhchulet.github.io`
2. **GitHub.** Sign the GitHub CLI in as `rishabhchulet` (it is currently `rishPLM`), create the
   public repository `rishabhchulet.github.io`, push this folder's contents to `main`, then
   **Settings > Pages**: deploy from branch `main`, folder `/ (root)`. The custom domain comes
   from `CNAME`. When the DNS check passes, tick **Enforce HTTPS**.
3. **Lock the domain to your account.** GitHub account **Settings > Pages > Verified
   domains**: add `creet.in` and the TXT record it shows (in Cloudflare DNS).
4. **Email.** Cloudflare **Email Routing**: forward `support@creet.in` to your inbox and confirm
   the verification email.
5. **Google Search Console.** Add a **Domain** property for `creet.in` and its TXT record in
   Cloudflare DNS. This is the ownership check Google's OAuth verification relies on.
6. **Dodo.** Set the business website to `https://creet.in`, and give the GSTR-2B product's
   payment link the redirect `https://creet.in/gstr2b/thanks.html` (the site's Buy Pro button
   already uses it).

URLs for the Google OAuth consent screen and the Marketplace listing:

| Field | URL |
|---|---|
| Application home page | `https://creet.in/gstr2b/` |
| Privacy policy | `https://creet.in/gstr2b/privacy.html` |
| Terms of service | `https://creet.in/gstr2b/terms.html` |
| Authorized domain | `creet.in` |
| Support | `support@creet.in` |
| Marketplace listing (live since 26 Oct 2026; the home page and both install buttons on `gstr2b/` link here) | `https://workspace.google.com/marketplace/app/gstr2b_reconciler/1005859264831` |

## Design

The look is a stack of carbon-copy forms. Navy print (`--ink`), entries typed in blue
(`--blue`, Courier Prime) and one carbon colour per tool: yellow for GSTR-2B Reconciler, pink
for ITR Desk, green for Dispatch Desk, teal for Resource Lens, azure (Wix blue, `--azure`) for Returns Portal, kraft (parcel-box brown, `--kraft`) for Pickup Points for Packeta, lilac (`--lilac`) for Media Tag Manager, indigo (`--indigo`, the same values as `portal-request-view/prv.css`) for Portal Request View Plus. Headings are Archivo at a condensed width (`font-stretch`),
loaded from Google Fonts. Every colour is a token at the top of `styles.css`, with a dark
("carbon paper") set under `prefers-color-scheme: dark`. The only motion is the hero form
typing itself in and being stamped; it is off for `prefers-reduced-motion`.

## Services - 7 November 2026

`services/` describes website repairs, business websites and workflow automation, with `support@creet.in` as the enquiry address. The homepage links the services alongside the existing products. Services use `services/services.css` plus shared theme styles; `services/contact.js` only copies the public email address. There is no enquiry form backend, checkout or automatic email send. Scope, fee and delivery are agreed per project. The contact example is explicitly illustrative.
