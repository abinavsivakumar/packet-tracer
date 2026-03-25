import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Sidebar = () => {
  const { user, logout } = useAppContext();
  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/' },
    { name: 'Learn', icon: 'school', path: '/learn' },
    { name: 'Build', icon: 'handyman', path: '/builder' },
    { name: 'Challenges', icon: 'emoji_events', path: '/challenges' },
    { name: 'Profile', icon: 'account_circle', path: '/profile' },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 border-r border-surface-container bg-surface-container-low flex flex-col py-8 px-4 z-50">
      <div className="mb-10 px-4">
        <h1 className="text-2xl font-black text-blue-600 font-headline tracking-tight">Packet Playground</h1>
        <p className="text-xs font-bold text-slate-500 opacity-70">v1.2.4</p>
      </div>
      <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all scale-98 active:scale-95 duration-200 ${
                isActive
                  ? 'text-blue-700 font-bold border-l-4 border-blue-600 bg-blue-50/50'
                  : 'text-slate-500 font-medium hover:bg-blue-50'
              }`
            }
          >
            <span className="material-symbols-outlined" data-icon={item.icon}>{item.icon}</span>
            <span className="font-headline">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t border-surface-container">
        <div className="flex items-center justify-between group/user">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="text-sm font-bold font-headline text-on-surface">{user?.name || 'User'}</p>
              <p className="text-xs text-on-surface-variant font-medium">Level {user?.level || 1}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-500 transition-all duration-300 shadow-sm border border-transparent hover:shadow-lg hover:shadow-red-200"
            title="Sign Out"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
