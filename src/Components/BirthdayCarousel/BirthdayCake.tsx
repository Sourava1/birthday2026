import React from "react";
import confetti from "canvas-confetti";
import "./BirthdayCake.css";

const BirthdayCake: React.FC = () => {
  const handleCakeClick = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.45 },
      colors: ["#ffd166", "#06d6a0", "#118ab2", "#7b2cbf", "#ffffff", "#ff70a6"],
    });
  };

  return (
    <div className="cake-center-wrapper">
      {/* Korean Nickname Cake Topper */}
      <div className="cake-topper-container">
        <span className="cake-topper-korean">리유우</span>
        <span className="cake-topper-english">riuu ✨</span>
      </div>

      {/* SVG Luxury Tiered Birthday Cake */}
      <div
        className="cake-scaling-box"
        onClick={handleCakeClick}
        title="Happy Birthday Riya 🎂"
      >
        <svg
          viewBox="0 0 320 280"
          className="luxury-cake-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Ambient Shadow & Glow Filters */}
            <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Pedestal Gradients */}
            <linearGradient id="pedestalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Cake Tiers Gradients (Rich Cream & Strawberry) */}
            <linearGradient id="bottomTierGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="35%" stopColor="#ffedd5" />
              <stop offset="80%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
            <linearGradient id="topTierGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="40%" stopColor="#fff1f2" />
              <stop offset="80%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>

            {/* Glaze Drip Gradients */}
            <linearGradient id="strawberryGlaze" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
            <linearGradient id="chocolateDrip" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#673200" />
              <stop offset="100%" stopColor="#451e00" />
            </linearGradient>

            {/* Candle Gradients */}
            <linearGradient id="candle1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="candle2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
            <linearGradient id="candle3Grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>

            {/* Flame Radial Gradient */}
            <radialGradient id="flameRadial" cx="50%" cy="80%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#fef08a" />
              <stop offset="65%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </radialGradient>
          </defs>

          {/* 1. Pedestal Stand Plate */}
          <ellipse cx="160" cy="245" rx="140" ry="18" fill="rgba(0,0,0,0.35)" />
          <path d="M 140 240 Q 160 252 180 240 L 175 255 L 145 255 Z" fill="url(#pedestalGrad)" />
          <ellipse cx="160" cy="235" rx="136" ry="16" fill="url(#goldRimGrad)" />
          <ellipse cx="160" cy="233" rx="130" ry="14" fill="url(#pedestalGrad)" />

          {/* 2. Bottom Tier (Sponged Cream with Piping) */}
          <path
            d="M 50 185 Q 160 215 270 185 L 270 215 Q 160 245 50 215 Z"
            fill="url(#bottomTierGrad)"
          />
          <ellipse cx="160" cy="185" rx="110" ry="18" fill="#ffedd5" />

          {/* Bottom Tier Cream Rosettes Piping */}
          <g fill="#ffffff">
            {[60, 85, 110, 135, 160, 185, 210, 235, 260].map((x, i) => (
              <circle
                key={i}
                cx={x}
                cy={215 + Math.sin((i / 8) * Math.PI) * 14}
                r="6"
                fill="#fffdfa"
                stroke="#fed7aa"
                strokeWidth="0.8"
              />
            ))}
          </g>

          {/* 3. Top Tier */}
          <path
            d="M 85 130 Q 160 155 235 130 L 235 160 Q 160 185 85 160 Z"
            fill="url(#topTierGrad)"
          />
          <ellipse cx="160" cy="130" rx="75" ry="15" fill="#fce7f3" />

          {/* Glaze Drips on Top Tier */}
          <path
            d="M 85 130 
               Q 100 155 110 135 
               Q 125 165 140 135 
               Q 160 170 175 135 
               Q 195 160 210 135 
               Q 225 150 235 130 
               Q 160 155 85 130 Z"
            fill="url(#strawberryGlaze)"
            opacity="0.9"
          />

          {/* Strawberries / Sugar Pearls on Top Tier */}
          <g>
            {/* Left Strawberry */}
            <circle cx="108" cy="126" r="6.5" fill="#ef4444" />
            <path d="M 105 120 Q 108 122 111 120" stroke="#16a34a" strokeWidth="2" fill="none" />
            {/* Center-Left Cream Rosette */}
            <circle cx="132" cy="128" r="6" fill="#ffffff" />
            {/* Center Strawberry */}
            <circle cx="160" cy="134" r="7.5" fill="#f43f5e" />
            <path d="M 156 127 Q 160 129 164 127" stroke="#16a34a" strokeWidth="2.5" fill="none" />
            {/* Center-Right Cream Rosette */}
            <circle cx="188" cy="128" r="6" fill="#ffffff" />
            {/* Right Strawberry */}
            <circle cx="212" cy="126" r="6.5" fill="#ef4444" />
            <path d="M 209 120 Q 212 122 215 120" stroke="#16a34a" strokeWidth="2" fill="none" />
          </g>

          {/* 4. Three Birthday Candles */}
          {/* Candle Left */}
          <rect x="114" y="65" width="10" height="52" rx="3" fill="url(#candle1Grad)" />
          {/* Candle Stripes */}
          <line x1="114" y1="75" x2="124" y2="70" stroke="#ffffff" strokeWidth="2.5" opacity="0.65" />
          <line x1="114" y1="90" x2="124" y2="85" stroke="#ffffff" strokeWidth="2.5" opacity="0.65" />
          <line x1="114" y1="105" x2="124" y2="100" stroke="#ffffff" strokeWidth="2.5" opacity="0.65" />
          <line x1="119" y1="65" x2="119" y2="57" stroke="#262626" strokeWidth="1.8" />

          {/* Candle Center (Taller) */}
          <rect x="155" y="50" width="10" height="65" rx="3" fill="url(#candle2Grad)" />
          <line x1="155" y1="62" x2="165" y2="57" stroke="#ffffff" strokeWidth="2.5" opacity="0.65" />
          <line x1="155" y1="78" x2="165" y2="73" stroke="#ffffff" strokeWidth="2.5" opacity="0.65" />
          <line x1="155" y1="94" x2="165" y2="89" stroke="#ffffff" strokeWidth="2.5" opacity="0.65" />
          <line x1="160" y1="50" x2="160" y2="42" stroke="#262626" strokeWidth="1.8" />

          {/* Candle Right */}
          <rect x="196" y="65" width="10" height="52" rx="3" fill="url(#candle3Grad)" />
          <line x1="196" y1="75" x2="206" y2="70" stroke="#ffffff" strokeWidth="2.5" opacity="0.65" />
          <line x1="196" y1="90" x2="206" y2="85" stroke="#ffffff" strokeWidth="2.5" opacity="0.65" />
          <line x1="196" y1="105" x2="206" y2="100" stroke="#ffffff" strokeWidth="2.5" opacity="0.65" />
          <line x1="201" y1="65" x2="201" y2="57" stroke="#262626" strokeWidth="1.8" />

          {/* 5. Candle Flames (Always Glowing) */}
          <g filter="url(#flameGlow)">
            {/* Flame Left */}
            <path
              d="M 119 57 C 113 47, 113 40, 119 33 C 125 40, 125 47, 119 57 Z"
              fill="url(#flameRadial)"
              className="cake-flame-anim flame-left"
            />
            {/* Flame Center */}
            <path
              d="M 160 42 C 153 30, 153 22, 160 14 C 167 22, 167 30, 160 42 Z"
              fill="url(#flameRadial)"
              className="cake-flame-anim flame-center"
            />
            {/* Flame Right */}
            <path
              d="M 201 57 C 195 47, 195 40, 201 33 C 207 40, 207 47, 201 57 Z"
              fill="url(#flameRadial)"
              className="cake-flame-anim flame-right"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default BirthdayCake;
