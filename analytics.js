// Google Analytics 4 for every page on creet.in, including the project sites /dispatch-desk/ and
// /itr-desk/, which load this file as /analytics.js. See privacy.html ("Website privacy").
//
// - Runs only on creet.in: local previews and the github.io addresses send nothing.
// - Visitors in the EEA, the UK and Switzerland start with analytics storage denied: no cookies are
//   set and Google receives only cookieless pings. Elsewhere the usual GA cookies are allowed.
// - Advertising storage, ad personalisation and Google signals are off everywhere.
// - Every hit carries a content group naming the product whose pages it came from (Reports →
//   Engagement → Pages and screens → switch the table to "Content group").
// - Clicks to other sites (store listings, checkout) are recorded by GA4's enhanced measurement
//   ("outbound clicks").
// - Links to the stores and marketplaces get utm_source=creet.in, utm_medium=website and
//   utm_campaign=<product folder, or "home">, unless they already carry tags, so each store's own
//   dashboard can tell which creet.in page sent the visit.
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

  // ----- Google Analytics -----------------------------------------------------------------------
  var ID = 'G-77H7NNY4YP'; // GA4 property "creet.in" (account "Creet", rishabhchulet777@gmail.com)
  var PRODUCTS = {
    '': 'Creet home',
    'privacy.html': 'Creet website',
    'dispatch-desk': 'Dispatch Desk',
    'itr-desk': 'ITR Desk',
    'gstr2b': 'GSTR-2B Reconciler',
    'resource-lens': 'Resource Lens',
    'returns-portal': 'Returns Portal',
    'pickup-points-for-packeta': 'Pickup Points for Packeta'
  };
  var contentGroup = Object.prototype.hasOwnProperty.call(PRODUCTS, folder) ? PRODUCTS[folder] : 'Other';

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
  // Send Google only the page address and its campaign tags. Query strings can carry personal or
  // payment data (Dodo Payments returns buyers to thanks.html with payment_id, subscription_id,
  // status and sometimes an email), and Google's terms forbid sending personal data to Analytics.
  function cleanUrl(href) {
    try {
      var u = new URL(href), keep = [];
      u.searchParams.forEach(function (v, k) {
        if (/^utm_(source|medium|campaign|content|term)$/.test(k)) keep.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
      });
      return u.origin + u.pathname + (keep.length ? '?' + keep.join('&') : '');
    } catch (e) { return ''; }
  }

  gtag('set', 'ads_data_redaction', true);
  gtag('js', new Date());
  gtag('config', ID, {
    page_location: cleanUrl(location.href),
    page_referrer: document.referrer ? cleanUrl(document.referrer) : '',
    content_group: contentGroup,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ID);
  document.head.appendChild(s);
})();
