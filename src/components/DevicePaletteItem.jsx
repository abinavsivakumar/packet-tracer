import React from 'react';

const DevicePaletteItem = ({ type, icon, label, colorClass, onDragStart }) => {
  return (
    <div 
      className="group bg-surface-container-lowest p-4 rounded-lg flex flex-col items-center justify-center gap-2 cursor-grab active:scale-95 transition-all shadow-sm"
      draggable
      onDragStart={(e) => onDragStart(e, type)}
    >
      <div className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center`}>
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <span className="text-xs font-bold font-label text-on-surface">{label}</span>
    </div>
  );
};

export default DevicePaletteItem;
