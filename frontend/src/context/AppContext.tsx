import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type AppState = {
  authToken: string | null;
  user: { id?: number; name?: string; email?: string; role?: string } | null;
  trip: Record<string, any> | null;
  setAuthToken: (token: string | null) => void;
  setUser: (user: { id?: number; name?: string; email?: string; role?: string } | null) => void;
  setTrip: (trip: Record<string, any> | null) => void;
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('tripvibe_token'));
  const [user, setUser] = useState<{ id?: number; name?: string; email?: string; role?: string } | null>(
    localStorage.getItem('tripvibe_user') ? JSON.parse(localStorage.getItem('tripvibe_user') || 'null') : null
  );
  const [trip, setTrip] = useState<Record<string, any> | null>(null);

  const value = useMemo(() => ({
    authToken,
    user,
    trip,
    setAuthToken: (token: string | null) => {
      setAuthToken(token);
      if (token) localStorage.setItem('tripvibe_token', token);
      else localStorage.removeItem('tripvibe_token');
    },
    setUser: (nextUser: { id?: number; name?: string; email?: string; role?: string } | null) => {
      setUser(nextUser);
      if (nextUser) localStorage.setItem('tripvibe_user', JSON.stringify(nextUser));
      else localStorage.removeItem('tripvibe_user');
    },
    setTrip,
  }), [authToken, user, trip]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }
  return context;
}
