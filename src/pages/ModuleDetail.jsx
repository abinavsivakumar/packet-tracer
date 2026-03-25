import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ConceptCard from '../components/ConceptCard';
import AnimatedPacketDemo from '../components/AnimatedPacketDemo';
import { learningModules } from '../data/learningModules';
import { useAppContext } from '../context/AppContext';

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user, completeModule } = useAppContext();
  
  const moduleIndex = learningModules.findIndex(m => m.id === moduleId);
  const module = learningModules[moduleIndex];
  const completedModules = user?.completedModules || [];
  
  const isCompleted = completedModules.includes(moduleId);
  const isLocked = moduleIndex > 0 && !completedModules.includes(learningModules[moduleIndex - 1].id);

  useEffect(() => {
    if (isLocked) {
      navigate('/learn');
    }
  }, [isLocked, navigate]);

  if (!module || isLocked) {
    return (
      <Layout title="Limited Access">
        <div className="flex flex-col items-center justify-center h-full py-20 text-center">
            <h2 className="text-3xl font-black mb-4">Module Locked</h2>
            <p className="mb-8 text-on-surface-variant">You need to complete the previous modules to unlock this lesson.</p>
            <Link to="/learn" className="bg-primary text-white px-8 py-3 rounded-xl font-bold">
                Back to Roadmap
            </Link>
        </div>
      </Layout>
    );
  }

  const nextModule = learningModules[moduleIndex + 1];

  return (
    <Layout title={module.title}>
      <div className="mb-6 flex justify-between items-center">
        <Link to="/learn" className="text-sm font-bold text-primary flex items-center gap-2 hover:underline">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Roadmap
        </Link>
        {isCompleted && (
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-green-100">
            <span className="material-symbols-outlined text-sm">verified</span>
            Completed
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Instructional Content */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface-container-low rounded-2xl p-8 h-full flex flex-col border border-white/20 shadow-xl">
            <div className="mb-8">
              <span className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full text-xs font-bold font-label uppercase tracking-widest mb-4 inline-block">
                Module {module.moduleNumber}
              </span>
              <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight leading-tight">
                {module.title}
              </h2>
              <p className="mt-4 text-on-surface-variant leading-relaxed font-body">
                {module.fullDescription}
              </p>
            </div>
            
            <div className="space-y-6 flex-1">
              {/* Real World Analogy Section */}
              {module.analogy && (
                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-4xl text-primary">lightbulb</span>
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">psychology</span>
                    Real-World Analogy
                  </h4>
                  <p className="text-sm font-medium text-on-surface leading-loose italic">
                    "{module.analogy}"
                  </p>
                </div>
              )}

              {module.concepts.map((concept, i) => (
                <ConceptCard 
                  key={i}
                  title={concept.title} 
                  description={concept.description} 
                  icon={concept.icon} 
                  colorClass={concept.colorClass} 
                />
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              {!isCompleted ? (
                <button 
                  onClick={() => completeModule(moduleId)}
                  className="flex-1 py-5 rounded-xl bg-gradient-to-br from-green-600 to-green-700 text-white font-headline font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined">verified</span>
                  Complete Module
                </button>
              ) : (
                nextModule && (
                  <Link 
                    to={`/learn/${nextModule.id}`}
                    className="flex-1 py-5 rounded-xl bg-primary text-white font-headline font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 text-center"
                  >
                    Next Module
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Diagram */}
        <div className="lg:col-span-7">
          <div className="bg-surface-container-high rounded-2xl p-8 h-full relative overflow-hidden flex flex-col border border-white/20 shadow-xl">
            <div className="flex justify-between items-center mb-12">
              <h3 className="font-headline font-bold text-xl text-on-surface">Interactive Laboratory</h3>
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
                  <p className="text-xs font-bold font-label uppercase text-on-surface-variant">System Status</p>
                  <p className="text-sm font-bold text-on-surface">Initializing Protocol...</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Latency</p>
                  <p className="text-sm font-bold text-secondary">-- ms</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Throughput</p>
                  <p className="text-sm font-bold text-secondary">-- Mbps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 pb-12">
        <div className="bg-surface-container-low p-6 rounded-2xl border border-white/20 shadow-md flex flex-col justify-center items-center text-center">
          <p className="text-xs font-label font-bold text-slate-400 uppercase tracking-widest">Time to Master</p>
          <p className="text-2xl font-headline font-black mt-1 text-on-surface">{module.time}</p>
        </div>
        <div className="bg-surface-container-low p-6 rounded-2xl border border-white/20 shadow-md flex flex-col justify-center items-center text-center">
          <p className="text-xs font-label font-bold text-slate-400 uppercase tracking-widest">XP Reward</p>
          <p className="text-2xl font-headline font-black text-primary mt-1">+{module.xp} XP</p>
        </div>
        <div className="md:col-span-2 bg-secondary-container p-6 rounded-2xl shadow-md flex items-center justify-between px-10 border border-secondary/20">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center shadow-lg shadow-secondary/20">
              <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
            </div>
            <div>
              <p className="text-on-secondary-container font-headline font-bold text-lg">Next Mastery Level</p>
              <p className="text-on-secondary-container/70 text-sm">You are gaining expertise quickly!</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-secondary text-4xl">keyboard_double_arrow_right</span>
        </div>
      </div>
    </Layout>
  );
};

export default ModuleDetail;
