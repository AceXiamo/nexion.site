import { createContext, useContext, useRef, type ReactNode } from 'react';

interface LayoutContextType {
  navbarInstance: React.RefObject<HTMLElement> | null;
}

const LayoutContext = createContext<LayoutContextType>({ navbarInstance: null });

export function LayoutProvider({ children }: { children: ReactNode }) {
  const navbarInstance = useRef<HTMLElement>(null);
  
  return (
    <LayoutContext.Provider value={{ navbarInstance }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutContext() {
  return useContext(LayoutContext);
}