import React from 'react';

const DevicePaletteItem = ({ type, icon, label, colorClass, onDragStart, isLocked }) => {
  return (
    <div 
      className={`group bg-surface-container-lowest p-5 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all shadow-sm relative border border-transparent hover:border-primary/20 ${isLocked ? 'opacity-40 grayscale cursor-not-allowed' : 'cursor-grab active:scale-90 hover:shadow-xl hover:-translate-y-1'}`}
      draggable={!isLocked}
      onDragStart={(e) => !isLocked && onDragStart(e, type)}
    >
      {isLocked && (
        <div className="absolute top-3 right-3">
          <span className="material-symbols-outlined text-[14px] text-outline">lock</span>
        </div>
      )}
      <div className={`w-14 h-14 rounded-full ${colorClass} flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
        {isLocked ? 'Locked' : label}
      </span>
    </div>
  );
};

export default DevicePaletteItem;
