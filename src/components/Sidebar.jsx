import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/' },
    { name: 'Learn', icon: 'school', path: '/learn' },
    { name: 'Build', icon: 'handyman', path: '/builder' },
    { name: 'Challenges', icon: 'emoji_events', path: '/challenges' },
    { name: 'Profile', icon: 'account_circle', path: '/profile' },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 border-r-0 bg-slate-50 flex flex-col py-8 px-4 z-50">
      <div className="mb-10 px-4">
        <h1 className="text-2xl font-black text-blue-600 font-headline tracking-tight">Packet Playground</h1>
        <p className="text-xs font-bold text-slate-500 opacity-70">v1.2.4</p>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all scale-98 active:scale-95 duration-200 ${
                isActive
                  ? 'text-blue-700 font-bold border-r-4 border-blue-600 bg-blue-50/50'
                  : 'text-slate-500 font-medium hover:bg-blue-50'
              }`
            }
          >
            <span className="material-symbols-outlined" data-icon={item.icon}>{item.icon}</span>
            <span className="font-headline">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto px-4 py-4 bg-surface-container-low rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold">S</div>
          <div>
            <p className="text-sm font-bold font-headline text-on-surface">Sam Miller</p>
            <p className="text-xs text-on-surface-variant">Level 12 Architect</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
