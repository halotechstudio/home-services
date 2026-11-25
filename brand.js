/*
 * White-label brand config for the Home Services demo apps.
 *
 * Any coworking operator can be previewed by changing DEFAULT_BRAND below, or
 * without editing code via URL parameters, which are remembered for the visit:
 *   ?brand=Acme%20Works&accent=%23ff7a1a&branch=Pune
 * Add &screen=<page id> to open a specific screen (e.g. screen=book).
 * Add &reset=1 to clear a saved brand.
 */
(function () {
  var DEFAULT_BRAND = {
    name: 'Home Services',
    accent: '#9dff6e',
    branch: 'Hyderabad'
  };
  var KEY = 'hs-brand';

  var params = new URLSearchParams(location.search);
  var saved = {};
  try {
    if (params.get('reset')) localStorage.removeItem(KEY);
    saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {};
  } catch (e) { saved = {}; }

  var brand = Object.assign({}, DEFAULT_BRAND, saved);
  ['brand', 'accent', 'branch'].forEach(function (k) {
    var v = params.get(k);
    if (v) brand[k === 'brand' ? 'name' : k] = v.slice(0, 40);
  });
  if (!/^#[0-9a-f]{6}$/i.test(brand.accent)) brand.accent = DEFAULT_BRAND.accent;
  try { localStorage.setItem(KEY, JSON.stringify(brand)); } catch (e) { /* private mode */ }

  function hexToRgb(h) {
    var n = parseInt(h.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function luminance(rgb) {
    var c = rgb.map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }

  var rgb = hexToRgb(brand.accent);
  var soft = rgb.map(function (v) { return Math.round(v + (255 - v) * 0.55); });
  var root = document.documentElement.style;
  root.setProperty('--brand', brand.accent);
  root.setProperty('--brand-2', 'rgb(' + soft.join(',') + ')');
  root.setProperty('--on-brand', luminance(rgb) > 0.35 ? '#0a0a0c' : '#ffffff');

  var initial = brand.name.trim().charAt(0).toUpperCase() || 'C';
  document.querySelectorAll('[data-brand]').forEach(function (el) { el.textContent = brand.name; });
  document.querySelectorAll('[data-brand-initial]').forEach(function (el) { el.textContent = initial; });
  document.querySelectorAll('[data-branch]').forEach(function (el) { el.textContent = brand.branch; });
  if (document.body.dataset.titleSuffix) document.title = brand.name + ' · ' + document.body.dataset.titleSuffix;

  window.BRAND = brand;

  var screen = params.get('screen');
  if (screen) {
    if (typeof window.go === 'function') window.go(screen);
    else if (typeof window.show === 'function') window.show(screen);
  }
})();
