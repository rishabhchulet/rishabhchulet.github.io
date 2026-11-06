// Google Analytics 4 for every page on creet.in, including the project sites /dispatch-desk/ and
// /itr-desk/, which load this file as /analytics.js. See privacy.html ("Website privacy").
//
// - Runs only on creet.in: local previews and the github.io addresses send nothing.
// - Visitors in the EEA, the UK and Switzerland start with analytics storage denied: no cookies are
//   set and Google receives only cookieless pings. Elsewhere the usual GA cookies are allowed.
//   Advertising storage and ad personalisation are denied everywhere.
// - Every query parameter except utm_* is removed from the address before Google's tag loads, so
//   no payment reference or email (Dodo Payments' return to thanks.html) ever reaches Google.
// - Links to the stores and marketplaces get utm_source=creet.in, utm_medium=website and
//   utm_campaign=<product folder, or "home">, unless they already carry tags, so each store's own
//   dashboard can tell which creet.in page sent the visit.
//
// How the tag behaves (tested 6 Nov 2026): G-77H7NNY4YP loads Google tag container GTM-PCP84MF8,
// which sends the page_view itself and ignores fields passed in gtag('config') (page_location,
// content_group, send_page_view, allow_google_signals). It does honour the consent defaults below
// and gtag('event') calls. So: page views are not sent from here (that would double them); the
// per-product content group is added in Google Analytics (Admin → Data streams → creet.in web →
// Modify events: page_view + page_location contains "/<folder>/" → content_group); Google signals
// is off in the property's Data collection settings; outbound clicks come from enhanced measurement.
(function () {
  if (location.hostname !== 'creet.in') return;

  var folder = location.pathname.split('/')[1] || '';
  if (folder === 'index.html') folder = '';

  // ----- Store links: add campaign tags ---------------------------------------------------------
  var STORE_HOSTS = ['chromewebstore.google.com', 'microsoftedge.microsoft.com', 'addons.mozilla.org',
    'workspace.google.com', 'plugins.jetbrains.com', 'www.wix.com'];
  var campaign = folder ? folder.replace(/\.html$/, '') : 'home';
  function tagStoreLinks() {
    var links = document.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var u;
      try { u = new URL(links[i].href); } catch (e) { continue; }
      if (STORE_HOSTS.indexOf(u.hostname) === -1) continue;
      if (u.hostname === 'www.wix.com' && u.pathname.indexOf('/app-market/') !== 0) continue;
      if (u.searchParams.get('utm_source')) continue; // keep tags set by the page (e.g. an ad's)
      u.searchParams.set('utm_source', 'creet.in');
      u.searchParams.set('utm_medium', 'website');
      u.searchParams.set('utm_campaign', campaign);
      links[i].href = u.toString();
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tagStoreLinks);
  else tagStoreLinks();

  // ----- Clean the address -----------------------------------------------------------------------
  // Query strings can carry personal or payment data, and Google's terms forbid sending personal data
  // to Analytics. The tag reads the address bar for every hit, so the parameters are removed from the
  // address itself. No page on creet.in reads them (Dispatch Desk reads only utm_*).
  var KEEP = /^utm_(source|medium|campaign|content|term)$/;
  try {
    var here = new URL(location.href), drop = [];
    here.searchParams.forEach(function (v, k) { if (!KEEP.test(k)) drop.push(k); });
    if (drop.length) {
      drop.forEach(function (k) { here.searchParams.delete(k); });
      history.replaceState(history.state, '', here.pathname + here.search + here.hash);
    }
  } catch (e) { /* old browser: leave the address alone */ }

  // ----- Google Analytics -----------------------------------------------------------------------
  var ID = 'G-77H7NNY4YP'; // GA4 property "creet.in" (account "Creet", rishabhchulet777@gmail.com)

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  var EEA_UK_CH = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
    'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO',
    'GB', 'CH'];
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: 'denied', region: EEA_UK_CH
  });
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: 'granted'
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('js', new Date());
  gtag('config', ID, { allow_google_signals: false, allow_ad_personalization_signals: false });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ID);
  document.head.appendChild(s);
})();
