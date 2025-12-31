import React from "react";

const markup = String.raw`
<div class="container">
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 2000 1200"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#212849" />
        <stop offset="35%" stop-color="#2f1b4c" />
        <stop offset="100%" stop-color="#0b1629" />
      </linearGradient>
      <linearGradient id="blockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ff4d6b" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#ff8a5c" stop-opacity="0.65" />
      </linearGradient>
      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ff4d6b" stop-opacity="0" />
        <stop offset="50%" stop-color="#ff4d6b" stop-opacity="0.75" />
        <stop offset="100%" stop-color="#ff4d6b" stop-opacity="0" />
      </linearGradient>
      <radialGradient id="particleGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffc8dd" stop-opacity="1" />
        <stop offset="70%" stop-color="#ff4d6b" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#ff4d6b" stop-opacity="0" />
      </radialGradient>
    </defs>

    <rect fill="url(#bgGradient)" x="0" y="0" width="2000" height="1200" />

    <g id="purplebg" fill="#5728a3" fill-opacity="0.35">
      <path d="M1800 200 Q1500 140 1320 280 T950 260 Q700 200 460 360 L460 20 L1800 0 Z" />
      <path d="M0 1020 Q280 960 450 900 T860 930 Q1140 980 1400 860 T2000 1000 L2000 1200 0 1200 Z" />
      <circle cx="450" cy="260" r="160" fill="#6f3bc7" fill-opacity="0.25" />
      <circle cx="1620" cy="880" r="190" fill="#3e1f86" fill-opacity="0.22" />
    </g>

    <g id="redblocks">
      <rect id="firstBlock" x="1280" y="300" rx="28" ry="28" width="210" height="160" fill="url(#blockGradient)" opacity="0.92" />
      <rect x="1470" y="430" rx="28" ry="28" width="170" height="130" fill="url(#blockGradient)" opacity="0.75" />
      <rect id="blockdis" x="1095" y="410" rx="26" ry="26" width="190" height="140" fill="url(#blockGradient)" opacity="0.65" />
    </g>

    <g id="redblocksparticles" fill="#ff7b98">
      <g>
        <polygon points="1250,520 1264,532 1246,538" />
        <circle cx="1278" cy="550" r="8" fill="url(#particleGlow)" />
        <circle cx="1218" cy="498" r="6" fill="url(#particleGlow)" />
      </g>
      <g>
        <polygon points="1502,520 1516,534 1498,540" />
        <circle cx="1526" cy="556" r="9" fill="url(#particleGlow)" />
        <circle cx="1466" cy="504" r="6" fill="url(#particleGlow)" />
      </g>
      <g>
        <polygon points="1105,420 1118,432 1100,440" />
        <circle cx="1144" cy="456" r="7" fill="url(#particleGlow)" />
        <circle cx="1078" cy="406" r="5" fill="url(#particleGlow)" />
      </g>
    </g>

    <g id="redglowparticles">
      <circle cx="1420" cy="640" r="18" fill="url(#particleGlow)" />
      <circle cx="1330" cy="580" r="14" fill="url(#particleGlow)" />
      <circle cx="1186" cy="660" r="12" fill="url(#particleGlow)" />
      <circle cx="1560" cy="620" r="16" fill="url(#particleGlow)" />
    </g>

    <g id="bottomparticles" fill="#9dd5ff" fill-opacity="0.8">
      <circle cx="360" cy="925" r="12" />
      <circle cx="520" cy="990" r="10" />
      <circle cx="700" cy="940" r="14" />
      <circle cx="860" cy="1030" r="9" />
      <circle cx="1020" cy="980" r="11" />
      <circle cx="1180" cy="1045" r="10" />
      <circle cx="1340" cy="990" r="12" />
      <circle cx="1520" cy="1050" r="8" />
      <circle cx="1680" cy="990" r="10" />
    </g>

    <g id="bottomparticles2" fill="#74facc" fill-opacity="0.7">
      <circle cx="420" cy="1070" r="8" />
      <circle cx="580" cy="1120" r="10" />
      <circle cx="740" cy="1090" r="9" />
      <circle cx="900" cy="1150" r="11" />
      <circle cx="1060" cy="1095" r="9" />
      <circle cx="1220" cy="1130" r="8" />
      <circle cx="1380" cy="1090" r="10" />
      <circle cx="1540" cy="1145" r="9" />
    </g>

    <g id="d-appswrapper" transform="translate(240 260)">
      <g id="d-app" fill="#5ef2d7" fill-opacity="0.65">
        <g>
          <circle cx="0" cy="0" r="18" />
          <circle cx="48" cy="-22" r="10" fill-opacity="0.45" />
          <circle cx="-40" cy="-30" r="8" fill-opacity="0.35" />
        </g>
        <g>
          <circle cx="30" cy="48" r="12" />
          <circle cx="-24" cy="60" r="8" fill-opacity="0.35" />
        </g>
        <g>
          <circle cx="68" cy="28" r="11" />
        </g>
        <g>
          <circle cx="-50" cy="24" r="9" />
        </g>
      </g>
    </g>

    <g id="d-apps2wrapper" transform="translate(1680 780)">
      <g id="d-apps2" fill="#4adeff" fill-opacity="0.55">
        <g>
          <circle cx="0" cy="0" r="16" />
          <circle cx="-40" cy="-10" r="8" fill-opacity="0.4" />
        </g>
        <g>
          <circle cx="32" cy="-28" r="10" />
        </g>
        <g>
          <circle cx="48" cy="24" r="12" />
          <circle cx="12" cy="36" r="7" fill-opacity="0.4" />
        </g>
        <g>
          <circle cx="-28" cy="32" r="9" />
        </g>
      </g>
    </g>

    <g stroke="url(#lineGradient)" stroke-width="4" stroke-linecap="round" opacity="0.35">
      <path d="M360 900 Q520 760 820 820 T1240 720 Q1480 660 1780 520" fill="none" />
      <path d="M240 1040 Q480 940 760 1000 T1180 950 Q1460 880 1780 760" fill="none" />
    </g>
  </svg>
</div>
`;

