import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Layout from '../components/Layout';
import DevicePaletteItem from '../components/DevicePaletteItem';
import CanvasNode from '../components/CanvasNode';
import PropertiesPanel from '../components/PropertiesPanel';
import { useNavigate } from 'react-router-dom';

const devices = [
  { type: 'laptop', icon: 'laptop_mac', label: 'Laptop', colorClass: 'bg-tertiary-container/20 text-tertiary', unlockLevel: 1 },
  { type: 'router', icon: 'router', label: 'Router', colorClass: 'bg-primary-container/20 text-primary', unlockLevel: 3 },
  { type: 'server', icon: 'dns', label: 'Server', colorClass: 'bg-secondary-container/20 text-secondary', unlockLevel: 5 },
];

const Builder = () => {
  const { user, simulation, setSimulationState } = useAppContext();
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState(null);
  const [connectionStartId, setConnectionStartId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('deviceType');
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newNode = {
      id: `node_${Date.now()}`,
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)}_${simulation.nodes.length + 1}`,
      x,
      y,
      ip: `192.168.1.${simulation.nodes.length + 1}`,
      failed: false
    };

    setSimulationState(prev => ({
      ...prev,
      nodes: [...prev.nodes, newNode]
    }));
  };

  const handleNodeMouseDown = (e, nodeId) => {
    e.stopPropagation();
    setIsDragging(true);
    setDraggedNodeId(nodeId);
    setSelectedNodeId(nodeId);
  };

  const handlePortMouseDown = (e, nodeId) => {
    e.stopPropagation();
    setConnectionStartId(nodeId);
    const rect = canvasRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleCanvasMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDragging && draggedNodeId) {
      setSimulationState(prev => ({
        ...prev,
        nodes: prev.nodes.map(n => n.id === draggedNodeId ? { ...n, x, y } : n)
      }));
    }

    if (connectionStartId) {
      setMousePos({ x, y });
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
    setDraggedNodeId(null);
    setConnectionStartId(null);
  };

  const handleNodeClick = (nodeId) => {
    setSelectedNodeId(nodeId);
  };

  const handleNodeMouseUp = (e, nodeId) => {
    if (connectionStartId && connectionStartId !== nodeId) {
        // Create edge
        const newEdge = {
            id: `edge_${Date.now()}`,
            from: connectionStartId,
            to: nodeId,
            bandwidth: 100,
            latency: 10
        };
        setSimulationState(prev => ({
            ...prev,
            edges: [...prev.edges, newEdge]
        }));
    }
    setConnectionStartId(null);
  };

  const handleUpdateNode = (updatedNode) => {
    setSimulationState(prev => ({
      ...prev,
      nodes: prev.nodes.map(n => n.id === updatedNode.id ? updatedNode : n)
    }));
  };

  const handleDeleteNode = (nodeId) => {
    setSimulationState(prev => ({
      ...prev,
      nodes: prev.nodes.filter(n => n.id !== nodeId),
      edges: prev.edges.filter(e => e.from !== nodeId && e.to !== nodeId)
    }));
    setSelectedNodeId(null);
  };

  const runSim = () => {
      navigate('/output');
  };

  const selectedNode = simulation.nodes.find(n => n.id === selectedNodeId);
  const startNode = simulation.nodes.find(n => n.id === connectionStartId);

  return (
    <Layout title="Simulation Builder" fullWidth={true}>
      <div className="flex-1 flex relative overflow-hidden">
        {/* Component Palette */}
        <div className="w-72 bg-surface-container-low p-6 flex flex-col gap-6 overflow-y-auto border-r border-surface-container">
          <h3 className="font-headline font-bold text-sm text-on-surface mb-4 uppercase tracking-widest opacity-50">Assets</h3>
          <div className="grid grid-cols-2 gap-3">
            {devices.map((device) => (
              <DevicePaletteItem 
                key={device.type}
                type={device.type} 
                icon={device.icon} 
                label={device.label} 
                colorClass={device.colorClass} 
                isLocked={user ? user.level < device.unlockLevel : true}
                onDragStart={(e, t) => e.dataTransfer.setData('deviceType', t)} 
              />
            ))}
          </div>
          
          <div className="mt-auto bg-surface-container-low/50 p-5 rounded-2xl border border-surface-container/50 shadow-inner">
            <h3 className="font-headline font-bold text-[10px] text-primary mb-3 uppercase tracking-widest opacity-80">Quick Start Guide</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-black shrink-0">1</span>
                <p className="text-[11px] text-slate-500 leading-tight">Drag devices from the <b>Assets</b> palette onto the canvas grid.</p>
              </div>
              <div className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-[10px] font-black shrink-0">2</span>
                <p className="text-[11px] text-slate-500 leading-tight">Hover a device and drag the <b>(+)</b> handle to connect it to others.</p>
              </div>
              <div className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center text-[10px] font-black shrink-0">3</span>
                <p className="text-[11px] text-slate-500 leading-tight">Click any device to configure its <b>IP</b> and view real-time traffic.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div 
          ref={canvasRef}
          className="flex-1 bg-surface canvas-grid relative overflow-hidden"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onClick={() => setSelectedNodeId(null)}
        >
          {/* Floating Controls */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 glass-card px-6 py-4 rounded-xl flex items-center gap-6 z-30 shadow-2xl border border-white/40">
            <div className="flex items-center gap-2 mr-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-sm">edit</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase leading-none">Scenario</p>
                <p className="text-xs font-bold text-on-surface">Custom Network</p>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-slate-300/50"></div>
            <div className="flex items-center gap-3">
              <button 
                  onClick={() => setSimulationState({ nodes: [], edges: [], result: null, isRunning: false })}
                  className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors"
              >
                <span className="material-symbols-outlined">refresh</span>
              </button>
              <button 
                  onClick={runSim}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined">play_arrow</span>
                <span className="font-label">Run Simulation</span>
              </button>
            </div>
          </div>

          {/* SVG Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {simulation.edges.map(edge => {
              const from = simulation.nodes.find(n => n.id === edge.from);
              const to = simulation.nodes.find(n => n.id === edge.to);
              if (!from || !to) return null;
              return (
                <line 
                  key={edge.id}
                  x1={from.x} y1={from.y} 
                  x2={to.x} y2={to.y} 
                  stroke="#0052d0" 
                  strokeDasharray={edge.failed ? "4" : "0"} 
                  strokeWidth="3" 
                  className={`opacity-30 ${edge.failed ? 'stroke-red-500' : 'stroke-primary'}`}
                />
              );
            })}
            
            {/* Live Ghost Line */}
            {connectionStartId && startNode && (
                <line 
                  x1={startNode.x} y1={startNode.y}
                  x2={mousePos.x} y2={mousePos.y}
                  stroke="#0052d0" 
                  strokeDasharray="8 4" 
                  strokeWidth="2" 
                  className="opacity-50 animate-pulse"
                />
            )}
          </svg>

          {/* Placed Nodes */}
          {simulation.nodes.map(node => (
            <CanvasNode 
              key={node.id} 
              node={node} 
              isSelected={selectedNodeId === node.id}
              onClick={handleNodeClick}
              onMouseDown={handleNodeMouseDown}
              onPortMouseDown={handlePortMouseDown}
              onMouseUp={handleNodeMouseUp}
            />
          ))}
        </div>

        {/* Properties Panel */}
        {selectedNode && (
            <PropertiesPanel 
              selectedNode={selectedNode}
              onUpdate={handleUpdateNode}
              onDelete={handleDeleteNode}
              onClose={() => setSelectedNodeId(null)}
            />
        )}
      </div>
    </Layout>
  );
};

export default Builder;
