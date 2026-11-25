// All copy and placeholder figures for the Crypto Mining page live here.
// Swap these values for live data (price feed, inventory API) when wiring up.

export const nav = [
  { label: 'AI Infrastructure', href: '#', dropdown: true },
  { label: 'Crypto Mining', href: '#', active: true, dropdown: true },
  { label: 'Data Centers & Hosting', href: '#', dropdown: true },
  { label: 'Infrastructure Investment', href: '#' },
  { label: 'Company', href: '#' },
];

export const tickerCoins = [
  { sym: 'BTC', price: '$64,182', change: '+2.41%', color: '#f7a531' },
  { sym: 'BCH', price: '$282.13', change: '+5.00%', color: '#4fe3b8' },
  { sym: 'LTC', price: '$66.08', change: '+3.11%', color: '#4277c9' },
  { sym: 'DOGE', price: '$0.0773', change: '+5.53%', color: '#c9c9c9' },
  { sym: 'BSV', price: '$17.53', change: '+6.25%', color: '#5a74e8' },
  { sym: 'ZEC', price: '$1,325', change: '+12.21%', color: '#9a63e0' },
  { sym: 'XMR', price: '$636.60', change: '+1.21%', color: '#c9a640' },
  { sym: 'KAS', price: '$0.0912', change: '-0.84%', color: '#49d8c4' },
  { sym: 'ETC', price: '$18.42', change: '+0.92%', color: '#57b26a' },
];

export const market = {
  hashprice: 0.02998, // USD per TH/s per day, before pool fees
  btcPrice: 64120.39,
  btcHigh12m: 96933,
  difficulty: 134823837323272.66,
  blockSubsidy: 3.125,
  productionCost: 31562,
  spotPrice: 64182,
};

export const hostingTiers = [
  { rate: 0.08, label: 'Starter' },
  { rate: 0.075, label: 'Premium' },
  { rate: 0.07, label: 'Enterprise' },
  { rate: 0.065, label: 'Enterprise Plus' },
];

// revenuePerDay is only used for non-SHA-256 machines (e.g. Scrypt), where the
// Bitcoin formula does not apply.
export const miners = [
  {
    id: 's21j-xp-hydro',
    brand: 'Bitmain',
    name: 'Antminer S21j XP Hydro',
    hashrate: 495,
    unit: 'TH/s',
    power: 5940,
    cooling: 'Hydro',
    price: 8350,
    monthly: 195,
    tag: 'Most purchased',
    bundles: true,
    available: true,
    image: 'img/miner-hydro.webp',
  },
  {
    id: 's23-hydro',
    brand: 'Bitmain',
    name: 'Antminer S23 Hydro',
    hashrate: 563,
    unit: 'TH/s',
    power: 5630,
    cooling: 'Hydro',
    price: 15000,
    monthly: 350,
    tag: 'Most profitable',
    available: true,
    image: 'img/miner-hydro.webp',
  },
  {
    id: 's21-xp',
    brand: 'Bitmain',
    name: 'Antminer S21 XP',
    hashrate: 270,
    unit: 'TH/s',
    power: 3645,
    cooling: 'Air',
    price: 4250,
    monthly: 99,
    available: true,
    marketplace: true,
    image: 'img/miner-air.webp',
  },
  {
    id: 'l9',
    brand: 'Bitmain',
    name: 'Antminer L9',
    hashrate: 17,
    unit: 'GH/s',
    variants: ['17 GH/s', '16.5', '16'],
    power: 3360,
    cooling: 'Air',
    price: 4600,
    monthly: 107,
    tag: 'Litecoin & Doge',
    available: true,
    scrypt: true,
    revenuePerDay: 6.47,
    image: 'img/miner-air.webp',
  },
  {
    id: 's21-pro',
    brand: 'Bitmain',
    name: 'Antminer S21 Pro',
    hashrate: 234,
    unit: 'TH/s',
    power: 3510,
    cooling: 'Air',
    price: 3650,
    monthly: 85,
    available: false,
    image: 'img/miner-air.webp',
  },
  {
    id: 's21e-xp-hyd',
    brand: 'Bitmain',
    name: 'Antminer S21e XP Hydro',
    hashrate: 430,
    unit: 'TH/s',
    power: 5590,
    cooling: 'Hydro',
    price: 5600,
    monthly: 130,
    available: false,
    image: 'img/miner-hydro.webp',
  },
  {
    id: 'm63s',
    brand: 'MicroBT',
    name: 'WhatsMiner M63S',
    hashrate: 390,
    unit: 'TH/s',
    power: 7215,
    cooling: 'Hydro',
    price: 6900,
    monthly: 160,
    available: false,
    image: 'img/miner-hydro.webp',
  },
  {
    id: 'a1566',
    brand: 'Canaan',
    name: 'Avalon A1566',
    hashrate: 185,
    unit: 'TH/s',
    power: 3420,
    cooling: 'Air',
    price: 2950,
    monthly: 69,
    available: false,
    image: 'img/miner-air.webp',
  },
];

