import React from 'react';

const BadgeCard = ({ name, icon, colorClass, isLocked }) => {
  return (
    <div className={`flex flex-col items-center gap-3 text-center ${isLocked ? 'opacity-40 filter grayscale' : ''}`}>
      <div className={`w-24 h-24 rounded-full ${colorClass} flex items-center justify-center relative shadow-inner overflow-hidden`}>
        <span className="material-symbols-outlined text-4xl text-on-surface-variant">{icon}</span>
        {!isLocked && <div className="absolute inset-0 bg-white/10"></div>}
      </div>
      <span className={`text-xs font-bold font-headline ${isLocked ? 'text-on-surface-variant' : 'text-on-surface'}`}>{name}</span>
    </div>
  );
};

export default BadgeCard;
