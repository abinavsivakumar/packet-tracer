import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Layout from '../components/Layout';
import { learningModules } from '../data/learningModules';
import StatCard from '../components/StatCard';
import BadgeCard from '../components/BadgeCard';
import XPBar from '../components/XPBar';

const Dashboard = () => {
  const { user } = useAppContext();
  
  if (!user) return <Layout title="Dashboard">Please sign in to view your dashboard.</Layout>;

  const completedModules = user?.completedModules || [];
  
  // Find the first module that is NOT completed
  const currentModule = learningModules.find(m => !completedModules.includes(m.id)) || learningModules[0];

  return (
    <Layout title="Overview / Dashboard">
      {/* Welcome Header & Progress Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-on-surface">
        <div className="space-y-2">
          <h2 className="text-4xl font-black font-headline tracking-tight">Welcome back, {user.name?.split(' ')[0] || 'Explorer'}!</h2>
          <p className="text-on-surface-variant font-medium">You're on a 5-day streak. Keep it up!</p>
        </div>
        <XPBar currentXP={user.xp || 0} xpToNext={user.xpToNext || 1000} level={user.level || 1} />
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Large CTA Card (Main Focus) */}
        <div className="col-span-12 lg:col-span-8">
          <div className="relative group overflow-hidden bg-primary rounded-xl h-full min-h-[320px] flex items-center p-10 text-on-primary">
            <div className="relative z-10 space-y-6 max-w-md">
              <span className="bg-primary-container/30 px-4 py-1 rounded-full text-xs font-bold font-headline uppercase tracking-widest border border-white/10">Active Mission</span>
              <div className="space-y-2">
                <h3 className="text-3xl font-black font-headline leading-tight">{currentModule.title}</h3>
                <p className="text-on-primary/80 leading-relaxed">{currentModule.shortDescription}</p>
              </div>
              <Link 
                to={`/learn/${currentModule.id}`}
                className="bg-white text-primary px-8 py-4 rounded-xl font-headline font-bold text-sm shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition-all inline-block"
              >
                Continue Learning
              </Link>
            </div>
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
              <img 
                className="w-full h-full object-cover" 
                alt="Abstract blue glowing network nodes and lines" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtRrWpXKmUCn4n_Y_79Y5vo--FrWPKiTSt8m2S9ZjHLYpOBbTKrbVcTS-HzGQ-0c4v7H9nBPFPLBag9pgiarIKEmParG2nqzGG56t4YlplsNMtxcWGhWIRtB_kwWJMBwvARq6CY9EA_E77VGHq83GrYos95K_37HnT55vdSFaqehVrpPcjutiN48reZTUHaHWQ3xsMR2QbEP65UCyliq-Nf6MC4JjgwdaEv2o-Jte0KxxMMW8unGMILTVLpwNI6RZ8qsYX59YehPw" 
              />
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary-container rounded-full blur-[100px] opacity-40"></div>
          </div>
        </div>

        {/* Stats Cards Column */}
        <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-6">
          <StatCard 
            label="Current Level" 
            value={`Level ${user.level}`} 
            icon="layers" 
            colorClass="bg-secondary-container text-on-secondary-container" 
          />
          <StatCard 
            label="Devices Unlocked" 
            value={`${user.unlockedDevices} / 24`} 
            icon="router" 
            colorClass="bg-tertiary-container text-on-tertiary-container" 
          />
          <StatCard 
            label="Challenges Completed" 
            value={user.completedChallenges} 
            icon="task_alt" 
            colorClass="bg-primary-container text-on-primary-container" 
          />
        </div>

        {/* Achievement Badges Section */}
        <div className="col-span-12">
          <div className="bg-surface-container-low p-10 rounded-xl space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary-fixed text-3xl" data-icon="workspace_premium">workspace_premium</span>
                <h3 className="text-2xl font-black font-headline text-on-surface">Achievement Badges</h3>
              </div>
              <button className="text-primary font-bold text-sm hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <BadgeCard name="First Hop" icon="rocket_launch" colorClass="bg-secondary-container text-on-secondary-container" isLocked={!user.badges.includes('rocket_launch')} />
              <BadgeCard name="Firewall Pro" icon="shield" colorClass="bg-tertiary-container text-on-tertiary-container" isLocked={!user.badges.includes('shield')} />
              <BadgeCard name="Master Link" icon="hub" colorClass="bg-primary-container text-on-primary-container" isLocked={!user.badges.includes('hub')} />
              <BadgeCard name="Server King" icon="dns" colorClass="bg-surface-container-highest text-on-surface-variant" isLocked={!user.badges.includes('dns')} />
              <BadgeCard name="CLI Wizard" icon="terminal" colorClass="bg-surface-container-highest text-on-surface-variant" isLocked={!user.badges.includes('terminal')} />
              <BadgeCard name="Cloud Hero" icon="cloud_done" colorClass="bg-surface-container-highest text-on-surface-variant" isLocked={!user.badges.includes('cloud_done')} />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-12 lg:col-span-6 bg-surface-container-low p-10 rounded-xl space-y-6">
          <h3 className="text-xl font-black font-headline text-on-surface">Recent Lab Sessions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-sm" data-icon="verified">verified</span>
                </div>
                <div>
                  <p className="text-sm font-bold font-headline text-on-surface">Subnet Masking Basics</p>
                  <p className="text-[10px] text-on-surface-variant font-medium">Completed 2 hours ago</p>
                </div>
              </div>
              <span className="text-secondary font-bold text-xs">+150 XP</span>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="col-span-12 lg:col-span-6 bg-surface-container-low p-10 rounded-xl space-y-6">
          <h3 className="text-xl font-black font-headline text-on-surface">Class Leaderboard</h3>
          <div className="space-y-4">
               {/* Leaderboard items scaled from HTML */}
               <div className="flex items-center justify-between px-2 bg-primary/5 py-3 rounded-lg border border-primary/10">
              <div className="flex items-center gap-4">
                <span className="font-headline font-black text-primary w-4 text-center">1</span>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                  <img className="w-full h-full object-cover" alt="User avatar for Sam" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9TTQ6q37qXvq8O3dwAbJmlbyTcfZu4VuP5IYpzRkPc-3QWh5_oioU6QAN2EhMTRI4AqsIrOgxQ2RNX_utjszj_LcNI-O3KdG_Fk4aiH3rLf03K1DN06EW2onCeTsRskKsbva5ok4ZjIhPWtV63i_V44mLs6lFAWXTfR-zlYKAcocuw6cqKuBRA7ypBrFdkRiWxovNjmtkTZltW2qa5mk3Z93UYTlkn1209YLU4Vr9CQ1BtW_V8uqLh1mayBySdLcaWNhQ6dyaqo4"/>
                </div>
                <span className="text-sm font-bold font-headline text-on-surface">{user.name} (You)</span>
              </div>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase">4.8k XP</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