export const whyMine = {
  optionA: {
    label: 'Option A',
    title: 'Buy 1 BTC',
    intro: 'You hold one coin. Your position never grows – it only moves with price.',
    introLines: ['You hold one coin. Your position never grows – it', 'only moves with price.'],
    rows: [
      ['target', 'Exposure', '100% price. Nothing else moves the number.'],
      ['chart', 'Yield', 'None. One coin stays one coin.'],
      ['dollar', 'Cost basis', 'Fixed at today’s spot, whatever that is.'],
      ['database', 'Residual', 'The coin. That’s it.'],
    ],
  },
  optionB: {
    label: 'Option B',
    title: 'Buy 1 BTC of miners',
    intro: 'You hold machines that produce coin daily at a cost below what the market charges for it.',
    introLines: ['You hold machines that produce coin daily at a cost', 'below what the market charges for it.'],
    rows: [
      ['target', 'Exposure', 'Price and production. Your stack grows every day.'],
      ['chart', 'Yield', 'Daily BTC output, paid to your own wallet.'],
      ['dollar', 'Cost basis', 'Averaged down over time – you buy at production cost, not spot.'],
      ['database', 'Residual', 'The BTC you mined plus resaleable hardware.'],
    ],
  },
};


export const whyHost = [
  {
    icon: 'chip',
    title: 'You own the hardware',
    text: 'Buy the ASIC miner outright. It is your asset, hosted under a clear agreement, with no cloud contracts or outside machines.',
    lines: ['Buy the ASIC miner outright. It is your', 'asset, hosted under a clear agreement,', 'with no cloud contracts or outside', 'machines.'],
  },
  {
    icon: 'server',
    title: 'White-glove US hosting',
    text: 'Racked in our Iowa data centers, all in from $0.065/kWh, with 95% average uptime and 24/7 monitoring.',
    lines: ['Racked in our Iowa data centers,', 'all in from $0.065/kWh, with 95%', 'average uptime and 24/7 monitoring.'],
  },
  {
    icon: 'wrench',
    title: 'Certified in-house repair',
    text: 'Our own repair center handles hashboard and PSU failures fast. Units bought from us get 12 months of free parts and labor, with no dollar cap.',
    lines: ['Our own repair center handles', 'hashboard and PSU failures fast.', 'Units bought from us get 12 months of', 'free parts and labor, with no dollar cap.'],
  },
  {
    icon: 'gauge',
    title: 'Precision billing & pause',
    text: 'Pay only for the hours your machine is actually hashing, and pause during down markets without penalty.',
    lines: ['Pay only for the hours your machine', 'is actually hashing, and pause during', 'down markets without penalty.'],
  },
];

export const hostingFeatures = [
  ['snowflake', 'Industrial Cooling'],
  ['bolt', 'Competitive Electricity Pricing'],
  ['monitor', '24/7 Monitoring'],
  ['calendar', 'Preventive Maintenance'],
  ['search', 'Hardware Diagnostics'],
  ['bars', 'Real-Time Dashboard'],
  ['remote', 'Remote Management'],
  ['headset', 'Dedicated Support'],
];

export const hostingIncludes = [
  'Electricity',
  'Rack Space',
  'Cooling',
  'Internet Connectivity',
  'Monitoring',
  'Technical Support',
  'Preventive Maintenance',
  'Basic Cleaning',
];

