import React from 'react';

const ChallengeCard = ({ challenge, isCompleted, isCurrent, onStart }) => {
  const { level, title, description, difficulty, xpReward, rewardText, icon, colorClass, locked } = challenge;

  if (locked) {
    return (
      <div className="group relative bg-surface-container-low p-6 rounded-lg opacity-80 grayscale overflow-hidden shadow-sm">
        <div className="absolute inset-0 bg-surface-container-highest/20 backdrop-blur-[2px] z-10 flex items-center justify-center">
          <div className="bg-surface-container-lowest p-4 rounded-full shadow-lg">
            <span className="material-symbols-outlined text-4xl text-outline">lock</span>
          </div>
        </div>
        <div className="mb-6 aspect-video bg-surface-container-highest rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-6xl text-outline-variant">{icon}</span>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="font-label text-[10px] font-black uppercase text-outline tracking-widest">LEVEL {level}</span>
              <h3 className="font-headline text-xl font-bold mt-1 text-on-surface">{title}</h3>
            </div>
            <span className="text-[10px] font-black px-2 py-1 bg-surface-container-highest text-outline rounded">{difficulty}</span>
          </div>
          <div className="w-full py-3 border-2 border-dashed border-outline-variant text-outline font-bold rounded-lg text-center">
            Locked
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative bg-surface-container-lowest p-6 rounded-lg hover:shadow-xl transition-all duration-300 ${isCurrent ? 'ring-4 ring-primary-container/20 translate-y-[-4px]' : 'hover:shadow-sm'}`}>
      {isCompleted && (
        <div className="absolute -top-3 -right-3 w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white z-10 shadow-lg">
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
        </div>
      )}
      {isCurrent && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full uppercase tracking-tighter">Current</div>
      )}
      
      <div className={`mb-6 aspect-video ${colorClass} rounded-lg flex items-center justify-center overflow-hidden`}>
        <span className={`material-symbols-outlined text-6xl ${isCurrent ? 'text-white' : 'opacity-40'} group-hover:scale-110 transition-transform duration-500`}>{icon}</span>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <span className={`font-label text-[10px] font-black uppercase tracking-widest ${isCurrent ? 'text-primary' : 'text-secondary'}`}>LEVEL {level}</span>
            <h3 className="font-headline text-xl font-bold mt-1 text-on-surface">{title}</h3>
          </div>
          <span className={`text-[10px] font-black px-2 py-1 rounded ${isCurrent ? 'bg-primary-container/20 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>{difficulty}</span>
        </div>

        <div className={`flex items-center gap-4 p-3 rounded-lg border ${isCurrent ? 'bg-primary-container/10 border-primary-container/20' : 'bg-surface-container-low'}`}>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
            <span className="text-xs font-bold font-label text-on-surface">{xpReward} XP</span>
          </div>
          <div className="w-[1px] h-4 bg-outline-variant/30"></div>
          <div className="flex items-center gap-1.5">
            <span className={`material-symbols-outlined text-sm ${isCurrent ? 'text-primary' : 'text-primary/60'}`} style={{ fontVariationSettings: "'FILL' 1" }}>{isCurrent ? 'workspace_premium' : 'token'}</span>
            <span className="text-xs font-bold font-label text-on-surface">{rewardText}</span>
          </div>
        </div>

        <button 
          onClick={() => onStart(challenge)}
          className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg ${isCurrent ? 'bg-gradient-to-r from-primary to-primary-container text-white shadow-primary/30 hover:scale-[1.02] active:scale-95' : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'}`}
        >
          {isCompleted ? 'Replay Level' : 'Start Challenge'}
        </button>
      </div>
    </div>
  );
};

export default ChallengeCard;
