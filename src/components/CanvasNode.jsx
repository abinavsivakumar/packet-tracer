import React from 'react';

const CanvasNode = ({ node, isSelected, onClick, onMouseDown, onPortMouseDown, onMouseUp }) => {
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
      onMouseUp={(e) => onMouseUp && onMouseUp(e, node.id)}
    >
      <div className="relative group">
        <div className={`w-20 h-20 bg-surface-container-lowest rounded-2xl flex items-center justify-center shadow-xl border-2 ${isSelected ? 'border-primary' : 'border-primary/20'}`}>
          <span className={`material-symbols-outlined text-4xl ${getColorClass(node.type)}`}>{getIcon(node.type)}</span>
        </div>
        
        {/* Connection Port (Bottom Handle) */}
        <div 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-secondary flex items-center justify-center cursor-crosshair opacity-0 group-hover:opacity-100 hover:scale-125 hover:bg-secondary hover:text-white transition-all z-30 shadow-lg"
          onMouseDown={(e) => {
            e.stopPropagation();
            onPortMouseDown(e, node.id);
          }}
          title="Drag to connect"
        >
          <span className="material-symbols-outlined text-[14px]">add</span>
        </div>

        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-on-surface text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
          {node.label}
        </div>
      </div>
    </div>
  );
};

export default CanvasNode;
