import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface NavbarContextType {
  forceHidden: boolean;
  setForceHidden: (hidden: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [forceHidden, setForceHidden] = useState(false);

  return (
    <NavbarContext.Provider value={{ forceHidden, setForceHidden }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
};
