import React, { useState } from 'react';
import { Sidebar, PageId } from './Sidebar';
import { Topbar } from './Topbar';

interface LayoutProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ activePage, onNavigate, children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Fixed Sidebar */}
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main App Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <Topbar
          activePage={activePage}
          onNavigate={onNavigate}
          onToggleMobileMenu={() => setIsMobileSidebarOpen(prev => !prev)}
        />

        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>

        <footer className="py-4 px-6 border-t border-slate-200/80 bg-white text-center text-xs text-slate-400">
          UniOps-AI • Enterprise University AI Operations Platform Prototype • FERPA & DPDP Compliant Architecture
        </footer>
      </div>
    </div>
  );
};