export const repairParts = [
  {
    id: 'fans',
    label: 'Fans',
    where: 'Fixed on site',
    text: 'Swapped on site with a tested fan, and the speed checked under load.',
    faults: ['Fan error, the miner stops hashing', 'Worn bearings: noisy, slow or stalling'],
    pos: { x: 7.6, y: 59 },
  },
  {
    id: 'chassis',
    label: 'Chassis and airflow',
    where: 'Fixed on site',
    text: 'Cleaned, resealed and checked for hot spots so air moves through the boards the way it should.',
    faults: ['Dust build-up raising chip temperature', 'Bent or loose panels leaking airflow'],
    pos: { x: 29, y: 44 },
  },
  {
    id: 'hashboards',
    label: 'Hashboards',
    where: 'Sent to the lab',
    text: 'Diagnosed chip by chip in our repair lab, reworked and burned in before going back on the rack.',
    faults: ['Board missing from the chain or low chip count', 'Hashrate well below rated output'],
    pos: { x: 51, y: 56 },
  },
  {
    id: 'control',
    label: 'Control board',
    where: 'Fixed on site',
    text: 'Re-flashed or replaced on site, with network settings and pool details restored.',
    faults: ['Miner not reachable on the network', 'Firmware boot loops or corrupt settings'],
    pos: { x: 66, y: 57 },
  },
  {
    id: 'psu',
    label: 'Power supply',
    where: 'Fixed on site',
    text: 'Swapped for a tested unit on site, then voltage and load checked before the miner restarts.',
    faults: ['Miner will not power on', 'Random restarts under full load'],
    pos: { x: 79, y: 42 },
  },
];

export const faqs = [
  {
    icon: 'cart',
    q: 'Can I purchase a miner directly online?',
    a: 'Yes. Add any in-stock model to your cart and check out online, or talk to our sales team if you want a custom fleet, bundle pricing or a payment plan.',
  },
  {
    icon: 'bitcoin',
    q: 'How much does a Bitcoin mining machine cost?',
    a: 'Current models range from a few thousand dollars to around $15,000 per unit, depending on hashrate, efficiency and cooling type. Every listing shows the price, the estimated monthly net and the payback period.',
  },
  {
    icon: 'user',
    q: 'Do I own my Bitcoin mining machine?',
    a: 'Yes. You buy the hardware outright and it is registered to you. We host and maintain it under a clear hosting agreement, and you can sell or move it at any time.',
  },
  {
    icon: 'server',
    q: 'What does hosting include?',
    a: 'Electricity, rack space, cooling, internet connectivity, 24/7 monitoring, technical support, preventive maintenance and basic cleaning, all in one per-kWh rate.',
  },
  {
    icon: 'clock',
    q: 'How soon will my miner be up and running?',
    a: 'In-stock machines are typically racked and hashing within 7 to 14 days of payment. You get a live date at checkout and a notification as soon as your miner goes online.',
  },
  {
    icon: 'box',
    q: 'What if the miner I want is not in stock?',
    a: 'You can reserve it from the next shipment, or we can suggest an in-stock model with similar returns. Reservations are confirmed with an expected live date.',
  },
  {
    icon: 'shield',
    q: 'What warranty comes with my Bitcoin miner?',
    a: 'Every new unit includes the manufacturer warranty, and machines bought and hosted with us get 12 months of free parts and labor from our in-house repair team.',
  },
  {
    icon: 'refresh',
    q: 'What is Master Miner X’s return policy?',
    a: 'Unopened machines can be returned within 14 days. Hosted machines that arrive faulty are repaired or replaced at no cost. Full terms are in our sales agreement.',
  },
];

export const footerCols = [
  { title: 'AI Infrastructure', links: ['GPU Cloud', 'AI Clusters', 'AI Hosting'] },
  { title: 'Crypto Mining', links: ['ASIC Sales', 'Hosting', 'Mining Farm Development'] },
  { title: 'Data Centers & Hosting', links: ['Colocation', 'Dedicated Hosting'] },
  { title: 'Company', links: ['About', 'Investment', 'Contact'] },
];

// Product page copy. Sample data for layout; replace with real listings.
export const productInfo = {
  description: (m) =>
    `${m.brand}'s ${m.cooling === 'Hydro' ? 'hydro-cooled' : 'air-cooled'} ${m.name.replace('Antminer ', '')} Bitcoin miner, bought and hosted with Master Miner X. You own the machine, choose the pool and get paid to your own wallet.`,
  bundles: [
    ['1–4 units', 1],
    ['5–9 units', 0.98],
    ['10+ units', 0.96],
  ],
  howItWorks: [
    'Order the machine and pick a hosting rate.',
    'We rack it in our Iowa facility and bring it online.',
    'Rewards go to the pool and wallet you choose.',
  ],
  repairs: [
    '12 months of free parts and labor on units bought from us.',
    'Hashboard and PSU repairs handled in our own repair center.',
    'Swap units available while a machine is in the lab.',
  ],
};
