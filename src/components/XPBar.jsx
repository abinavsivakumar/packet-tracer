import React from 'react';

const XPBar = ({ currentXP, xpToNext, level }) => {
  const percentage = Math.min((currentXP / xpToNext) * 100, 100);

  return (
    <div className="w-full md:w-96 bg-surface-container-lowest p-6 rounded-lg ambient-shadow border border-white/40">
      <div className="flex justify-between items-end mb-3">
        <span className="font-headline font-bold text-primary">Level {level}</span>
        <span className="font-label text-xs font-bold text-on-surface-variant">{currentXP} / {xpToNext} XP</span>
      </div>
      <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-1000" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default XPBar;
