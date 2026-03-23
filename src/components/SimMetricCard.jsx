import React from 'react';

const SimMetricCard = ({ label, value, unit, icon, colorClass, iconContainerClass }) => {
  return (
    <div className="bg-surface-container-lowest rounded-lg p-6 flex items-center justify-between group hover:scale-[1.02] transition-transform duration-300 shadow-sm">
      <div>
        <p className="text-xs font-bold text-on-surface-variant font-label uppercase tracking-widest mb-1">{label}</p>
        <h3 className={`text-3xl font-black ${colorClass} font-headline`}>{value}<span className="text-sm font-medium ml-1">{unit}</span></h3>
      </div>
      <div className={`w-12 h-12 rounded-xl ${iconContainerClass} flex items-center justify-center ${colorClass}`}>
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
    </div>
  );
};

export default SimMetricCard;
