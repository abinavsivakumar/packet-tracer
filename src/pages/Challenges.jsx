import React from 'react';
import { useAppContext } from '../context/AppContext';
import Layout from '../components/Layout';
import ChallengeCard from '../components/ChallengeCard';
import { challenges } from '../utils/challenges';
import { useNavigate } from 'react-router-dom';

const Challenges = () => {
  const { user, setActiveChallenge, setSimulationState } = useAppContext();
  const navigate = useNavigate();

  if (!user) return <Layout title="Challenges">Please sign in to view challenges.</Layout>;

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

  const completedCount = user.completedChallengeIds?.length || 0;
  const totalCount = challenges.length;
  const progressPercent = Math.min(Math.round((completedCount / totalCount) * 100), 100);

  const handleContinueJourney = () => {
    const nextChallenge = challenges.find(ch => !user.completedChallengeIds?.includes(ch.id));
    if (nextChallenge) {
      handleStartChallenge(nextChallenge);
    } else {
      // All done, restart first or stay
      handleStartChallenge(challenges[0]);
    }
  };

  const getTier = () => {
    if (progressPercent < 30) return { name: 'BRONZE II', next: 'SILVER', toNext: 100 - progressPercent * 3 };
    if (progressPercent < 70) return { name: 'SILVER I', next: 'GOLD', toNext: 100 - (progressPercent - 30) * 2 };
    return { name: 'GOLD III', next: 'PLATINUM', toNext: 100 - (progressPercent - 70) * 3 };
  };

  const tier = getTier();

  return (
    <Layout title="Challenges">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        {/* Hero Header Section */}
        <section className="mb-12 relative overflow-hidden rounded-3xl p-10 bg-gradient-to-br from-primary to-primary-container text-white shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="font-label uppercase tracking-widest text-[10px] font-black opacity-80 bg-white/10 px-3 py-1 rounded-full border border-white/20">Path to Mastery</span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold mt-6 mb-4 leading-tight">Master the flow of information across the web.</h2>
            <p className="font-body text-lg opacity-80 mb-10 leading-relaxed">Complete networking puzzles to unlock rare equipment and climb the leaderboard.</p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleContinueJourney}
                className="bg-white text-primary font-black py-4 px-10 rounded-2xl hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-black/10"
              >
                Continue Journey
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border-white/20 border font-bold py-4 px-10 rounded-2xl hover:bg-white/20 transition-all active:scale-95">
                View Milestones
              </button>
            </div>
          </div>
          <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 hidden xl:block opacity-10 rotate-12">
            <span className="material-symbols-outlined text-[320px]">hub</span>
          </div>
        </section>

        {/* Challenges Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
          {challenges.map((challenge, idx) => {
            const isCompleted = user.completedChallengeIds?.includes(challenge.id);
            const isLocked = idx > 0 && !user.completedChallengeIds?.includes(challenges[idx-1].id);
            
            return (
              <ChallengeCard 
                key={challenge.id}
                challenge={challenge}
                isCompleted={isCompleted}
                isLocked={isLocked}
                isCurrent={!isCompleted && !isLocked}
                onStart={handleStartChallenge}
              />
            );
          })}

          {/* Special Event Card */}
          <div className="lg:col-span-2 bg-surface-container-low p-10 rounded-3xl flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group border border-surface-container shadow-sm hover:shadow-md transition-shadow">
            <div className="relative z-10 flex-1">
              <span className="bg-tertiary text-on-tertiary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Special Event</span>
              <h3 className="font-headline text-3xl font-extrabold mt-6 mb-3 text-on-surface">The Firewall Fortress</h3>
              <p className="text-on-surface-variant mb-8 font-body leading-relaxed max-w-md">A high-stakes collaborative challenge. Work with peers to patch vulnerabilities in real-time.</p>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-4 border-surface-container-low bg-slate-200 overflow-hidden shadow-sm"><img src="https://i.pravatar.cc/100?u=1" alt="player 1"/></div>
                  <div className="w-10 h-10 rounded-full border-4 border-surface-container-low bg-slate-200 overflow-hidden shadow-sm"><img src="https://i.pravatar.cc/100?u=2" alt="player 2"/></div>
                  <div className="w-10 h-10 rounded-full border-4 border-surface-container-low bg-primary flex items-center justify-center text-[10px] font-black text-white shadow-sm">+12</div>
                </div>
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest opacity-60">14 Players Online</span>
              </div>
            </div>
            <div className="relative z-10 w-full md:w-auto">
              <button className="w-full md:w-auto px-10 py-5 bg-tertiary text-white font-black rounded-2xl hover:bg-tertiary-hover transition-all shadow-lg shadow-tertiary/20 active:scale-95">
                Join Squad
              </button>
            </div>
          </div>
        </div>

        {/* Progression Road */}
        <div className="mt-8 bg-surface-container-high/40 p-1.5 rounded-full overflow-hidden border border-surface-container-highest/20 shadow-inner">
          <div 
            className="bg-primary h-3 rounded-full relative transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(0,82,208,0.3)]"
            style={{ width: `${progressPercent}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-4 border-primary rounded-full shadow-lg"></div>
          </div>
        </div>
        <div className="mt-6 flex justify-between px-4 mb-20">
          <span className="text-[11px] font-black text-on-surface-variant font-label uppercase tracking-widest">TIER: {tier.name}</span>
          <span className="text-[11px] font-black text-primary font-label uppercase tracking-[0.2em]">{progressPercent}% COMPLETED</span>
          <span className="text-[11px] font-black text-on-surface-variant font-label uppercase tracking-widest">NEXT: {tier.next}</span>
        </div>
      </div>
    </Layout>
  );
};

export default Challenges;
