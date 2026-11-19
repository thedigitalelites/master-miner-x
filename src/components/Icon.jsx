// Minimal stroke icon set (24x24 grid). Usage: <Icon name="bolt" />
const paths = {
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></>,
  chart: <><path d="M4 20h16" /><path d="M7 16v-4M11 16V9M15 16v-6M19 16V6" /></>,
  dollar: <><path d="M12 3v18" /><path d="M16.5 7.5c0-1.7-2-3-4.5-3s-4.5 1.3-4.5 3S9.5 10.5 12 11s4.5 1.3 4.5 3.2-2 3.3-4.5 3.3-4.5-1.3-4.5-3" /></>,
  database: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" /><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></>,
  calculator: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8" /><path d="M8 11h.01M12 11h.01M16 11h.01M8 14.5h.01M12 14.5h.01M16 14.5h.01M8 18h.01M12 18h.01M16 18h.01" /></>,
  chip: <><rect x="7" y="7" width="10" height="10" rx="1" /><rect x="10" y="10" width="4" height="4" /><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" /></>,
  server: <><rect x="4" y="4" width="16" height="7" rx="1.5" /><rect x="4" y="13" width="16" height="7" rx="1.5" /><path d="M8 7.5h.01M8 16.5h.01M12 7.5h4M12 16.5h4" /></>,
  wrench: <path d="M14.5 5.5a4 4 0 0 0-5.3 5.1L4 15.8 8.2 20l5.2-5.2a4 4 0 0 0 5.1-5.3l-2.6 2.6-2.8-.7-.7-2.8 2.1-2.1z" />,
  gauge: <><path d="M4.5 17a8.5 8.5 0 1 1 15 0" /><path d="M12 13l4-4" /><circle cx="12" cy="13" r="1.2" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
  shield: <><path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3z" /><path d="m9 12 2 2 4-4" /></>,
  snowflake: <><path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7" /><path d="m9.5 4 2.5 2 2.5-2M9.5 20l2.5-2 2.5 2" /></>,
  monitor: <><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M8 20h8M12 16v4" /><path d="m6 11 2.5-2.5 2 2L13 7l2 3h3" /></>,
  calendar: <><rect x="4" y="5" width="16" height="15" rx="1.5" /><path d="M4 10h16M8 3v4M16 3v4" /><path d="m9 15 2 2 4-4" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.3-4.3M11 8.5v5M8.5 11h5" /></>,
  bars: <><rect x="4" y="4" width="16" height="16" rx="1.5" /><path d="M8.5 16v-4M12 16V8M15.5 16v-6" /></>,
  remote: <><rect x="3" y="5" width="13" height="10" rx="1.5" /><path d="M7 19h5M9.5 15v4" /><rect x="17" y="9" width="4" height="10" rx="1" /></>,
  headset: <><path d="M4 15v-3a8 8 0 0 1 16 0v3" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  checkCircle: <><circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.8 2.8L16.5 9.5" /></>,
  cart: <><path d="M3 4h2.5l2.2 10.5h10.5L20.5 8H7" /><circle cx="9.5" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></>,
  bitcoin: <path d="M9 5v14M12 5v2M12 17v2M7 7h6.5a2.5 2.5 0 0 1 0 5H7m0 0h7.5a2.5 2.5 0 0 1 0 5H7" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4.5 20.5c1-4 4-6 7.5-6s6.5 2 7.5 6" /></>,
  box: <><path d="m12 2.8 8 4.4v9.6l-8 4.4-8-4.4V7.2l8-4.4z" /><path d="M4 7.2 12 11.6l8-4.4M12 11.6V21" /></>,
  refresh: <><path d="M4 12a8 8 0 0 1 14-5.3L20 9" /><path d="M20 4v5h-5" /><path d="M20 12a8 8 0 0 1-14 5.3L4 15" /><path d="M4 20v-5h5" /></>,
  reset: <><path d="M4 4v6h6" /><path d="M4.5 13a8 8 0 1 0 2-7L4 10" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowDiag: <path d="M7 17 17 7M9 7h8v8" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  hash: <path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16" />,
  coins: <><ellipse cx="9" cy="8" rx="5.5" ry="2.5" /><path d="M3.5 8v4c0 1.4 2.5 2.5 5.5 2.5" /><ellipse cx="15" cy="14" rx="5.5" ry="2.5" /><path d="M9.5 14v4c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-4" /></>,
  whatsapp: <><path d="M4 20l1.3-4A8 8 0 1 1 8 18.8L4 20z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2L9 9.5z" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  trend: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  receipt: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" /><path d="M9 8h6M9 12h6" /></>,
};

export default function Icon({ name, size = 20, className = '', strokeWidth = 1.6 }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
