import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <TopBar title={title} />
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-10 max-w-7xl mx-auto space-y-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
