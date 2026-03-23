import React, { useEffect, useState } from 'react';

const AnimatedPacketDemo = () => {
  const [position, setPosition] = useState(25);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => (prev >= 75 ? 25 : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 relative flex items-center justify-between px-12 h-64">
      {/* Path Visualizer (SVG Background) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <path 
          className="text-surface-container-highest" 
          d="M 120,50% L 50%,50% L calc(100% - 120px),50%" 
          fill="transparent" 
          stroke="currentColor" 
          strokeDasharray="8 8" 
          strokeWidth="4"
        ></path>
      </svg>
      
      {/* Laptop (Source) */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-2xl bg-surface-container-lowest flex items-center justify-center shadow-lg">
          <span className="material-symbols-outlined text-5xl text-slate-700">laptop</span>
        </div>
        <div className="bg-white px-4 py-1 rounded-full shadow-sm">
          <span className="text-xs font-bold font-label text-slate-500">192.168.1.5</span>
        </div>
        <span className="font-headline font-bold text-sm text-on-surface">Your Device</span>
      </div>

      {/* Router (The Hub) */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center shadow-2xl outline outline-8 outline-primary/10">
          <span className="material-symbols-outlined text-6xl text-white">router</span>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-1 rounded-full">
          <span className="text-xs font-black font-label">ROUTER-X1</span>
        </div>
        <span className="font-headline font-bold text-sm text-on-surface">Default Gateway</span>
      </div>

      {/* Server (Destination) */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-2xl bg-surface-container-lowest flex items-center justify-center shadow-lg">
          <span className="material-symbols-outlined text-5xl text-slate-700">dns</span>
        </div>
        <div className="bg-white px-4 py-1 rounded-full shadow-sm">
          <span className="text-xs font-bold font-label text-slate-500">8.8.8.8</span>
        </div>
        <span className="font-headline font-bold text-sm text-on-surface">Web Server</span>
      </div>

      {/* Animated Packet */}
      <div 
        className="absolute w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_#799dff] transition-all duration-50"
        style={{ left: `${position}%`, top: '50%', transform: 'translateY(-50%)' }}
      ></div>
    </div>
  );
};

export default AnimatedPacketDemo;
