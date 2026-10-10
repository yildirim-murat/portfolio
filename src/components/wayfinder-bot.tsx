import { WayfinderEyes } from "@/components/wayfinder-eyes";

export function WayfinderBot() {
  return (
    <div className="wayfinder-bot" aria-hidden="true">
      <svg
        className="wayfinder-bot__art"
        viewBox="0 0 180 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <defs>
          <linearGradient id="wayfinder-shell" x1="43" y1="20" x2="132" y2="151" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EFA9EF" />
            <stop offset=".46" stopColor="#C978D7" />
            <stop offset="1" stopColor="#925EAF" />
          </linearGradient>
          <linearGradient id="wayfinder-face" x1="48" y1="48" x2="130" y2="134" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF0FB" stopOpacity=".96" />
            <stop offset="1" stopColor="#E9D7F1" stopOpacity=".86" />
          </linearGradient>
          <linearGradient id="wayfinder-eye" x1="64" y1="67" x2="76" y2="96" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset=".68" stopColor="#DDF4F8" />
            <stop offset="1" stopColor="#B5DDE8" />
          </linearGradient>
          <linearGradient id="wayfinder-shell-glint" x1="45" y1="31" x2="134" y2="53" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset=".5" stopColor="#FFFFFF" stopOpacity=".54" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        <ellipse cx="90" cy="153" rx="42" ry="6" fill="#281C38" opacity=".12" />
        <path d="M40 54C30 48 23 36 20 22C18 16 20 12 25 13C27 13 29 14 32 16L58 34C68 27 78 24 90 24C102 24 113 28 123 35L149 16C152 14 155 12 158 14C162 16 160 21 159 25C156 38 150 48 140 56C151 67 157 82 157 103C157 135 130 153 90 153C50 153 23 135 23 103C23 82 29 66 40 54Z" fill="#68417C" opacity=".15" transform="translate(0 3)" />
        <path d="M40 51C30 45 23 33 21 21C19 15 21 11 26 12C29 12 31 14 34 16L58 33C68 26 78 23 90 23C102 23 113 27 123 34L147 16C150 14 153 12 156 13C161 14 160 19 159 23C157 35 150 47 140 54C151 66 156 81 156 102C156 134 130 151 90 151C50 151 24 134 24 102C24 81 29 65 40 51Z" fill="url(#wayfinder-shell)" stroke="#88539D" strokeWidth="1.8" />

        <path d="M31 20C35 32 41 40 50 46M149 20C145 32 139 40 130 46" stroke="#F9D8FC" strokeOpacity=".76" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M36 22C39 30 43 35 49 39M144 22C141 30 137 35 131 39" stroke="#8E5AA7" strokeOpacity=".48" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M44 46C57 36 73 32 90 32C107 32 123 36 136 46" stroke="url(#wayfinder-shell-glint)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M37 78C40 60 59 48 90 48C121 48 140 60 143 78V106C143 125 124 138 90 138C56 138 37 125 37 106V78Z" fill="url(#wayfinder-face)" stroke="#9863AC" strokeOpacity=".7" strokeWidth="1.4" />

        <circle cx="90" cy="42" r="3.4" fill="#A9DCE8" />
        <circle cx="90" cy="42" r="1.3" fill="#FFFFFF" />
        <ellipse cx="68" cy="81" rx="15.5" ry="16.5" fill="url(#wayfinder-eye)" stroke="#A675B9" strokeOpacity=".34" strokeWidth=".8" />
        <ellipse cx="112" cy="81" rx="15.5" ry="16.5" fill="url(#wayfinder-eye)" stroke="#A675B9" strokeOpacity=".34" strokeWidth=".8" />
        <WayfinderEyes />

        <ellipse cx="51" cy="101" rx="5.5" ry="2.6" fill="#D982B6" opacity=".3" />
        <ellipse cx="129" cy="101" rx="5.5" ry="2.6" fill="#D982B6" opacity=".3" />
        <path d="M87.5 102C87.5 100.6 88.6 99.5 90 99.5C91.4 99.5 92.5 100.6 92.5 102C92.5 103.4 91.4 104.5 90 104.5C88.6 104.5 87.5 103.4 87.5 102Z" fill="#A34A78" />
        <path d="M78 108C81.5 116.5 98.5 116.5 102 108" stroke="#824B79" strokeWidth="2.6" strokeLinecap="round" />
        <WayfinderBlink />
        <path d="M70 131H82M98 131H110" stroke="#A858C2" strokeOpacity=".46" strokeWidth="2" strokeLinecap="round" />
        <circle cx="90" cy="131" r="1.8" fill="#BCECF3" />
      </svg>
    </div>
  );
}

function WayfinderBlink() {
  return (
    <g className="wayfinder-bot__blink">
      <ellipse cx="68" cy="81" rx="16" ry="17" fill="#C978D7" />
      <ellipse cx="112" cy="81" rx="16" ry="17" fill="#C978D7" />
    </g>
  );
}
