import React, { useEffect, useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import Layout from '../components/Layout';
import SimMetricCard from '../components/SimMetricCard';
import { runSimulation } from '../engine/simulationEngine';
import { useNavigate } from 'react-router-dom';

const SimulationOutput = () => {
  const { user, simulation, setSimulationState, activeChallenge, completeChallenge } = useAppContext();
  const [result, setResult] = useState(null);
  const [isChallengeSuccess, setIsChallengeSuccess] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // Calculate Bounds for ViewBox
  const bounds = useMemo(() => {
    if (simulation.nodes.length === 0) return { minX: 0, minY: 0, width: 800, height: 600 };
    
    const xs = simulation.nodes.map(n => n.x);
    const ys = simulation.nodes.map(n => n.y);
    
    const minX = Math.min(...xs) - 150;
    const maxX = Math.max(...xs) + 150;
    const minY = Math.min(...ys) - 150;
    const maxY = Math.max(...ys) + 150;
    
    return {
      minX,
      minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }, [simulation.nodes]);

  useEffect(() => {
     if (simulation.nodes.length > 0) {
         const laptops = simulation.nodes.filter(n => n.type === 'laptop');
         const servers = simulation.nodes.filter(n => n.type === 'server');
         
         const sourceId = laptops.length > 0 ? laptops[0].id : simulation.nodes[0].id;
         const targetId = activeChallenge?.targetNodeId || (servers.length > 0 ? servers[servers.length - 1].id : simulation.nodes[simulation.nodes.length - 1].id);
         
         const simResult = runSimulation(simulation.nodes, simulation.edges, sourceId, targetId);
         setResult(simResult);
         setSimulationState(prev => ({ ...prev, result: simResult, isRunning: false }));

         if (activeChallenge && simResult.success && simResult.path.includes(activeChallenge.targetNodeId)) {
             setIsChallengeSuccess(true);
             setTimeout(() => {
                 completeChallenge(activeChallenge.id);
             }, 3000);
         }
     }
  }, [simulation.nodes, simulation.edges, activeChallenge]);

  if (!result) {
      return (
          <Layout title="Simulation Results">
              <div className="flex items-center justify-center min-h-[50vh]">
                  <p className="text-on-surface-variant font-bold">No simulation data available. Please build a network first.</p>
              </div>
          </Layout>
      );
  }

  const getSimVisuals = () => {
    if (!result.success) return { color: '#dc2626', speed: '2s' };
    if (result.totalLatency > 100 || result.packetLoss > 20) return { color: '#f59e0b', speed: '6s' };
    return { color: '#0052d0', speed: '3s' };
  };

  const { color, speed } = getSimVisuals();
  const viewBoxStr = `${bounds.minX + offset.x} ${bounds.minY + offset.y} ${bounds.width / zoom} ${bounds.height / zoom}`;

  // Helper to check if an edge is part of the active path
  const isEdgeInPath = (edge) => {
    if (!result.path || result.path.length < 2) return false;
    for (let i = 0; i < result.path.length - 1; i++) {
        const u = result.path[i];
        const v = result.path[i+1];
        if ((edge.from === u && edge.to === v) || (edge.from === v && edge.to === u)) return true;
    }
    return false;
  };

  return (
    <Layout title="Simulation Results">
      {/* Metrics Row */}
      <div className="grid grid-cols-12 gap-6 min-h-32">
        <div className="col-span-3">
          <SimMetricCard label="Latency" value={result.totalLatency} unit="ms" icon="speed" colorClass={result.totalLatency > 100 ? 'text-amber-600' : 'text-primary'} iconContainerClass={result.totalLatency > 100 ? 'bg-amber-100' : 'bg-primary-container/20'} />
        </div>
        <div className="col-span-3">
          <SimMetricCard label="Packet Loss" value={result.packetLoss} unit="%" icon="inventory_2" colorClass={result.packetLoss > 0 ? 'text-error' : 'text-secondary'} iconContainerClass={result.packetLoss > 0 ? 'bg-error/10' : 'bg-secondary-container/20'} />
        </div>
        <div className="col-span-3">
          <SimMetricCard label="Efficiency" value={result.efficiency} unit="%" icon="trending_up" colorClass={result.efficiency < 80 ? 'text-amber-600' : 'text-tertiary'} iconContainerClass={result.efficiency < 80 ? 'bg-amber-100' : 'bg-tertiary-container/20'} />
        </div>
        <div onClick={() => navigate('/builder')} className="col-span-3 bg-gradient-to-br from-primary to-primary-container rounded-lg p-6 flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-lg shadow-primary/20">
          <div className="flex items-center gap-3 text-white">
            <span className="material-symbols-outlined text-2xl">replay</span>
            <span className="font-headline font-extrabold text-lg uppercase tracking-tight">Modify Network</span>
          </div>
        </div>
      </div>

      {/* Main Visualizer */}
      <div className="flex-1 bg-surface-container-low rounded-xl relative overflow-hidden flex flex-col min-h-[500px] border border-surface-container">
        <div className="absolute top-6 left-6 z-10 flex gap-2">
          <div className="glass-card px-4 py-2 rounded-full flex items-center gap-3 border border-white/40 shadow-xl">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }}></div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                {result.success ? (result.totalLatency > 100 ? 'Congested Pathway' : 'Optimal Path') : 'Network Failure'}
              </span>
            </div>
            <div className="h-3 w-[1px] bg-outline-variant/30"></div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">Hop Count: {result.path.length}</span>
          </div>
        </div>

        <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
            <div className="glass-card p-2 rounded-xl border border-white/40 shadow-xl flex flex-col gap-2">
                <button onClick={() => setZoom(z => Math.min(z + 0.2, 3))} className="w-10 h-10 rounded-lg bg-white/50 hover:bg-white text-primary flex items-center justify-center transition-all"><span className="material-symbols-outlined">zoom_in</span></button>
                <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="w-10 h-10 rounded-lg bg-white/50 hover:bg-white text-primary flex items-center justify-center transition-all"><span className="material-symbols-outlined">zoom_out</span></button>
                <button onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }} className="w-10 h-10 rounded-lg bg-white/50 hover:bg-white text-primary flex items-center justify-center transition-all"><span className="material-symbols-outlined">center_focus_strong</span></button>
            </div>
        </div>

        <div className="flex-1 w-full relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0052d0 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          
          <svg viewBox={viewBoxStr} className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Render ALL Edges */}
            {simulation.edges.map(edge => {
                const fromNode = simulation.nodes.find(n => n.id === edge.from);
                const toNode = simulation.nodes.find(n => n.id === edge.to);
                if (!fromNode || !toNode) return null;

                const isActive = isEdgeInPath(edge);
                const isFailed = (fromNode.failed || toNode.failed);

                return (
                    <line 
                        key={edge.id}
                        x1={fromNode.x} y1={fromNode.y}
                        x2={toNode.x} y2={toNode.y}
                        stroke={isActive ? color : (isFailed ? '#dc2626' : '#94a3b8')}
                        strokeWidth={isActive ? "4" : "2"}
                        strokeDasharray={isActive ? "none" : "8 4"}
                        strokeLinecap="round"
                        className={`transition-all duration-1000 ${isActive ? 'opacity-40' : 'opacity-20'}`}
                    />
                );
            })}
            
            {/* Animated Packet */}
            {result.success && result.path.length > 1 && (
                <circle r="8" fill={color} className="shadow-lg">
                   <animateMotion 
                    dur={speed} 
                    repeatCount="indefinite"
                    path={`M ${simulation.nodes.find(n => n.id === result.path[0]).x} ${simulation.nodes.find(n => n.id === result.path[0]).y} ${result.path.slice(1).map(id => {
                        const n = simulation.nodes.find(node => node.id === id);
                        return `L ${n.x} ${n.y}`;
                    }).join(' ')}`}
                   />
                </circle>
            )}

            {/* Render ALL Nodes */}
            {simulation.nodes.map(node => (
                <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                    <rect 
                        x="-32" y="-32" width="64" height="64" rx="16"
                        fill="white"
                        className={`stroke-2 ${node.failed ? 'stroke-error' : result.path.includes(node.id) ? 'stroke-primary shadow-lg' : 'stroke-surface-container opacity-40'}`}
                    />
                    <text 
                        x="0" y="4" textAnchor="middle" 
                        className={`material-symbols-outlined text-[32px] pointer-events-none ${node.failed ? 'fill-error' : result.path.includes(node.id) ? 'fill-primary' : 'fill-slate-300'}`}
                        style={{ fontFamily: 'Material Symbols Outlined' }}
                    >
                        {node.type === 'router' ? 'router' : node.type === 'server' ? 'dns' : 'laptop'}
                    </text>
                    <text x="0" y="48" textAnchor="middle" className={`text-[10px] font-black uppercase tracking-widest ${result.path.includes(node.id) ? 'fill-on-surface' : 'fill-on-surface-variant opacity-40'}`}>
                        {node.label}
                    </text>
                </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Logs Row */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 bg-surface-container-low rounded-lg p-6 border border-surface-container/50">
          <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4 font-label">Simulation Log</h4>
          <div className="space-y-3 overflow-y-auto max-h-48 custom-scrollbar">
            {result.logs.map((log, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-surface-container/30 last:border-0 text-on-surface">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-mono text-[10px]">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</span>
                  <span className="font-bold text-xs">{log}</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${log.includes('SUCCESS') ? 'bg-secondary/10 text-secondary' : log.includes('FAILURE') || log.includes('⚠️') ? 'bg-error/10 text-error' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                    {log.includes('SUCCESS') ? 'Success' : log.includes('FAILURE') || log.includes('⚠️') ? 'Error' : 'Info'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimulationOutput;
