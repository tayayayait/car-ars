import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Dashboard } from './components/Dashboard';
import { Simulator } from './components/Simulator';
import { ViewState } from './types';

function App() {
  // Simple view-based routing for SPA
  const [currentView, setView] = useState<ViewState>('home');

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <Home onRegisterSuccess={() => setView('dashboard')} />;
      case 'dashboard':
        return <Dashboard />;
      case 'simulation':
        return <Simulator />;
      default:
        return <Home onRegisterSuccess={() => setView('dashboard')} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setView}>
      {renderContent()}
    </Layout>
  );
}

export default App;