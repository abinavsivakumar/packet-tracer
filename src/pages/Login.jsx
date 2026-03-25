import React from 'react';
import { useAppContext } from '../context/AppContext';

const Login = ({ onToggle }) => {
  const { login } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white shadow-primary/5 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-primary/20">
            <span className="material-symbols-outlined text-white text-5xl">router</span>
          </div>
          
          <h1 className="text-3xl font-black font-headline text-on-surface mb-2 tracking-tight">Packet Playground</h1>
          <p className="text-on-surface-variant font-medium mb-12">Level up your networking skills in the ultimate interactive sandbox.</p>

          <div className="w-full space-y-4">
             <button 
               onClick={login}
               className="w-full bg-primary text-white py-4 rounded-2xl font-bold font-headline text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
             >
                Dive Into Simulation
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
             </button>
             
             <div className="flex items-center gap-4 py-4">
                <div className="h-px flex-1 bg-surface-container"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Collaborate With</span>
                <div className="h-px flex-1 bg-surface-container"></div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 border-2 border-surface-container rounded-xl font-bold text-sm hover:bg-surface-container-low transition-colors">
                   <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5 opacity-70" alt="Google" />
                   Google
                </button>
                <button className="flex items-center justify-center gap-2 py-3 border-2 border-surface-container rounded-xl font-bold text-sm hover:bg-surface-container-low transition-colors">
                   <span className="material-symbols-outlined text-xl opacity-70">corporate_fare</span>
                   Edu Portal
                </button>
             </div>
          </div>

          <p className="mt-12 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Don't have an account? <span onClick={onToggle} className="text-primary cursor-pointer hover:underline">Get Certified</span>
          </p>
        </div>
        
        <div className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 opacity-50">
           Digital Infrastructure Training Environment
        </div>
      </div>
    </div>
  );
};

export default Login;
