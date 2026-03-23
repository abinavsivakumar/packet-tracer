import React from 'react';
import Layout from '../components/Layout';
import ConceptCard from '../components/ConceptCard';
import AnimatedPacketDemo from '../components/AnimatedPacketDemo';

const Learn = () => {
  return (
    <Layout title="How Routers Work">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Instructional Content */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface-container-low rounded-lg p-8 h-full flex flex-col">
            <div className="mb-8">
              <span className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full text-xs font-bold font-label uppercase tracking-widest mb-4 inline-block">Module 04</span>
              <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight leading-tight">The Digital Traffic Cop</h2>
              <p className="mt-4 text-on-surface-variant leading-relaxed font-body">Routers don't just connect cables; they make intelligent decisions about where your data needs to go next.</p>
            </div>
            
            <div className="space-y-6 flex-1">
              <ConceptCard 
                title="IP Addressing" 
                description="Every packet has a destination IP. The router reads this 'address label' to sort incoming traffic." 
                icon="location_on" 
                colorClass="bg-primary/10 text-primary" 
              />
              <ConceptCard 
                title="Routing Tables" 
                description="A map of the network stored in memory. It tells the router the fastest path to any destination." 
                icon="alt_route" 
                colorClass="bg-secondary-container text-secondary" 
              />
              <ConceptCard 
                title="Next Hop" 
                description="If the destination isn't local, the router passes the packet to the next 'hop' in the chain." 
                icon="forward" 
                colorClass="bg-tertiary-container/20 text-tertiary" 
              />
            </div>

            <div className="mt-8">
              <button className="w-full py-5 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                <span className="material-symbols-outlined">play_circle</span>
                Try Simulation
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Diagram */}
        <div className="lg:col-span-7">
          <div className="bg-surface-container-high rounded-lg p-8 h-full relative overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <h3 className="font-headline font-bold text-xl text-on-surface">Live Packet Flow</h3>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <div className="w-3 h-3 rounded-full bg-secondary/30"></div>
                <div className="w-3 h-3 rounded-full bg-secondary/10"></div>
              </div>
            </div>

            <AnimatedPacketDemo />

            {/* Action/Info Bar */}
            <div className="mt-12 bg-surface-container-lowest/50 backdrop-blur rounded-xl p-4 flex items-center justify-between border-2 border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-tertiary-container">info</span>
                </div>
                <div>
                  <p className="text-xs font-bold font-label uppercase text-on-surface-variant">Packet Status</p>
                  <p className="text-sm font-bold text-on-surface">Encapsulating Payload...</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Latency</p>
                  <p className="text-sm font-bold text-secondary">12ms</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Loss</p>
                  <p className="text-sm font-bold text-secondary">0%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Quick Nav/Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-center items-center text-center">
          <p className="text-xs font-label font-bold text-slate-400 uppercase tracking-widest">Time to Master</p>
          <p className="text-2xl font-headline font-black mt-1 text-on-surface">15 min</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col justify-center items-center text-center">
          <p className="text-xs font-label font-bold text-slate-400 uppercase tracking-widest">XP Reward</p>
          <p className="text-2xl font-headline font-black text-primary mt-1">+450 XP</p>
        </div>
        <div className="md:col-span-2 bg-secondary-container p-6 rounded-lg flex items-center justify-between px-10">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
            </div>
            <div>
              <p className="text-on-secondary-container font-headline font-bold text-lg">Knowledge Streak</p>
              <p className="text-on-secondary-container/70 text-sm">3 modules completed today!</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-secondary text-4xl">chevron_right</span>
        </div>
      </div>
    </Layout>
  );
};

export default Learn;
