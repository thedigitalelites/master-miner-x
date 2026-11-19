import { market } from '../data/content.js';

const DAYS_PER_MONTH = 30.42;

/** BTC mined per day for a given hashrate (TH/s). */
export function btcPerDay({
  hashrateTh,
  difficulty = market.difficulty,
  subsidy = market.blockSubsidy,
  txFeePct = 2,
  uptimePct = 95,
  poolFeePct = 1,
}) {
  const gross = (hashrateTh * 1e12 * 86400 * subsidy) / (difficulty * 2 ** 32);
  return gross * (1 + txFeePct / 100) * (uptimePct / 100) * (1 - poolFeePct / 100);
}

/** Monthly economics for one machine at a given hosting rate. */
export function minerMonthly(miner, rate, btcPrice = market.btcPrice) {
  const uptime = 0.95;
  const revenueDay = miner.scrypt
    ? miner.revenuePerDay
    : btcPerDay({ hashrateTh: miner.hashrate }) * btcPrice;
  const hostingDay = (miner.power / 1000) * 24 * rate * uptime;
  const revenue = revenueDay * DAYS_PER_MONTH;
  const costs = hostingDay * DAYS_PER_MONTH;
  const net = revenue - costs;
  const payback = net > 0 ? Math.round(miner.price / net) : null;
  return { revenue, costs, net, payback };
}

export const DAYS = DAYS_PER_MONTH;

export const usd = (n, digits = 2) =>
  (n < 0 ? '-$' : '$') +
  Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

export const num = (n, digits = 0) =>
  n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
