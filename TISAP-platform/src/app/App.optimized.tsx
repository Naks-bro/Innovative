import React, { lazy, Suspense } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { UserProvider } from './components/UserContext';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { Toaster } from './components/Toaster';
import LandingPage from './pages/LandingPage';
import LoadingScreen from './components/shared/LoadingScreen';

// Lazy load pages for better performance
const EmployeeDashboard = lazy(() => import('./components/EmployeeDashboard'));
const LabCatalog = lazy(() => import('./components/LabCatalog'));
const WindowsSimulation = lazy(() => import('./components/WindowsSimulation'));
const BrowserSimulation = lazy(() => import('./components/BrowserSimulation'));
const EmailSimulation = lazy(() => import('./components/EmailSimulation'));
const MicroTrainingModal = lazy(() => import('./components/MicroTrainingModal'));
const AdaptiveQuiz = lazy(() => import('./components/AdaptiveQuiz'));
const ResultsBadge = lazy(() => import('./components/ResultsBadge'));
const AdminSnapshot = lazy(() => import('./components/AdminSnapshot'));
const DesignSystemSpec = lazy(() => import('./components/DesignSystemSpec'));

/**
 * Main router component that renders pages based on navigation state
 */
function AppRouter() {
  const { currentPage, navigate } = useNavigation();

  // Render current page with Suspense for lazy loading
  const renderPage = () => {
    if (currentPage === 'landing') {
      return <LandingPage />;
    }

    return (
      <Suspense fallback={<LoadingScreen />}>
        {currentPage === 'dashboard' && <EmployeeDashboard onNavigate={navigate} />}
        {currentPage === 'catalog' && <LabCatalog onNavigate={navigate} onBack={() => navigate('dashboard')} />}
        {currentPage === 'windows-sim' && <WindowsSimulation onNavigate={navigate} onBack={() => navigate('catalog')} />}
        {currentPage === 'browser-sim' && <BrowserSimulation onNavigate={navigate} onBack={() => navigate('catalog')} />}
        {currentPage === 'email-sim' && <EmailSimulation onNavigate={navigate} onBack={() => navigate('catalog')} />}
        {currentPage === 'micro-training' && <MicroTrainingModal onNavigate={navigate} />}
        {currentPage === 'quiz' && <AdaptiveQuiz onNavigate={navigate} />}
        {currentPage === 'results' && <ResultsBadge onNavigate={navigate} />}
        {currentPage === 'admin' && <AdminSnapshot onBack={() => navigate('landing')} />}
        {currentPage === 'design-system' && <DesignSystemSpec onBack={() => navigate('landing')} />}
      </Suspense>
    );
  };

  return (
    <>
      <Toaster />
      {renderPage()}
    </>
  );
}

/**
 * Main App component with all providers
 */
export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NavigationProvider>
          <AppRouter />
        </NavigationProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
