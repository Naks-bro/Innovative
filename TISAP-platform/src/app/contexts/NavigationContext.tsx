import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type Page = 
  | 'landing'
  | 'dashboard' 
  | 'catalog' 
  | 'windows-sim' 
  | 'browser-sim' 
  | 'email-sim' 
  | 'micro-training' 
  | 'quiz' 
  | 'results' 
  | 'admin'
  | 'design-system';

interface NavigationContextType {
  currentPage: Page;
  navigate: (page: Page) => void;
  goBack: () => void;
  navigationHistory: Page[];
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
  initialPage?: Page;
}

export const NavigationProvider = ({ children, initialPage = 'landing' }: NavigationProviderProps) => {
  const [currentPage, setCurrentPage] = useState<Page>(initialPage);
  const [navigationHistory, setNavigationHistory] = useState<Page[]>([initialPage]);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    setNavigationHistory(prev => [...prev, page]);
    
    // Analytics tracking point
    console.log('📊 ANALYTICS: Page view', {
      page,
      timestamp: new Date().toISOString(),
      userId: 'current-user-id' // Replace with actual user ID
    });
  }, []);

  const goBack = useCallback(() => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current page
      const previousPage = newHistory[newHistory.length - 1];
      setCurrentPage(previousPage);
      setNavigationHistory(newHistory);
    }
  }, [navigationHistory]);

  return (
    <NavigationContext.Provider value={{ currentPage, navigate, goBack, navigationHistory }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
