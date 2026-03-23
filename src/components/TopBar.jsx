import React from 'react';
import { useAppContext } from '../context/AppContext';

const TopBar = ({ title }) => {
  const { user } = useAppContext();

  return (
    <header className="fixed top-0 right-0 left-64 h-16 z-40 bg-white/70 backdrop-blur-xl flex justify-between items-center px-8 w-full shadow-sm border-b border-surface-container">
      <div className="flex items-center gap-4">
        <span className="font-headline text-sm font-bold text-slate-600">{title}</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative group">
          <input
            className="bg-surface-container-low border-none rounded-full px-6 py-2 text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            placeholder="Search modules..."
            type="text"
          />
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" data-icon="search">search</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:opacity-80 transition-opacity scale-102 transition-transform duration-300">
            <span className="material-symbols-outlined text-blue-600" data-icon="bolt">bolt</span>
          </button>
          <button className="hover:opacity-80 transition-opacity scale-102 transition-transform duration-300">
            <span className="material-symbols-outlined text-blue-600" data-icon="military_tech">military_tech</span>
          </button>
          <div className="bg-primary px-4 py-1.5 rounded-full text-white font-headline text-xs font-bold shadow-md shadow-primary/20">
            Level {user.level}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