const CareersHeroBackground = () => {
  return (
    <div className="careers-hero-animation">
      <style>{`
        .careers-hero-animation {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .careers-hero-animation .container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .careers-hero-animation svg {
          width: 125%;
          max-width: none;
          height: auto;
          min-height: 100%;
        }
        #redblocks > * {
          transform: translate3d(160px, -93px, 0);
          animation: moveblocks 4s 1s ease infinite;
        }
        #firstBlock {
          transform: translate3d(160px, -93px, 0);
          animation: firstBlock 4s 1s ease infinite;
        }
        #blockdis {
          animation: blockdis 4s 1s ease infinite;
        }
        #redblocksparticles g polygon {
          opacity: 0.35;
          animation: glow 4s 1s ease infinite;
        }
        #redblocksparticles g circle,
        #redglowparticles > *,
        #bottomparticles > *,
        #bottomparticles2 > * {
          animation: particles 4s ease-in-out infinite alternate, fade 2.6s ease-in-out infinite alternate;
        }
        #redblocksparticles g:nth-child(2) circle,
        #bottomparticles > :nth-child(3n+1),
        #bottomparticles2 > :nth-child(3n+1) {
          animation-delay: 0.24s;
        }
        #redblocksparticles g:nth-child(3) circle,
        #bottomparticles > :nth-child(3n+2),
        #bottomparticles2 > :nth-child(3n+2) {
          animation-delay: 0.45s;
        }
        #purplebg > * {
          animation: float 6s ease-in-out infinite alternate;
        }
        #purplebg > *:nth-child(odd) {
          animation-delay: 1.4s;
        }
        #d-app g,
        #d-apps2 g {
          animation: updown 3.4s ease-in-out infinite alternate;
        }
        #d-app g:nth-child(2),
        #d-apps2 g:nth-child(2) {
          animation-delay: 0.4s;
        }
        #d-app g:nth-child(3),
        #d-apps2 g:nth-child(3) {
          animation-delay: 0.8s;
        }
        #d-app g:nth-child(4),
        #d-apps2 g:nth-child(4) {
          animation-delay: 1.2s;
        }
        @keyframes moveblocks {
          0% {
            transform: translate3d(160px, -93px, 0);
          }
          55%,
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes firstBlock {
          0%,
          18% {
            opacity: 0;
          }
          38%,
          100% {
            opacity: 1;
          }
        }
        @keyframes blockdis {
          30% {
            opacity: 1;
            transform: translate3d(160px, -93px, 0);
          }
          55%,
          100% {
            opacity: 0;
            transform: translate3d(-120px, 140px, 0);
          }
        }
        @keyframes glow {
          0%,
          40% {
            opacity: 0;
          }
          60%,
          100% {
            opacity: 0.35;
          }
        }
        @keyframes float {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(0, -25px, 0);
          }
        }
        @keyframes particles {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(16px, -18px, 0);
          }
        }
        @keyframes updown {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(0, -18px, 0);
          }
        }
        @keyframes fade {
          0%,
          20% {
            opacity: 0;
          }
          55% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        @media (max-width: 1024px) {
          .careers-hero-animation svg {
            width: 165%;
          }
        }
        @media (max-width: 640px) {
          .careers-hero-animation svg {
            width: 220%;
          }
        }
      `}</style>
      <div className="animation-root" dangerouslySetInnerHTML={{ __html: markup }} />
    </div>
  );
};

export default CareersHeroBackground;
