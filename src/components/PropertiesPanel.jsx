import React from 'react';

const PropertiesPanel = ({ selectedNode, onUpdate, onDelete, onClose }) => {
  if (!selectedNode) return null;

  return (
    <div className="w-80 bg-surface-container-lowest border-l border-surface-container p-6 flex flex-col gap-6 z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.02)] h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="font-headline font-extrabold text-lg text-on-surface">Properties</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-on-surface">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Device Name</label>
          <input 
            className="w-full bg-surface-container-low border-none rounded-lg text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 p-2" 
            type="text" 
            value={selectedNode.label}
            onChange={(e) => onUpdate({ ...selectedNode, label: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">IP Configuration</label>
          <div className="p-3 bg-surface-container-low rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-medium text-slate-600">IP Address</span>
              <span className="text-xs font-bold text-on-surface">{selectedNode.ip || '192.168.1.1'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-medium text-slate-600">Subnet Mask</span>
              <span className="text-xs font-bold text-on-surface">255.255.255.0</span>
            </div>
            <button className="w-full py-2 bg-white text-primary text-[10px] font-bold rounded shadow-sm hover:shadow-md transition-all">CONFIGURE IP</button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">Packet Analytics</label>
          <div className="h-32 rounded-lg bg-surface-container-low relative overflow-hidden p-2">
            <div className="absolute inset-0 flex items-end gap-1 p-2">
              {[20, 45, 30, 60, 40, 75, 50, 65].map((h, i) => (
                <div key={i} className="bg-primary/40 w-full rounded-t-sm" style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-primary">Traffic: 1.2 KB/s</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <button 
          onClick={() => onDelete(selectedNode.id)}
          className="w-full py-3 bg-error/10 text-error rounded-xl font-bold text-sm hover:bg-error/20 transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">delete</span>
          Remove Device
        </button>
      </div>
    </div>
  );
};

export default PropertiesPanel;
