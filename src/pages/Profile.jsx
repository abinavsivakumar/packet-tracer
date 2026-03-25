import React from 'react';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';
import StatCard from '../components/StatCard';
import BadgeCard from '../components/BadgeCard';
import XPBar from '../components/XPBar';

const Profile = () => {
  const { user } = useAppContext();

  if (!user) return <Layout title="Profile">Please sign in to view your profile.</Layout>;

  const stats = [
    { label: "Devices Unlocked", value: `${user.unlockedDevices || 0} / 24`, icon: "router", color: "bg-primary-container text-on-primary-container" },
    { label: "Challenges Won", value: user.completedChallenges || 0, icon: "emoji_events", color: "bg-secondary-container text-on-secondary-container" },
    { label: "Total XP", value: (user.xp || 0) + ((user.level || 0) * 1000), icon: "bolt", color: "bg-tertiary-container text-on-tertiary-container" },
    { label: "Current Rank", value: user.rank || "Explorer", icon: "military_tech", color: "bg-surface-container-highest text-on-surface-variant" }
  ];

  const allBadges = [
    { name: "First Hop", icon: "rocket_launch", locked: !user.badges?.includes('rocket_launch') },
    { name: "Firewall Pro", icon: "shield", locked: !user.badges?.includes('shield') },
    { name: "Master Link", icon: "hub", locked: !user.badges?.includes('hub') },
    { name: "Server King", icon: "dns", locked: !user.badges?.includes('dns') },
    { name: "CLI Wizard", icon: "terminal", locked: !user.badges?.includes('terminal') },
    { name: "Cloud Hero", icon: "cloud_done", locked: !user.badges?.includes('cloud_done') }
  ];

  return (
    <Layout title="Your Profile">
      <div className="space-y-10">
        {/* Profile Header Card */}
        <section className="bg-surface-container-low rounded-2xl p-10 flex flex-col md:flex-row items-center gap-10 border border-white/20 shadow-xl">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-5xl text-white font-black shadow-2xl overflow-hidden border-4 border-white/10">
              <img 
                className="w-full h-full object-cover" 
                alt="User profile avatar" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9TTQ6q37qXvq8O3dwAbJmlbyTcfZu4VuP5IYpzRkPc-3QWh5_oioU6QAN2EhMTRI4AqsIrOgxQ2RNX_utjszj_LcNI-O3KdG_Fk4aiH3rLf03K1DN06EW2onCeTsRskKsbva5ok4ZjIhPWtV63i_V44mLs6lFAWXTfR-zlYKAcocuw6cqKuBRA7ypBrFdkRiWxovNjmtkTZltW2qa5mk3Z93UYTlkn1209YLU4Vr9CQ1BtW_V8uqLh1mayBySdLcaWNhQ6dyaqo4" 
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-secondary text-white p-2 rounded-full shadow-lg border-2 border-white">
                <span className="material-symbols-outlined text-xs">verified</span>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h2 className="text-4xl font-black font-headline text-on-surface tracking-tight">{user.name}</h2>
              <p className="text-on-surface-variant font-bold uppercase tracking-widest text-xs flex items-center justify-center md:justify-start gap-2 mt-1">
                <span className="material-symbols-outlined text-sm">workspace_premium</span>
                {user.rank}
              </p>
            </div>
            
            <XPBar currentXP={user.xp || 0} xpToNext={user.xpToNext || 1000} level={user.level || 1} />
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
               <button className="bg-primary text-on-primary px-6 py-2 rounded-full text-xs font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-primary/20">
                 <span className="material-symbols-outlined text-sm">edit</span>
                 Edit Profile
               </button>
               <button className="bg-surface-container-highest text-on-surface-variant px-6 py-2 rounded-full text-xs font-bold hover:bg-surface-container-high transition-colors flex items-center gap-2">
                 <span className="material-symbols-outlined text-sm">share</span>
                 Share Stats
               </button>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard 
              key={i} 
              label={stat.label} 
              value={stat.value} 
              icon={stat.icon} 
              colorClass={stat.color} 
            />
          ))}
        </div>

        {/* Badges & Achievements Section */}
        <section className="bg-surface-container-low rounded-2xl p-10 border border-white/20 space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary-fixed text-2xl">military_tech</span>
                    <h3 className="text-2xl font-black font-headline text-on-surface">Badge Collection</h3>
                </div>
                <span className="text-xs font-bold text-on-surface-variant bg-surface-container rounded-full px-4 py-1">
                    {user.badges?.length || 0} / {allBadges.length} Earned
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {allBadges.map((badge, i) => (
                    <BadgeCard 
                        key={i} 
                        name={badge.name} 
                        icon={badge.icon} 
                        isLocked={badge.locked} 
                        colorClass={badge.locked ? "bg-surface-container-highest text-on-surface-variant" : "bg-primary-container/20 text-primary"}
                    />
                ))}
            </div>
        </section>

        {/* Recent Mastery & History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
            <div className="lg:col-span-2 bg-surface-container-low rounded-2xl p-10 border border-white/20">
                <h3 className="text-xl font-black font-headline text-on-surface mb-6">Learning Journey</h3>
                <div className="space-y-4">
                    {[
                        { title: "Static Routing Mastered", time: "2 days ago", xp: "+450", icon: "auto_stories", color: "text-blue-600 bg-blue-50" },
                        { title: "Subnetting Basics Level 1", time: "5 days ago", xp: "+120", icon: "check_circle", color: "text-green-600 bg-green-50" },
                        { title: "Network Topologies Quiz", time: "1 week ago", xp: "+300", icon: "quiz", color: "text-orange-600 bg-orange-50" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-surface rounded-xl border border-surface-container">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}>
                                    <span className="material-symbols-outlined text-xl">{item.icon}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold font-headline text-on-surface">{item.title}</p>
                                    <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-tight">{item.time}</p>
                                </div>
                            </div>
                            <span className="text-primary font-black text-xs">{item.xp} XP</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-primary rounded-2xl p-8 text-on-primary flex flex-col justify-between relative overflow-hidden group">
                <div className="relative z-10 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full border border-white/10">Next Goal</span>
                    <h3 className="text-2xl font-headline font-black leading-tight">Elite Networking Architect</h3>
                    <p className="text-sm opacity-80 leading-relaxed">Complete 5 more expert modules to unlock the Golden Router badge.</p>
                </div>
                <div className="relative z-10 pt-8 mt-auto">
                    <button className="w-full bg-white text-primary py-3 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10">
                        View Roadmap
                    </button>
                </div>
                {/* Decoration */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
