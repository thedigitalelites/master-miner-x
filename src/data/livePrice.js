// Live Bitcoin price and history, shared by the chart, the price cards, the
// ticker, the budget card and the calculator. Sources: CoinGecko (public, no key),
// then Coinbase Exchange, then the last good data saved in this browser.
// If everything fails, callers keep their built-in sample values.
import { useEffect, useState } from 'react';

const TTL = 5 * 60 * 1000;
const mem = new Map();
const listeners = new Set();
let spot = null;

const store = {
  get(k) {
    try { return JSON.parse(localStorage.getItem('mmx:' + k)); } catch { return null; }
  },
  set(k, v) {
    try { localStorage.setItem('mmx:' + k, JSON.stringify(v)); } catch { /* private mode */ }
  },
};

async function getJSON(url, ms = 8000) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, { signal: ctl.signal });
    if (!r.ok) throw new Error(String(r.status));
    return await r.json();
  } finally {
    clearTimeout(t);
  }
}

const RANGE = {
  '24H': { days: 1, gran: 900, span: 86400 },
  '7D': { days: 7, gran: 3600, span: 7 * 86400 },
  '1M': { days: 30, gran: 21600, span: 30 * 86400 },
  '1Y': { days: 365, gran: 86400, span: 300 * 86400 },
};

function setSpot(v) {
  if (!v || !isFinite(v)) return;
  spot = v;
  store.set('spot', v);
  listeners.forEach((fn) => fn(v));
}

/** Price history for a range: array of [ms, price], oldest first. */
export async function fetchHistory(range, { force = false } = {}) {
  const key = 'hist:' + range;
  const hit = mem.get(key);
  if (!force && hit && Date.now() - hit.t < TTL) return hit.data;
  const cfg = RANGE[range];
  let data = null;
  try {
    const j = await getJSON(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${cfg.days}`);
    if (Array.isArray(j.prices) && j.prices.length > 5) data = j.prices;
  } catch { /* try the next source */ }
  if (!data) {
    try {
      const end = Math.floor(Date.now() / 1000);
      const start = end - cfg.span;
      const j = await getJSON(`https://api.exchange.coinbase.com/products/BTC-USD/candles?granularity=${cfg.gran}&start=${new Date(start * 1000).toISOString()}&end=${new Date(end * 1000).toISOString()}`);
      if (Array.isArray(j) && j.length > 5) data = j.map((c) => [c[0] * 1000, c[4]]).reverse();
    } catch { /* fall back to the saved copy */ }
  }
  if (data) {
    mem.set(key, { t: Date.now(), data });
    store.set(key, data);
    setSpot(data[data.length - 1][1]);
    return data;
  }
  return store.get(key);
}

/** Latest BTC price; resolves to null when no source answers. */
export async function fetchSpot() {
  try {
    const j = await getJSON('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    if (j.bitcoin && j.bitcoin.usd) { setSpot(j.bitcoin.usd); return spot; }
  } catch { /* next */ }
  try {
    const j = await getJSON('https://api.exchange.coinbase.com/products/BTC-USD/ticker');
    if (j.price) { setSpot(+j.price); return spot; }
  } catch { /* next */ }
  return spot || store.get('spot');
}

/** React hook: the live BTC price, or `fallback` until one arrives. */
export function useSpot(fallback) {
  const [v, setV] = useState(() => spot || store.get('spot') || fallback);
  useEffect(() => {
    listeners.add(setV);
    if (!spot) fetchSpot();
    return () => listeners.delete(setV);
  }, []);
  return v;
}

const COIN_IDS = {
  BTC: 'bitcoin', BCH: 'bitcoin-cash', LTC: 'litecoin', DOGE: 'dogecoin', BSV: 'bitcoin-cash-sv',
  ZEC: 'zcash', XMR: 'monero', KAS: 'kaspa', ETC: 'ethereum-classic',
};

/** Live ticker prices: { SYM: { usd, change } } or null. */
export async function fetchTicker() {
  const hit = mem.get('ticker');
  if (hit && Date.now() - hit.t < 60000) return hit.data;
  try {
    const ids = Object.values(COIN_IDS).join(',');
    const j = await getJSON(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`);
    const data = {};
    Object.entries(COIN_IDS).forEach(([sym, id]) => {
      if (j[id] && j[id].usd) data[sym] = { usd: j[id].usd, change: j[id].usd_24h_change };
    });
    if (data.BTC) setSpot(data.BTC.usd);
    mem.set('ticker', { t: Date.now(), data });
    store.set('ticker', data);
    return data;
  } catch {
    return store.get('ticker');
  }
}
