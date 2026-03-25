import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ModuleCard from '../components/ModuleCard';
import { learningModules } from '../data/learningModules';
import { useAppContext } from '../context/AppContext';

const Learn = () => {
  const { user } = useAppContext();
  const completedModules = user?.completedModules || [];

  return (
    <Layout title="Learning Roadmap">
      <div className="max-w-4xl mx-auto pb-20 relative">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black font-headline text-on-surface tracking-tight">Path to Mastery</h2>
          <p className="text-on-surface-variant max-w-lg mx-auto font-medium">Follow the curated roadmap to become a certified Network Architect.</p>
        </div>

        {/* The Roadmap Path */}
        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-surface-container rounded-full hidden md:block"></div>
          
          <div className="space-y-12">
            {learningModules.map((module, index) => {
              const isCompleted = completedModules.includes(module.id);
              const isLocked = index > 0 && !completedModules.includes(learningModules[index - 1].id);
              
              return (
                <div key={module.id} className={`relative flex flex-col md:flex-row gap-8 items-start group ${isLocked ? 'pointer-events-none opacity-60 grayscale-[0.5]' : ''}`}>
                  {/* Node Indicator */}
                  <div className={`hidden md:flex absolute left-8 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 items-center justify-center z-10 transition-colors ${
                    isCompleted ? 'border-primary bg-primary' : (isLocked ? 'border-surface-container' : 'border-surface-container group-hover:border-primary')
                  }`}>
                    {isCompleted ? (
                      <span className="material-symbols-outlined text-white text-sm">check</span>
                    ) : (
                      <div className={`w-3 h-3 rounded-full ${isLocked ? 'bg-surface-container' : 'bg-surface-container group-hover:bg-primary'}`}></div>
                    )}
                  </div>

                  {/* Module Number (Large) */}
                  <div className="text-6xl font-black text-surface-container-highest opacity-10 font-headline absolute -left-4 -top-6 pointer-events-none group-hover:opacity-20 transition-opacity">
                    {module.moduleNumber}
                  </div>

                  {/* Module Card Content */}
                  <div className={`md:ml-20 flex-1 w-full rounded-2xl p-8 border border-white/20 shadow-lg transition-all duration-300 ${
                    isLocked ? 'bg-surface-container text-on-surface/50' : 'bg-surface-container-low hover:shadow-2xl hover:-translate-y-1'
                  }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isCompleted ? 'bg-primary/20 text-primary' : (isLocked ? 'bg-slate-200 text-slate-400' : 'bg-primary/10 text-primary')
                          }`}>
                            <span className="material-symbols-outlined">{isLocked ? 'lock' : module.icon}</span>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant bg-surface-container rounded-full px-3 py-1">
                            {isLocked ? 'Locked' : `Module ${module.moduleNumber}`}
                          </span>
                        </div>
                        <h3 className="text-2xl font-black font-headline text-on-surface">{module.title}</h3>
                        <p className="text-on-surface-variant leading-relaxed text-sm max-w-xl">
                          {isLocked ? 'Complete the previous module to unlock this lesson.' : module.shortDescription}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4 lg:text-right">
                        {!isLocked && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant uppercase justify-center lg:justify-end">
                               <span className="material-symbols-outlined text-[10px]">timer</span>
                               {module.time}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-primary uppercase justify-center lg:justify-end">
                               <span className="material-symbols-outlined text-[10px]">bolt</span>
                               {module.xp} XP
                            </div>
                          </div>
                        )}
                        
                        {isLocked ? (
                          <div className="bg-slate-200 text-slate-500 px-8 py-3 rounded-xl font-bold text-sm cursor-not-allowed flex items-center gap-2">
                             <span className="material-symbols-outlined text-sm">lock</span>
                             Locked
                          </div>
                        ) : (
                          <Link 
                            to={`/learn/${module.id}`}
                            className={`${
                              isCompleted ? 'bg-surface-container text-on-surface border border-surface-container-highest' : 'bg-primary text-on-primary shadow-xl shadow-primary/20'
                            } px-8 py-3 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all whitespace-nowrap`}
                          >
                            {isCompleted ? 'Review Lesson' : (index === 0 ? 'Start Learning' : 'Begin Module')}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Vertical Line for next step (between cards on mobile) */}
                  {index < learningModules.length - 1 && (
                    <div className="md:hidden self-center py-4 text-surface-container">
                      <span className="material-symbols-outlined">expand_more</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-12 bg-surface-container-low rounded-3xl p-10 border border-white/20">
          <div className="text-center">
             <p className="text-3xl font-black font-headline text-on-surface">{completedModules.length} / {learningModules.length}</p>
             <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Modules Completed</p>
          </div>
          <div className="h-px md:h-12 w-24 md:w-px bg-surface-container"></div>
          <div className="text-center">
             <p className="text-3xl font-black font-headline text-primary">3,250</p>
             <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Total Knowledge XP</p>
          </div>
          <div className="h-px md:h-12 w-24 md:w-px bg-surface-container"></div>
          <Link to="/challenges" className="flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-secondary/20 hover:scale-105 active:scale-95 transition-all">
            <span className="material-symbols-outlined">auto_fix_high</span>
            Test Your Knowledge
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Learn;
