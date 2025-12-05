import React from 'react';
import { Shield, LayoutDashboard, Terminal } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, setView }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Navbar with Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setView('home')}
          >
            <div className="bg-brand-600 p-2 rounded-lg group-hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200/50">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">SafeCall</span>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            <NavButton 
              active={currentView === 'home'} 
              onClick={() => setView('home')}
            >
              홈
            </NavButton>
            <NavButton 
              active={currentView === 'dashboard'} 
              onClick={() => setView('dashboard')}
              icon={<LayoutDashboard className="w-4 h-4" />}
            >
              대시보드
            </NavButton>
            <NavButton 
              active={currentView === 'simulation'} 
              onClick={() => setView('simulation')}
              icon={<Terminal className="w-4 h-4" />}
              className="text-purple-700 bg-purple-50 hover:bg-purple-100"
              activeClassName="bg-purple-100 text-purple-800"
            >
              시뮬레이터
            </NavButton>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="font-semibold text-slate-700 mb-2">SafeCall Inc.</p>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} SafeCall. 개인정보를 최우선으로 생각합니다.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Helper Component for Navigation Buttons
interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, children, icon, className, activeClassName }) => {
  const baseStyle = "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200";
  const defaultActive = "text-brand-700 bg-brand-50 shadow-sm";
  const defaultInactive = "text-slate-500 hover:text-slate-900 hover:bg-slate-100";

  // Allow custom overrides
  const activeStyle = activeClassName || defaultActive;
  const inactiveStyle = className || defaultInactive;

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${active ? activeStyle : inactiveStyle}`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};