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
            <stop stopColor="#F4A8FA" />
            <stop offset=".48" stopColor="#D76AEF" />
            <stop offset="1" stopColor="#B14BD4" />
          </linearGradient>
          <linearGradient id="wayfinder-face" x1="48" y1="48" x2="130" y2="134" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F9D8FC" stopOpacity=".9" />
            <stop offset="1" stopColor="#EFC4F8" stopOpacity=".62" />
          </linearGradient>
          <linearGradient id="wayfinder-eye" x1="64" y1="67" x2="76" y2="96" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBFFFF" />
            <stop offset="1" stopColor="#C5E9F2" />
          </linearGradient>
        </defs>

        <ellipse cx="90" cy="153" rx="42" ry="6" fill="#281C38" opacity=".12" />
        <path d="M40 54C29 47 21 33 19 18C18 13 22 10 27 14L58 34C68 27 78 24 90 24C102 24 113 28 123 35L153 14C158 11 162 14 161 19C159 35 151 49 140 56C151 67 157 82 157 103C157 135 130 153 90 153C50 153 23 135 23 103C23 82 29 66 40 54Z" fill="#744184" opacity=".18" transform="translate(0 3)" />
        <path d="M40 51C29 44 22 30 20 16C19 12 23 9 28 13L58 33C68 26 78 23 90 23C102 23 113 27 123 34L152 13C157 10 161 13 160 18C158 34 151 47 140 54C151 66 156 81 156 102C156 134 130 151 90 151C50 151 24 134 24 102C24 81 29 65 40 51Z" fill="url(#wayfinder-shell)" stroke="#A74CC3" strokeWidth="2" />

        <path d="M29 20C34 34 41 43 52 49M151 20C146 34 139 43 128 49" stroke="#FBD6FC" strokeOpacity=".8" strokeWidth="3" strokeLinecap="round" />
        <path d="M42 47C55 36 72 31 90 31C108 31 125 36 138 47" stroke="#FFE6FF" strokeOpacity=".55" strokeWidth="2" strokeLinecap="round" />
        <path d="M37 78C40 60 59 48 90 48C121 48 140 60 143 78V107C143 125 124 138 90 138C56 138 37 125 37 107V78Z" fill="url(#wayfinder-face)" stroke="#A951C3" strokeOpacity=".62" strokeWidth="1.6" />

        <circle cx="90" cy="43" r="3.2" fill="#BCECF3" />
        <circle cx="90" cy="43" r="1.15" fill="#FFFFFF" />
        <ellipse cx="68" cy="81" rx="15" ry="16" fill="url(#wayfinder-eye)" />
        <ellipse cx="112" cy="81" rx="15" ry="16" fill="url(#wayfinder-eye)" />
        <WayfinderEyes />

        <ellipse cx="51" cy="101" rx="5" ry="2.8" fill="#EA79B8" opacity=".36" />
        <ellipse cx="129" cy="101" rx="5" ry="2.8" fill="#EA79B8" opacity=".36" />
        <path d="M87.5 102C87.5 100.6 88.6 99.5 90 99.5C91.4 99.5 92.5 100.6 92.5 102C92.5 103.4 91.4 104.5 90 104.5C88.6 104.5 87.5 103.4 87.5 102Z" fill="#A34A78" />
        <path d="M78 108C81.5 116 98.5 116 102 108" stroke="#88406D" strokeWidth="2.8" strokeLinecap="round" />
        <WayfinderBlink />
        <path d="M69 132H82M98 132H111" stroke="#A858C2" strokeOpacity=".58" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function WayfinderBlink() {
  return (
    <g className="wayfinder-bot__blink">
      <ellipse cx="68" cy="81" rx="15.5" ry="16.5" fill="#D76AEF" />
      <ellipse cx="112" cy="81" rx="15.5" ry="16.5" fill="#D76AEF" />
    </g>
  );
}
