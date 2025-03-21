'use client';
import { createContext, useContext, useState } from 'react';

// Define the shape of our context
interface NavBarContextType {
  productCategory: {
    get: string;
    update: (category: string) => void;
  };
}

// Create the context with a default value matching the type
const AppContexts = createContext<NavBarContextType | undefined>(undefined);

export function NavBarProvider({ children }: { children: React.ReactNode }) {
  const [productCategory, setProductCategory] = useState("");

  const AppContext: NavBarContextType = {
    productCategory: {
      get: productCategory,
      update: function(category: string) {
        setProductCategory(category);
      }
    }
  };

  return (
    <AppContexts.Provider value={AppContext}>
      {children}
    </AppContexts.Provider>
  );
}

export function useNavBarContext() {
  const context = useContext(AppContexts);
  if (!context) throw new Error('useNavBarContext must be used within NavBarProvider');
  return context;
}