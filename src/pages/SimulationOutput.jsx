import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Layout from '../components/Layout';
import SimMetricCard from '../components/SimMetricCard';
import { runSimulation } from '../engine/simulationEngine';
import { useNavigate } from 'react-router-dom';

const SimulationOutput = () => {
  const { simulation, setSimulationState } = useAppContext();
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
     // Run simulation logic if not already done or for a fresh start
     if (simulation.nodes.length > 0) {
         // Find source and target (default to first and last for demo if not specified)
         const source = simulation.nodes[0].id;
         const target = simulation.nodes[simulation.nodes.length - 1].id;
         const simResult = runSimulation(simulation.nodes, simulation.edges, source, target);
         setResult(simResult);
         setSimulationState(prev => ({ ...prev, result: simResult, isRunning: false }));
     }
  }, [simulation.nodes, simulation.edges]);

  if (!result) {
      return (
          <Layout title="Simulation Results">
              <div className="flex items-center justify-center min-h-[50vh]">
                  <p className="text-on-surface-variant font-bold">No simulation data available. Please build a network first.</p>
              </div>
          </Layout>
      );
  }

  return (
    <Layout title="Simulation Results">
      {/* Top Bento Row: Metrics */}
      <div className="grid grid-cols-12 gap-6 h-32">
        <div className="col-span-3">
          <SimMetricCard 
            label="Latency" 
            value={result.totalLatency} 
            unit="ms" 
            icon="speed" 
            colorClass="text-primary" 
            iconContainerClass="bg-primary-container/20" 
          />
        </div>
        <div className="col-span-3">
          <SimMetricCard 
            label="Packet Loss" 
            value={result.packetLoss} 
            unit="%" 
            icon="inventory_2" 
            colorClass="text-secondary" 
            iconContainerClass="bg-secondary-container/20" 
          />
        </div>
        <div className="col-span-3">
          <SimMetricCard 
            label="Efficiency" 
            value={result.efficiency} 
            unit="%" 
            icon="trending_up" 
            colorClass="text-tertiary" 
            iconContainerClass="bg-tertiary-container/20" 
          />
        </div>
        <div 
          onClick={() => navigate('/builder')}
          className="col-span-3 bg-gradient-to-br from-primary to-primary-container rounded-lg p-6 flex items-center justify-center cursor-pointer active:scale-95 transition-all duration-200"
        >
          <div className="flex items-center gap-3 text-white">
            <span className="material-symbols-outlined text-2xl">replay</span>
            <span className="font-headline font-extrabold text-lg uppercase tracking-tight">Modify Network</span>
          </div>
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div className="flex-1 bg-surface-container-low rounded-xl relative overflow-hidden flex flex-col min-h-[400px]">
        <div className="absolute top-6 left-6 z-10 flex gap-2">
          <div className="glass-card px-4 py-2 rounded-full flex items-center gap-3 border border-white/40">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">TCP/IP Protocol</span>
            </div>
            <div className="h-3 w-[1px] bg-outline-variant/30"></div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase">Hop Count: {result.path.length}</span>
          </div>
        </div>

        {/* The Simulation Stage */}
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0052d0 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Background Path */}
            {result.path.length > 1 && (
                <path 
                    d={`M ${simulation.nodes.find(n => n.id === result.path[0]).x} ${simulation.nodes.find(n => n.id === result.path[0]).y} ${result.path.slice(1).map(id => {
                        const n = simulation.nodes.find(node => node.id === id);
                        return `L ${n.x} ${n.y}`;
                    }).join(' ')}`}
                    fill="none"
                    stroke="#0052d0"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="opacity-20"
                />
            )}
            
            {/* Animated Packet */}
            {result.path.length > 1 && (
                <circle r="8" fill="#0052d0">
                   <animateMotion 
                    dur="4s" 
                    repeatCount="indefinite"
                    path={`M ${simulation.nodes.find(n => n.id === result.path[0]).x} ${simulation.nodes.find(n => n.id === result.path[0]).y} ${result.path.slice(1).map(id => {
                        const n = simulation.nodes.find(node => node.id === id);
                        return `L ${n.x} ${n.y}`;
                    }).join(' ')}`}
                   />
                </circle>
            )}
          </svg>

          {/* Nodes */}
          {simulation.nodes.map(node => (
            <div 
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
                style={{ left: node.x, top: node.y }}
            >
                <div className={`w-16 h-16 bg-surface-container-lowest rounded-2xl flex items-center justify-center shadow-lg border-2 ${result.path.includes(node.id) ? 'border-primary/40' : 'border-surface-container'}`}>
                    <span className={`material-symbols-outlined text-3xl ${node.type === 'router' ? 'text-primary' : node.type === 'server' ? 'text-secondary' : 'text-slate-700'}`}>
                        {node.type === 'router' ? 'router' : node.type === 'server' ? 'dns' : 'laptop'}
                    </span>
                    {node.failed && <div className="absolute -top-2 -right-2 bg-error text-white w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black">FAIL</div>}
                    {!node.failed && result.path.includes(node.id) && <div className="absolute -top-2 -right-2 bg-secondary text-white w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black">OK</div>}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{node.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Info Row */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 bg-surface-container-low rounded-lg p-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4 font-label">Simulation Log</h4>
          <div className="space-y-3 overflow-y-auto max-h-48">
            {result.logs.map((log, i) => (
              <div key={i} className="flex items-center justify-between text-sm py-1 border-b border-surface-container/30 last:border-0 text-on-surface">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-mono text-xs">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</span>
                  <span className="font-medium">{log}</span>
                </div>
                <span className="text-secondary font-bold text-xs uppercase tracking-tighter">Event</span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4 bg-surface-container-lowest rounded-lg p-6 border border-surface-container shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant font-label">Visual Keys</h4>
            <span className="material-symbols-outlined text-outline">help_outline</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <span className="text-xs font-medium text-on-surface-variant">High Bandwidth / Clear</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-tertiary-container"></div>
              <span className="text-xs font-medium text-on-surface-variant">Limited Bandwidth / Jitter</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <span className="text-xs font-medium text-on-surface-variant">Path Blocked / Down</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SimulationOutput;
