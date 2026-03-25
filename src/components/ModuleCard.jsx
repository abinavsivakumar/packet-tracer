import React from 'react';
import { Link } from 'react-router-dom';

const ModuleCard = ({ module }) => {
  return (
    <Link 
      to={`/learn/${module.id}`}
      className="group bg-surface-container-low rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300`}>
          <span className="material-symbols-outlined text-2xl">{module.icon}</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant bg-surface-container rounded-full px-3 py-1">
          Mod {module.moduleNumber}
        </span>
      </div>
      
      <div className="flex-1 space-y-2">
        <h3 className="text-xl font-black font-headline text-on-surface group-hover:text-primary transition-colors">{module.title}</h3>
        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2">
          {module.shortDescription}
        </p>
      </div>
      
      <div className="mt-8 pt-4 border-t border-surface-container flex items-center justify-between">
        <div className="flex items-center gap-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-tight">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">timer</span>
            {module.time}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-primary">bolt</span>
            {module.xp} XP
          </span>
        </div>
        <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          arrow_forward_ios
        </span>
      </div>
    </Link>
  );
};

export default ModuleCard;
