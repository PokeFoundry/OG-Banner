const fs = require("fs");

const BRAND = "#5E2590";
const BRAND_LIGHT = "#9D5FD3";

const frame = ({ bg, grid, glow, stripe, mark, markAccent, sub, subFill, rule, tag, tagFill, dot }) => `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="320" viewBox="0 0 1280 320">
  <defs>
    ${bg}
    <radialGradient id="glow" cx="0.84" cy="0.5" r="0.52">
      <stop offset="0" stop-color="${glow}" stop-opacity="0.34"/>
      <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0 L0 0 0 40" fill="none" stroke="#ffffff" stroke-opacity="${grid}" stroke-width="1"/>
    </pattern>
    <linearGradient id="stripe" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${BRAND_LIGHT}"/>
      <stop offset="1" stop-color="${BRAND}"/>
    </linearGradient>
  </defs>

  <rect width="1280" height="320" fill="url(#bg)"/>
  <rect width="1280" height="320" fill="url(#grid)"/>
  <rect width="1280" height="320" fill="url(#glow)"/>
  <rect x="0" y="0" width="7" height="320" fill="${stripe}"/>

  <g transform="translate(74 0)">
    <text x="0" y="162" font-family="Helvetica, Arial, sans-serif" font-size="82" font-weight="bold" letter-spacing="-1">${mark(markAccent)}</text>
    <text x="3" y="212" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="bold" fill="${subFill}" letter-spacing="7.5">${sub}</text>
    <rect x="3" y="238" width="58" height="3" fill="${rule}"/>
  </g>

  <g transform="translate(1206 160)" opacity="0.95">
    <circle cx="0" cy="0" r="7" fill="${dot}"/>
    <circle cx="0" cy="0" r="15" fill="none" stroke="${dot}" stroke-opacity="0.4" stroke-width="2"/>
    <circle cx="0" cy="0" r="25" fill="none" stroke="${dot}" stroke-opacity="0.18" stroke-width="2"/>
  </g>
  <text x="1178" y="166" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="19" font-weight="bold" fill="${tagFill}" letter-spacing="4.5">${tag}</text>
</svg>
`;

const wordmark = (base) => (accent) =>
	accent
		? `<tspan fill="${base}">Poke</tspan><tspan fill="${accent}">Foundry</tspan>`
		: `<tspan fill="${base}">PokeFoundry</tspan>`;

const DARK = {
	bg: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#17161c"/>
      <stop offset="0.55" stop-color="#1f1e26"/>
      <stop offset="1" stop-color="#191622"/>
    </linearGradient>`,
	grid: "0.03",
	glow: BRAND_LIGHT,
	stripe: "url(#stripe)",
	mark: wordmark("#f2f3f5"),
	sub: "SHOPIFY MONITOR",
	subFill: "#a099ad",
	rule: BRAND_LIGHT,
	tag: "CHANGELOG",
	tagFill: "#857e91",
	dot: BRAND_LIGHT,
};

const FIELD = {
	bg: `<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4A1C73"/>
      <stop offset="0.5" stop-color="${BRAND}"/>
      <stop offset="1" stop-color="#3D1660"/>
    </linearGradient>`,
	grid: "0.05",
	glow: "#C9A2F0",
	stripe: "#ffffff",
	mark: wordmark("#ffffff"),
	sub: "SHOPIFY MONITOR",
	subFill: "#D9C4EC",
	rule: "#ffffff",
	tag: "CHANGELOG",
	tagFill: "#C3A8DB",
	dot: "#ffffff",
};

const variants = {
	"p1-dark-accent": { ...DARK, markAccent: BRAND_LIGHT },
	"p2-dark-plain": { ...DARK, markAccent: null },
	"p3-field-accent": { ...FIELD, markAccent: "#D9BCF2" },
	"p4-field-plain": { ...FIELD, markAccent: null },
};

for (const [name, opts] of Object.entries(variants)) {
	fs.writeFileSync(`${process.argv[2]}/${name}.svg`, frame(opts));
	console.log(name);
}
