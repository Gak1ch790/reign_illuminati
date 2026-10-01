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

const Portrait: React.FC<PortraitProps> = ({ character, className }) => {
  const portraits: Record<string, React.FC> = {
    architect: ArchitectPortrait,
    banker: BankerPortrait,
    agent: AgentPortrait,
    oracle: OraclePortrait,
    heir: HeirPortrait,
  };

  const SelectedPortrait = portraits[character] || ArchitectPortrait;

  return (
    <div className={`rounded-lg overflow-hidden border-4 border-gray-800 shadow-lg ${className || ''}`}>
      <SelectedPortrait />
    </div>
  );
};

export default Portrait;
