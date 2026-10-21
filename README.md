# creet.in – public site for all Creet products

This folder is the whole website for `creet.in`, published by GitHub Pages from `main` of the
repository `rishabhchulet/rishabhchulet.github.io` (the account's user site). A push to `main`
deploys it.

| Path | What it is |
|---|---|
| `index.html`, `icon.svg` | Home page listing the three products, and the Creet icon |
| `styles.css` | Shared stylesheet for every page, including `gstr2b/` (linked as `../styles.css`) |
| `gstr2b/` | GSTR-2B Reconciler: home, privacy, terms, refunds, post-purchase page |
| `resource-lens/` | Resource Lens (PhpStorm plugin): overview, EULA, privacy; `lens.css` adds its teal carbon colour. Its Marketplace listing uses `https://creet.in/resource-lens/` (website), `.../eula.html` (licence) and `.../privacy.html` |
| `CNAME` | `creet.in`, so GitHub Pages serves the site on the custom domain |
| `.nojekyll` | Serve files as they are (no Jekyll processing) |

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
| `TODO_MARKETPLACE_LISTING_URL` | gstr2b index (2 buttons) | The Marketplace listing URL once it exists; until then `#pricing` |

Also set the "Last updated" date on the privacy, terms and refunds pages to the publish day.

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

## Design

The look is a stack of carbon-copy forms. Navy print (`--ink`), entries typed in blue
(`--blue`, Courier Prime) and one carbon colour per tool: yellow for GSTR-2B Reconciler, pink
for ITR Desk, green for Dispatch Desk. Headings are Archivo at a condensed width (`font-stretch`),
loaded from Google Fonts. Every colour is a token at the top of `styles.css`, with a dark
("carbon paper") set under `prefers-color-scheme: dark`. The only motion is the hero form
typing itself in and being stamped; it is off for `prefers-reduced-motion`.
