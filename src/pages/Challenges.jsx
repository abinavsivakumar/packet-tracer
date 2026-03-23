import React from 'react';
import { useAppContext } from '../context/AppContext';
import Layout from '../components/Layout';
import ChallengeCard from '../components/ChallengeCard';
import { challenges } from '../utils/challenges';
import { useNavigate } from 'react-router-dom';

const Challenges = () => {
  const { user, setActiveChallenge, setSimulationState } = useAppContext();
  const navigate = useNavigate();

  const handleStartChallenge = (challenge) => {
    setActiveChallenge(challenge);
    setSimulationState(prev => ({
      ...prev,
      nodes: challenge.initialNodes || [],
      edges: challenge.initialEdges || [],
      result: null
    }));
    navigate('/builder');
  };

  return (
    <Layout title="Challenges">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header Section */}
        <section className="mb-12 relative overflow-hidden rounded-xl p-10 bg-gradient-to-br from-primary to-primary-container text-white shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="font-label uppercase tracking-widest text-xs font-black opacity-80">Path to Mastery</span>
            <h2 className="font-headline text-4xl font-extrabold mt-2 mb-4 leading-tight">Master the flow of information across the web.</h2>
            <p className="font-body text-lg opacity-90 mb-8">Complete networking puzzles to unlock rare equipment and climb the leaderboard.</p>
            <div className="flex gap-4">
              <button className="bg-surface-container-lowest text-primary font-bold py-3 px-8 rounded-xl hover:scale-102 transition-transform duration-300">
                Continue Journey
              </button>
              <button className="bg-primary-dim/20 backdrop-blur-md text-white border-white/20 border font-bold py-3 px-8 rounded-xl hover:bg-white/10 transition-colors">
                View Milestones
              </button>
            </div>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block opacity-20">
            <span className="material-symbols-outlined text-[180px]">network_node</span>
          </div>
        </section>

        {/* Challenges Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {challenges.map((challenge, idx) => (
            <ChallengeCard 
              key={challenge.id}
              challenge={challenge}
              isCompleted={idx < 1} // Mocking first one as completed for UI
              isCurrent={idx === 1} // Mocking second one as current
              onStart={handleStartChallenge}
            />
          ))}

          {/* Special Event Card */}
          <div className="lg:col-span-2 bg-tertiary-container/10 p-8 rounded-xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group border border-tertiary-container/30">
            <div className="relative z-10 flex-1">
              <span className="bg-tertiary text-on-tertiary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Special Event</span>
              <h3 className="font-headline text-3xl font-extrabold mt-4 mb-2 text-on-tertiary-container">The Firewall Fortress</h3>
              <p className="text-on-tertiary-container/80 mb-6 font-body">A high-stakes collaborative challenge. Work with peers to patch vulnerabilities in real-time.</p>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_1RO0qvgGAIl8GecHluakHtAeyq8DRuhNkcVEAqzmpsEC4AF70iZpaHQedbjcaoYUq6BV9hPIpqUjMpGb68ry9fy6p4fhnJjctSQAA555jORK0UJYAZZ_fiMNsylSnh08XlhvC4vz89wsujc7rwAIVWdgFTxjKQP9mJXT0Fi5Im46JhK_54UP4jkTXNMU-uFy2C9DTuOiinJAnz5kSrjnxUeu6APwyUtnNwIUm4zzxrxZ6I3iBTU_nM968UVbloQobxqDsdv2lB8" alt="player 1"/></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300 overflow-hidden"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCzN1iT5mLVspX2PweG-kHt3WaQABkLSWayH5nBSEn4rMAkDMmm4TlFSIBrrN2Y0Fc4UuAZoRQlU7H8VeSeFHuogWG_fPWCWap3qlj3bF8TmO_Xc-7TH4lsHHlKpQRmTs6aIhsoizAjKwtszaM69OKADmcrYumcSr5JnEqNn6DlFHvNTo3EQUAx_tqTN0YXHQpJvXcuAId7966VQJdQ4i9m3FNGWOBpJvwO6Sa5YILz52NyRjEAjRjIQaA0svoFRaV1asJAPbsyxU" alt="player 2"/></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400 flex items-center justify-center text-[10px] font-bold text-white">+12</div>
                </div>
                <span className="text-sm font-bold text-tertiary-dim">14 Players Online</span>
              </div>
            </div>
            <div className="relative z-10 w-full md:w-auto">
              <button className="w-full md:w-auto px-8 py-4 bg-tertiary text-white font-black rounded-xl hover:bg-on-tertiary-fixed-variant transition-colors shadow-lg shadow-tertiary/20">
                Join Squad
              </button>
            </div>
          </div>
        </div>

        {/* Progression Road */}
        <div className="mt-8 bg-surface-container-high/40 p-1 rounded-full overflow-hidden">
          <div className="bg-primary h-2 w-1/3 rounded-full relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-4 border-primary rounded-full shadow-md"></div>
          </div>
        </div>
        <div className="mt-4 flex justify-between px-2 mb-12">
          <span className="text-[10px] font-black text-on-surface-variant font-label">TIER: BRONZE II</span>
          <span className="text-[10px] font-black text-primary font-label uppercase">35% TO SILVER</span>
          <span className="text-[10px] font-black text-on-surface-variant font-label">TIER: SILVER I</span>
        </div>
      </div>
    </Layout>
  );
};

export default Challenges;
