import React from 'react';

const ConceptCard = ({ index, title, description, icon, colorClass }) => {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-lg flex items-start gap-5 shadow-sm">
      <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0`}>
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
      <div>
        <h4 className="font-headline font-bold text-lg text-on-surface">{title}</h4>
        <p className="text-sm text-on-surface-variant font-body mt-1">{description}</p>
      </div>
    </div>
  );
};

export default ConceptCard;
