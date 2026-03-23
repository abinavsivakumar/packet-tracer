import React from 'react';

const CanvasNode = ({ node, isSelected, onClick, onMouseDown }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'router': return 'router';
      case 'server': return 'dns';
      case 'laptop': return 'laptop_mac';
      case 'mobile': return 'smartphone';
      default: return 'help';
    }
  };

  const getColorClass = (type) => {
    switch(type) {
      case 'router': return 'text-primary';
      case 'server': return 'text-secondary';
      case 'laptop': return 'text-tertiary';
      case 'mobile': return 'text-blue-600';
      default: return 'text-slate-500';
    }
  };

  return (
    <div 
      className={`absolute pointer-events-auto cursor-move transition-shadow ${isSelected ? 'z-20' : 'z-10'}`}
      style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(node.id);
      }}
      onMouseDown={(e) => onMouseDown(e, node.id)}
    >
      <div className="relative group">
        <div className={`w-20 h-20 bg-surface-container-lowest rounded-2xl flex items-center justify-center shadow-xl border-2 ${isSelected ? 'border-primary' : 'border-primary/20'}`}>
          <span className={`material-symbols-outlined text-4xl ${getColorClass(node.type)}`}>{getIcon(node.type)}</span>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-on-surface text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
          {node.label}
        </div>
        {/* Connection Point Indicators could go here */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-secondary rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </div>
  );
};

export default CanvasNode;
