import React from 'react';
import { useAppContext } from '../context/AppContext';

const Signup = ({ onToggle }) => {
  const { login } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-secondary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white shadow-primary/5 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-secondary/20">
            <span className="material-symbols-outlined text-white text-5xl">person_add</span>
          </div>
          
          <h1 className="text-3xl font-black font-headline text-on-surface mb-2 tracking-tight">Join the Academy</h1>
          <p className="text-on-surface-variant font-medium mb-8">Start your journey as a Network Architect today.</p>

          <div className="w-full space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Full Name</label>
              <input type="text" placeholder="Sam Miller" className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/20 transition-all outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Email Address</label>
              <input type="email" placeholder="sam@academy.com" className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/20 transition-all outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Secret Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-secondary/20 transition-all outline-none" />
            </div>

            <button 
              onClick={login}
              className="w-full bg-secondary text-white py-4 rounded-2xl font-bold font-headline text-lg shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group mt-4"
            >
              Create My Account
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">how_to_reg</span>
            </button>
          </div>

          <p className="mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Already a member? <span onClick={onToggle} className="text-secondary cursor-pointer hover:underline">Sign In Instead</span>
          </p>
        </div>
        
        <div className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 opacity-50">
           Digital Infrastructure Training Environment
        </div>
      </div>
    </div>
  );
};

export default Signup;
