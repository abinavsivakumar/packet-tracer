import React from 'react';

const StatCard = ({ label, value, icon, colorClass }) => {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-lg ambient-shadow flex items-center gap-6 group hover:scale-[1.02] transition-transform">
      <div className={`w-14 h-14 rounded-lg ${colorClass} flex items-center justify-center`}>
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <div>
        <p className="text-on-surface-variant text-xs font-bold font-headline">{label}</p>
        <p className="text-2xl font-black font-headline text-on-surface">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
