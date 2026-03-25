import React, { useState, useEffect } from 'react';

const PropertiesPanel = ({ selectedNode, onUpdate, onDelete, onClose }) => {
  const [isEditingIp, setIsEditingIp] = useState(false);
  const [tempIp, setTempIp] = useState(selectedNode?.ip || '');

  // Reset internal state when node changes
  useEffect(() => {
    setIsEditingIp(false);
    setTempIp(selectedNode?.ip || '');
  }, [selectedNode?.id]);

  if (!selectedNode) return null;

  const handleSaveIp = () => {
    onUpdate({ ...selectedNode, ip: tempIp });
    setIsEditingIp(false);
  };

  return (
    <div className="w-80 bg-surface-container-lowest border-l border-surface-container p-6 flex flex-col gap-6 z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.02)] h-full overflow-y-auto">
      <div className="flex items-center justify-between">
        <h2 className="font-headline font-extrabold text-lg text-on-surface">Properties</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Device Name</label>
          <input 
            className="w-full bg-surface-container-low border-none rounded-xl text-sm font-bold text-on-surface focus:ring-2 focus:ring-primary/20 p-3 transition-shadow outline-none" 
            type="text" 
            value={selectedNode.label}
            onChange={(e) => onUpdate({ ...selectedNode, label: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">IP Configuration</label>
          <div className="p-4 bg-surface-container-low rounded-2xl space-y-4 border border-surface-container/30">
            <div className="flex flex-col gap-1.5 px-1">
              <span className="text-[10px] font-medium text-slate-600">IP Address</span>
              {isEditingIp ? (
                <div className="flex gap-2">
                    <input 
                        autoFocus
                        className="flex-1 bg-white border border-primary/20 rounded-lg px-2 py-1 text-xs font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary/10"
                        value={tempIp}
                        onChange={(e) => setTempIp(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveIp()}
                    />
                    <button onClick={handleSaveIp} className="bg-primary text-white p-1 rounded-lg hover:bg-primary-container transition-colors">
                        <span className="material-symbols-outlined text-sm">done</span>
                    </button>
                </div>
              ) : (
                <span className="text-xs font-bold text-on-surface bg-white/50 px-2 py-1 rounded-md border border-black/5 flex justify-between items-center group">
                    {selectedNode.ip || '192.168.1.1'}
                    <span onClick={() => setIsEditingIp(true)} className="material-symbols-outlined text-[14px] opacity-20 group-hover:opacity-100 cursor-pointer hover:text-primary transition-all">edit</span>
                </span>
              )}
            </div>
            <div className="flex justify-between items-center px-1">
              <span className="text-[10px] font-medium text-slate-600">Subnet Mask</span>
              <span className="text-xs font-bold text-on-surface bg-white/50 px-2 py-1 rounded-md border border-black/5">255.255.255.0</span>
            </div>
            {!isEditingIp && (
                <button 
                    onClick={() => setIsEditingIp(true)}
                    className="w-full py-2.5 bg-white text-primary text-[10px] font-black rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-98 transition-all border border-primary/5 uppercase tracking-wider"
                >
                    CONFIGURE IP
                </button>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-surface-container">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block px-1">Packet Analytics</label>
          <div className="h-32 rounded-2xl bg-surface-container-low relative overflow-hidden p-3 border border-surface-container/30">
            <div className="absolute inset-x-0 bottom-0 flex items-end gap-1 px-3 pb-3 h-full pointer-events-none opacity-40">
              {[20, 45, 30, 60, 40, 75, 50, 65].map((h, i) => (
                <div key={i} className="bg-primary w-full rounded-t-sm" style={{ height: `${h}%` }}></div>
              ))}
            </div>
            <div className="relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <p className="text-[10px] font-black text-primary uppercase tracking-tighter">Traffic: 1.2 KB/s</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <button 
          onClick={() => onDelete(selectedNode.id)}
          className="w-full py-4 bg-error/10 text-error rounded-2xl font-black text-xs hover:bg-error/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest border border-error/20 active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">delete</span>
          Remove Device
        </button>
      </div>
    </div>
  );
};

export default PropertiesPanel;
