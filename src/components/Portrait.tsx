import React from 'react';

interface PortraitProps {
  character: string;
  className?: string;
}

const ArchitectPortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    {/* Background */}
    <rect width="200" height="200" fill="#2a2340" />
    {/* Hood/Robe */}
    <path d="M40 200 L40 120 Q40 60 100 50 Q160 60 160 120 L160 200 Z" fill="#1a1530" stroke="#0d0a1a" strokeWidth="3" />
    {/* Face */}
    <ellipse cx="100" cy="110" rx="40" ry="45" fill="#e8d5b8" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Hood top */}
    <path d="M55 95 Q60 50 100 45 Q140 50 145 95" fill="#1a1530" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Eyes - mysterious */}
    <ellipse cx="85" cy="105" rx="8" ry="5" fill="#0d0a1a" />
    <ellipse cx="115" cy="105" rx="8" ry="5" fill="#0d0a1a" />
    <circle cx="87" cy="104" r="2" fill="#ffd700" />
    <circle cx="117" cy="104" r="2" fill="#ffd700" />
    {/* Eyebrows - stern */}
    <path d="M75 95 Q85 90 95 93" fill="none" stroke="#0d0a1a" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M105 93 Q115 90 125 95" fill="none" stroke="#0d0a1a" strokeWidth="2.5" strokeLinecap="round" />
    {/* Mouth - thin smile */}
    <path d="M88 125 Q100 130 112 125" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    {/* Beard */}
    <path d="M80 130 Q85 155 100 160 Q115 155 120 130" fill="#8a8a8a" stroke="#0d0a1a" strokeWidth="1.5" />
    {/* All-seeing eye symbol on chest */}
    <path d="M90 170 L100 160 L110 170 Z" fill="#ffd700" stroke="#0d0a1a" strokeWidth="1.5" />
    <circle cx="100" cy="168" r="3" fill="#0d0a1a" />
  </svg>
);

const BankerPortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#1a3025" />
    {/* Suit */}
    <path d="M50 200 L55 130 L80 120 L100 125 L120 120 L145 130 L150 200 Z" fill="#1a2a20" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Tie */}
    <path d="M95 125 L100 180 L105 125 Z" fill="#2d5a3d" stroke="#0d0a1a" strokeWidth="1.5" />
    {/* Face */}
    <ellipse cx="100" cy="95" rx="38" ry="42" fill="#d4b896" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Hair - slicked back */}
    <path d="M62 85 Q65 55 100 50 Q135 55 138 85" fill="#2a2a2a" stroke="#0d0a1a" strokeWidth="2" />
    {/* Monocle */}
    <circle cx="115" cy="90" r="12" fill="none" stroke="#ffd700" strokeWidth="2" />
    <line x1="127" y1="90" x2="135" y2="110" stroke="#ffd700" strokeWidth="1.5" />
    {/* Eyes */}
    <circle cx="85" cy="90" r="4" fill="#0d0a1a" />
    <circle cx="115" cy="90" r="4" fill="#0d0a1a" />
    {/* Greedy smile */}
    <path d="M82 110 Q100 120 118 110" fill="none" stroke="#0d0a1a" strokeWidth="2.5" strokeLinecap="round" />
    {/* Gold tooth */}
    <rect x="96" y="112" width="8" height="5" fill="#ffd700" stroke="#0d0a1a" strokeWidth="1" />
    {/* Dollar sign on tie clip */}
    <rect x="93" y="140" width="14" height="4" fill="#ffd700" stroke="#0d0a1a" strokeWidth="1" />
  </svg>
);

const AgentPortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#2a1a1a" />
    {/* Suit */}
    <path d="M45 200 L50 130 L75 115 L100 120 L125 115 L150 130 L155 200 Z" fill="#1a1a1a" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* White shirt */}
    <path d="M85 120 L95 200 L105 200 L115 120 Z" fill="#e8e8e8" stroke="#0d0a1a" strokeWidth="1.5" />
    {/* Sunglasses */}
    <rect x="70" y="82" width="25" height="15" rx="3" fill="#0d0a1a" stroke="#333" strokeWidth="2" />
    <rect x="105" y="82" width="25" height="15" rx="3" fill="#0d0a1a" stroke="#333" strokeWidth="2" />
    <line x1="95" y1="89" x2="105" y2="89" stroke="#333" strokeWidth="2" />
    {/* Face */}
    <ellipse cx="100" cy="95" rx="38" ry="42" fill="#c4a882" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Sunglasses ON TOP of face */}
    <rect x="70" y="82" width="25" height="15" rx="3" fill="#0d0a1a" stroke="#444" strokeWidth="2" />
    <rect x="105" y="82" width="25" height="15" rx="3" fill="#0d0a1a" stroke="#444" strokeWidth="2" />
    <line x1="95" y1="89" x2="105" y2="89" stroke="#444" strokeWidth="2" />
    {/* Sunglasses reflection */}
    <rect x="73" y="84" width="8" height="4" rx="1" fill="#334" opacity="0.5" />
    <rect x="108" y="84" width="8" height="4" rx="1" fill="#334" opacity="0.5" />
    {/* Ear piece */}
    <circle cx="62" cy="95" r="4" fill="#333" stroke="#0d0a1a" strokeWidth="1.5" />
    <path d="M62 99 Q60 110 65 120" fill="none" stroke="#333" strokeWidth="1.5" />
    {/* Mouth - serious */}
    <line x1="88" y1="118" x2="112" y2="118" stroke="#0d0a1a" strokeWidth="2.5" strokeLinecap="round" />
    {/* Ear */}
    <ellipse cx="138" cy="95" rx="6" ry="10" fill="#c4a882" stroke="#0d0a1a" strokeWidth="1.5" />
    {/* Hair - short */}
    <path d="M62 80 Q65 55 100 50 Q135 55 138 80" fill="#1a1a1a" stroke="#0d0a1a" strokeWidth="2" />
  </svg>
);

const OraclePortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#1a1030" />
    {/* Robe */}
    <path d="M40 200 L45 130 L70 115 L100 120 L130 115 L155 130 L160 200 Z" fill="#2d1a4a" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Stars on robe */}
    <circle cx="70" cy="160" r="3" fill="#ffd700" />
    <circle cx="130" cy="170" r="2" fill="#ffd700" />
    <circle cx="90" cy="180" r="2.5" fill="#ffd700" />
    <circle cx="115" cy="155" r="2" fill="#ffd700" />
    {/* Face - gaunt */}
    <ellipse cx="100" cy="90" rx="35" ry="40" fill="#b8a080" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Wild hair */}
    <path d="M65 80 Q55 40 75 35 Q85 25 100 30 Q115 25 125 35 Q145 40 135 80" fill="#e8e8e8" stroke="#0d0a1a" strokeWidth="2" />
    <path d="M60 75 Q50 60 65 50" fill="none" stroke="#e8e8e8" strokeWidth="4" />
    <path d="M140 75 Q150 60 135 50" fill="none" stroke="#e8e8e8" strokeWidth="4" />
    {/* Glowing eyes */}
    <circle cx="85" cy="85" r="7" fill="#7b2ff7" opacity="0.6" />
    <circle cx="115" cy="85" r="7" fill="#7b2ff7" opacity="0.6" />
    <circle cx="85" cy="85" r="4" fill="#fff" />
    <circle cx="115" cy="85" r="4" fill="#fff" />
    <circle cx="85" cy="85" r="2" fill="#7b2ff7" />
    <circle cx="115" cy="85" r="2" fill="#7b2ff7" />
    {/* Crazy grin */}
    <path d="M80 110 Q100 125 120 110" fill="none" stroke="#0d0a1a" strokeWidth="2.5" strokeLinecap="round" />
    {/* Third eye */}
    <ellipse cx="100" cy="65" rx="6" ry="4" fill="#7b2ff7" stroke="#0d0a1a" strokeWidth="1.5" />
    <circle cx="100" cy="65" r="2" fill="#fff" />
    {/* Crystal ball in hand */}
    <circle cx="55" cy="175" r="15" fill="#7b2ff7" opacity="0.4" stroke="#aaa" strokeWidth="1.5" />
    <circle cx="52" cy="172" r="4" fill="#fff" opacity="0.3" />
  </svg>
);

const HeirPortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#2a2a15" />
    {/* Modern clothes */}
    <path d="M50 200 L55 135 L80 120 L100 125 L120 120 L145 135 L150 200 Z" fill="#3a3a2a" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Hoodie strings */}
    <line x1="90" y1="125" x2="88" y2="150" stroke="#666" strokeWidth="1.5" />
    <line x1="110" y1="125" x2="112" y2="150" stroke="#666" strokeWidth="1.5" />
    {/* Face - young */}
    <ellipse cx="100" cy="95" rx="36" ry="40" fill="#e8c8a0" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Messy hair */}
    <path d="M64 85 Q60 50 80 45 Q90 40 100 42 Q110 40 120 45 Q140 50 136 85" fill="#4a3520" stroke="#0d0a1a" strokeWidth="2" />
    <path d="M75 50 Q80 42 90 45" fill="#4a3520" stroke="#0d0a1a" strokeWidth="1" />
    {/* Eyes - wide, nervous */}
    <ellipse cx="85" cy="90" rx="7" ry="8" fill="#fff" stroke="#0d0a1a" strokeWidth="1.5" />
    <ellipse cx="115" cy="90" rx="7" ry="8" fill="#fff" stroke="#0d0a1a" strokeWidth="1.5" />
    <circle cx="86" cy="91" r="4" fill="#3a5a2a" />
    <circle cx="116" cy="91" r="4" fill="#3a5a2a" />
    <circle cx="87" cy="90" r="1.5" fill="#0d0a1a" />
    <circle cx="117" cy="90" r="1.5" fill="#0d0a1a" />
    {/* Eyebrows - worried */}
    <path d="M76 78 Q85 75 93 80" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M107 80 Q115 75 124 78" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    {/* Mouth - uncertain */}
    <path d="M90 115 Q100 112 110 115" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    {/* Phone in hand */}
    <rect x="135" y="160" width="18" height="30" rx="3" fill="#333" stroke="#0d0a1a" strokeWidth="1.5" />
    <rect x="137" y="163" width="14" height="22" rx="1" fill="#4a90d9" />
  </svg>
);

const PopePortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#2a2520" />
    {/* Robe */}
    <path d="M45 200 L50 130 L75 115 L100 120 L125 115 L150 130 L155 200 Z" fill="#f5f5dc" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Gold trim */}
    <path d="M75 115 L100 120 L125 115" fill="none" stroke="#ffd700" strokeWidth="3" />
    {/* Face */}
    <ellipse cx="100" cy="95" rx="35" ry="40" fill="#e8d5b8" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Mitre (hat) */}
    <path d="M70 70 L100 30 L130 70 L120 80 L100 75 L80 80 Z" fill="#f5f5dc" stroke="#0d0a1a" strokeWidth="2" />
    <path d="M85 50 L100 35 L115 50" fill="none" stroke="#ffd700" strokeWidth="2" />
    {/* Eyes - wise */}
    <ellipse cx="85" cy="90" rx="6" ry="5" fill="#0d0a1a" />
    <ellipse cx="115" cy="90" rx="6" ry="5" fill="#0d0a1a" />
    <circle cx="86" cy="89" r="2" fill="#fff" />
    <circle cx="116" cy="89" r="2" fill="#fff" />
    {/* Eyebrows - stern */}
    <path d="M75 82 Q85 78 95 82" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M105 82 Q115 78 125 82" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    {/* Beard */}
    <path d="M80 110 Q85 135 100 140 Q115 135 120 110" fill="#e8e8e8" stroke="#0d0a1a" strokeWidth="1.5" />
    {/* Mouth - thin */}
    <path d="M90 115 Q100 118 110 115" fill="none" stroke="#0d0a1a" strokeWidth="1.5" />
    {/* Cross on chest */}
    <rect x="96" y="150" width="8" height="25" fill="#ffd700" stroke="#0d0a1a" strokeWidth="1" />
    <rect x="90" y="158" width="20" height="8" fill="#ffd700" stroke="#0d0a1a" strokeWidth="1" />
  </svg>
);

const KnightPortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#1a1a2a" />
    {/* Armor */}
    <path d="M50 200 L55 130 L80 115 L100 120 L120 115 L145 130 L150 200 Z" fill="#6a6a7a" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Helmet */}
    <path d="M65 85 Q65 45 100 40 Q135 45 135 85 L135 100 L65 100 Z" fill="#8a8a9a" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Visor */}
    <rect x="75" y="80" width="50" height="15" rx="2" fill="#0d0a1a" />
    <line x1="85" y1="80" x2="85" y2="95" stroke="#4a4a5a" strokeWidth="1" />
    <line x1="95" y1="80" x2="95" y2="95" stroke="#4a4a5a" strokeWidth="1" />
    <line x1="105" y1="80" x2="105" y2="95" stroke="#4a4a5a" strokeWidth="1" />
    <line x1="115" y1="80" x2="115" y2="95" stroke="#4a4a5a" strokeWidth="1" />
    {/* Plume */}
    <path d="M100 40 Q110 20 120 30 Q115 35 100 40" fill="#cc3333" stroke="#0d0a1a" strokeWidth="1.5" />
    {/* Sword */}
    <rect x="140" y="140" width="4" height="50" fill="#c0c0c0" stroke="#0d0a1a" strokeWidth="1" />
    <rect x="135" y="138" width="14" height="6" fill="#8a6a3a" stroke="#0d0a1a" strokeWidth="1" />
    {/* Cross on chest */}
    <rect x="96" y="150" width="8" height="20" fill="#cc3333" />
    <rect x="90" y="156" width="20" height="8" fill="#cc3333" />
  </svg>
);

const MerchantPortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#2a2015" />
    {/* Robe */}
    <path d="M50 200 L55 130 L80 115 L100 120 L120 115 L145 130 L150 200 Z" fill="#4a3520" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Face */}
    <ellipse cx="100" cy="95" rx="35" ry="40" fill="#d4b896" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Turban */}
    <path d="M65 80 Q65 45 100 40 Q135 45 135 80" fill="#8a2a2a" stroke="#0d0a1a" strokeWidth="2" />
    <circle cx="100" cy="55" r="8" fill="#ffd700" stroke="#0d0a1a" strokeWidth="1.5" />
    {/* Eyes - cunning */}
    <ellipse cx="85" cy="90" rx="7" ry="5" fill="#fff" stroke="#0d0a1a" strokeWidth="1.5" />
    <ellipse cx="115" cy="90" rx="7" ry="5" fill="#fff" stroke="#0d0a1a" strokeWidth="1.5" />
    <circle cx="87" cy="90" r="3" fill="#3a2a1a" />
    <circle cx="117" cy="90" r="3" fill="#3a2a1a" />
    {/* Eyebrows - raised */}
    <path d="M75 82 Q85 78 95 82" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M105 82 Q115 78 125 82" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    {/* Mustache */}
    <path d="M85 108 Q90 112 95 108" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M105 108 Q110 112 115 108" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    {/* Smile */}
    <path d="M88 115 Q100 122 112 115" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    {/* Beard */}
    <path d="M85 120 Q90 140 100 145 Q110 140 115 120" fill="#3a2a1a" stroke="#0d0a1a" strokeWidth="1.5" />
    {/* Gold coins */}
    <circle cx="70" cy="160" r="6" fill="#ffd700" stroke="#0d0a1a" strokeWidth="1" />
    <circle cx="130" cy="165" r="5" fill="#ffd700" stroke="#0d0a1a" strokeWidth="1" />
  </svg>
);

const ScientistPortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#15202a" />
    {/* Lab coat */}
    <path d="M50 200 L55 130 L80 115 L100 120 L120 115 L145 130 L150 200 Z" fill="#e8e8e8" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Face */}
    <ellipse cx="100" cy="95" rx="35" ry="40" fill="#e8d5b8" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Hair - messy */}
    <path d="M65 80 Q60 45 80 40 Q90 35 100 38 Q110 35 120 40 Q140 45 135 80" fill="#8a8a8a" stroke="#0d0a1a" strokeWidth="2" />
    <path d="M70 50 Q75 40 85 45" fill="#8a8a8a" stroke="#0d0a1a" strokeWidth="1" />
    <path d="M130 50 Q125 40 115 45" fill="#8a8a8a" stroke="#0d0a1a" strokeWidth="1" />
    {/* Glasses */}
    <circle cx="85" cy="90" r="10" fill="none" stroke="#0d0a1a" strokeWidth="2" />
    <circle cx="115" cy="90" r="10" fill="none" stroke="#0d0a1a" strokeWidth="2" />
    <line x1="95" y1="90" x2="105" y2="90" stroke="#0d0a1a" strokeWidth="2" />
    {/* Eyes behind glasses */}
    <circle cx="85" cy="90" r="3" fill="#0d0a1a" />
    <circle cx="115" cy="90" r="3" fill="#0d0a1a" />
    {/* Mouth - thoughtful */}
    <path d="M90 115 Q100 118 110 115" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    {/* Beard */}
    <path d="M85 120 Q90 145 100 150 Q110 145 115 120" fill="#8a8a8a" stroke="#0d0a1a" strokeWidth="1.5" />
    {/* Flask */}
    <path d="M60 160 L65 150 L75 150 L80 160 L75 170 L65 170 Z" fill="#4a90d9" opacity="0.6" stroke="#0d0a1a" strokeWidth="1.5" />
    <circle cx="70" cy="160" r="3" fill="#fff" opacity="0.4" />
  </svg>
);

const AIPortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#0a1520" />
    {/* Body - robotic */}
    <rect x="60" y="120" width="80" height="80" rx="10" fill="#2a3a4a" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Head */}
    <rect x="65" y="50" width="70" height="70" rx="15" fill="#3a4a5a" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Screen face */}
    <rect x="75" y="60" width="50" height="50" rx="5" fill="#0a1520" stroke="#4a90d9" strokeWidth="2" />
    {/* Eyes - glowing */}
    <circle cx="90" cy="80" r="6" fill="#4a90d9">
      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="110" cy="80" r="6" fill="#4a90d9">
      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
    </circle>
    {/* Mouth - digital */}
    <rect x="85" y="95" width="30" height="3" fill="#4a90d9">
      <animate attributeName="width" values="30;20;30" dur="1.5s" repeatCount="indefinite" />
    </rect>
    {/* Antenna */}
    <line x1="100" y1="50" x2="100" y2="35" stroke="#4a90d9" strokeWidth="2" />
    <circle cx="100" cy="33" r="4" fill="#4a90d9">
      <animate attributeName="r" values="4;6;4" dur="1s" repeatCount="indefinite" />
    </circle>
    {/* Circuit patterns */}
    <line x1="70" y1="140" x2="90" y2="140" stroke="#4a90d9" strokeWidth="1" opacity="0.5" />
    <line x1="110" y1="150" x2="130" y2="150" stroke="#4a90d9" strokeWidth="1" opacity="0.5" />
    <circle cx="80" cy="160" r="3" fill="#4a90d9" opacity="0.5" />
    <circle cx="120" cy="170" r="3" fill="#4a90d9" opacity="0.5" />
  </svg>
);

const ReptilianPortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#0a2015" />
    {/* Body - suit */}
    <path d="M50 200 L55 130 L80 115 L100 120 L120 115 L145 130 L150 200 Z" fill="#1a1a1a" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Face - reptilian */}
    <ellipse cx="100" cy="95" rx="35" ry="42" fill="#2a5a3a" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Scales pattern */}
    <circle cx="85" cy="85" r="3" fill="#1a3a2a" opacity="0.5" />
    <circle cx="115" cy="85" r="3" fill="#1a3a2a" opacity="0.5" />
    <circle cx="100" cy="75" r="3" fill="#1a3a2a" opacity="0.5" />
    {/* Eyes - vertical pupils */}
    <ellipse cx="85" cy="90" rx="8" ry="10" fill="#ffff00" stroke="#0d0a1a" strokeWidth="1.5" />
    <ellipse cx="115" cy="90" rx="8" ry="10" fill="#ffff00" stroke="#0d0a1a" strokeWidth="1.5" />
    <ellipse cx="85" cy="90" rx="2" ry="8" fill="#0d0a1a" />
    <ellipse cx="115" cy="90" rx="2" ry="8" fill="#0d0a1a" />
    {/* No nose - just slits */}
    <line x1="97" y1="100" x2="97" y2="105" stroke="#0d0a1a" strokeWidth="1.5" />
    <line x1="103" y1="100" x2="103" y2="105" stroke="#0d0a1a" strokeWidth="1.5" />
    {/* Mouth - thin, sinister */}
    <path d="M85 115 Q100 118 115 115" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    {/* Forked tongue hint */}
    <path d="M98 118 L98 122 M102 118 L102 122" stroke="#cc3333" strokeWidth="1" />
  </svg>
);

const AlienPortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#050520" />
    {/* Body - sleek suit */}
    <path d="M55 200 L60 130 L80 115 L100 120 L120 115 L140 130 L145 200 Z" fill="#2a2a4a" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Head - large, elongated */}
    <ellipse cx="100" cy="85" rx="40" ry="50" fill="#8a8aaa" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Eyes - large, black */}
    <ellipse cx="82" cy="85" rx="12" ry="15" fill="#0d0a1a" />
    <ellipse cx="118" cy="85" rx="12" ry="15" fill="#0d0a1a" />
    {/* Eye shine */}
    <circle cx="78" cy="80" r="3" fill="#4a4a8a" opacity="0.6" />
    <circle cx="114" cy="80" r="3" fill="#4a4a8a" opacity="0.6" />
    {/* Small mouth */}
    <line x1="95" y1="110" x2="105" y2="110" stroke="#0d0a1a" strokeWidth="1.5" strokeLinecap="round" />
    {/* No nose */}
    {/* Antenna-like features */}
    <circle cx="80" cy="45" r="5" fill="#8a8aaa" stroke="#0d0a1a" strokeWidth="1.5" />
    <circle cx="120" cy="45" r="5" fill="#8a8aaa" stroke="#0d0a1a" strokeWidth="1.5" />
  </svg>
);

const CorporationPortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#1a1a1a" />
    {/* Body - corporate suit */}
    <path d="M50 200 L55 130 L80 115 L100 120 L120 115 L145 130 L150 200 Z" fill="#2a2a2a" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Tie */}
    <path d="M95 120 L100 170 L105 120 Z" fill="#8a0000" stroke="#0d0a1a" strokeWidth="1.5" />
    {/* Face - featureless, corporate */}
    <ellipse cx="100" cy="90" rx="35" ry="40" fill="#e8d5b8" stroke="#0d0a1a" strokeWidth="2.5" />
    {/* Sunglasses - corporate */}
    <rect x="70" y="80" width="25" height="12" rx="2" fill="#0d0a1a" stroke="#444" strokeWidth="1.5" />
    <rect x="105" y="80" width="25" height="12" rx="2" fill="#0d0a1a" stroke="#444" strokeWidth="1.5" />
    <line x1="95" y1="86" x2="105" y2="86" stroke="#444" strokeWidth="1.5" />
    {/* Mouth - neutral, corporate smile */}
    <line x1="88" y1="110" x2="112" y2="110" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    {/* Briefcase */}
    <rect x="135" y="155" width="25" height="20" rx="2" fill="#3a2a1a" stroke="#0d0a1a" strokeWidth="1.5" />
    <rect x="143" y="152" width="9" height="5" rx="1" fill="#3a2a1a" stroke="#0d0a1a" strokeWidth="1" />
  </svg>
);

const MuskPortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#0a1520" />
    <path d="M50 200 L55 130 L80 115 L100 120 L120 115 L145 130 L150 200 Z" fill="#1a1a1a" stroke="#0d0a1a" strokeWidth="2.5" />
    <ellipse cx="100" cy="95" rx="35" ry="40" fill="#e8d5b8" stroke="#0d0a1a" strokeWidth="2.5" />
    <path d="M65 80 Q65 50 100 45 Q135 50 135 80" fill="#2a2a2a" stroke="#0d0a1a" strokeWidth="2" />
    <ellipse cx="85" cy="90" rx="6" ry="5" fill="#0d0a1a" />
    <ellipse cx="115" cy="90" rx="6" ry="5" fill="#0d0a1a" />
    <circle cx="86" cy="89" r="2" fill="#fff" />
    <circle cx="116" cy="89" r="2" fill="#fff" />
    <path d="M85 115 Q100 120 115 115" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    <text x="100" y="170" textAnchor="middle" fill="#ffd700" fontSize="10" fontWeight="bold">MARS</text>
  </svg>
);

const RickPortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#1a2530" />
    <path d="M50 200 L55 130 L80 115 L100 120 L120 115 L145 130 L150 200 Z" fill="#e8e8e8" stroke="#0d0a1a" strokeWidth="2.5" />
    <ellipse cx="100" cy="95" rx="35" ry="40" fill="#e8d5b8" stroke="#0d0a1a" strokeWidth="2.5" />
    <path d="M60 75 Q65 40 100 35 Q135 40 140 75" fill="#c0c0c0" stroke="#0d0a1a" strokeWidth="2" />
    <path d="M70 50 Q80 30 90 40" fill="#c0c0c0" stroke="#0d0a1a" strokeWidth="1" />
    <path d="M130 50 Q120 30 110 40" fill="#c0c0c0" stroke="#0d0a1a" strokeWidth="1" />
    <ellipse cx="85" cy="90" rx="8" ry="6" fill="#fff" stroke="#0d0a1a" strokeWidth="1.5" />
    <ellipse cx="115" cy="90" rx="8" ry="6" fill="#fff" stroke="#0d0a1a" strokeWidth="1.5" />
    <circle cx="85" cy="90" r="3" fill="#4a90d9" />
    <circle cx="115" cy="90" r="3" fill="#4a90d9" />
    <path d="M85 110 Q90 115 95 110" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M95 112 Q100 108 105 112" fill="none" stroke="#4aff4a" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="95" y1="112" x2="92" y2="118" stroke="#4aff4a" strokeWidth="1" />
  </svg>
);

const MortyPortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#202a15" />
    <path d="M55 200 L60 135 L80 120 L100 125 L120 120 L140 135 L145 200 Z" fill="#ffff00" stroke="#0d0a1a" strokeWidth="2.5" />
    <ellipse cx="100" cy="95" rx="32" ry="38" fill="#e8d5b8" stroke="#0d0a1a" strokeWidth="2.5" />
    <path d="M68 80 Q70 50 100 45 Q130 50 132 80" fill="#c0a060" stroke="#0d0a1a" strokeWidth="2" />
    <ellipse cx="85" cy="90" rx="9" ry="10" fill="#fff" stroke="#0d0a1a" strokeWidth="1.5" />
    <ellipse cx="115" cy="90" rx="9" ry="10" fill="#fff" stroke="#0d0a1a" strokeWidth="1.5" />
    <circle cx="85" cy="92" r="4" fill="#3a5a2a" />
    <circle cx="115" cy="92" r="4" fill="#3a5a2a" />
    <circle cx="86" cy="91" r="1.5" fill="#0d0a1a" />
    <circle cx="116" cy="91" r="1.5" fill="#0d0a1a" />
    <path d="M85 78 Q90 75 95 78" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M105 78 Q110 75 115 78" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M90 115 Q100 110 110 115" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ZuckPortrait: React.FC = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <rect width="200" height="200" fill="#0a2020" />
    <path d="M50 200 L55 130 L80 115 L100 120 L120 115 L145 130 L150 200 Z" fill="#3a3a3a" stroke="#0d0a1a" strokeWidth="2.5" />
    <ellipse cx="100" cy="95" rx="35" ry="40" fill="#8aaa8a" stroke="#0d0a1a" strokeWidth="2.5" />
    <path d="M65 80 Q65 50 100 45 Q135 50 135 80" fill="#4a4a4a" stroke="#0d0a1a" strokeWidth="2" />
    <ellipse cx="85" cy="90" rx="7" ry="6" fill="#ffff00" stroke="#0d0a1a" strokeWidth="1.5" />
    <ellipse cx="115" cy="90" rx="7" ry="6" fill="#ffff00" stroke="#0d0a1a" strokeWidth="1.5" />
    <ellipse cx="85" cy="90" rx="2" ry="5" fill="#0d0a1a" />
    <ellipse cx="115" cy="90" rx="2" ry="5" fill="#0d0a1a" />
    <line x1="95" y1="105" x2="95" y2="108" stroke="#0d0a1a" strokeWidth="1.5" />
    <line x1="105" y1="105" x2="105" y2="108" stroke="#0d0a1a" strokeWidth="1.5" />
    <path d="M88 115 Q100 118 112 115" fill="none" stroke="#0d0a1a" strokeWidth="2" strokeLinecap="round" />
    <path d="M80 120 Q85 125 90 120" fill="#8aaa8a" stroke="#0d0a1a" strokeWidth="1" />
    <path d="M110 120 Q115 125 120 120" fill="#8aaa8a" stroke="#0d0a1a" strokeWidth="1" />
  </svg>
);

const Portrait: React.FC<PortraitProps> = ({ character, className }) => {
  const portraits: Record<string, React.FC> = {
    architect: ArchitectPortrait,
    banker: BankerPortrait,
    agent: AgentPortrait,
    oracle: OraclePortrait,
    heir: HeirPortrait,
    pope: PopePortrait,
    knight: KnightPortrait,
    merchant: MerchantPortrait,
    scientist: ScientistPortrait,
    ai: AIPortrait,
    reptilian: ReptilianPortrait,
    alien: AlienPortrait,
    corporation: CorporationPortrait,
    musk: MuskPortrait,
    rick: RickPortrait,
    morty: MortyPortrait,
    zuck: ZuckPortrait,
  };

  const SelectedPortrait = portraits[character] || ArchitectPortrait;

  return (
    <div className={`rounded-lg overflow-hidden border-4 border-gray-800 shadow-lg ${className || ''}`}>
      <SelectedPortrait />
    </div>
  );
};

export default Portrait;
