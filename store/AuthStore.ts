import { create } from 'zustand';

interface AuthState {
  session: boolean;
  username : string;
  setUser: (username: string) => void;
  setSession: (session: boolean) => void;
  clearSession: () => void;

}

const useAuthStore = create<AuthState>((set) => ({
  session: false,
  username: '',
  setUser: (username) => set({ username }),
  setSession: (session) => set({ session }),
  clearSession: () => set({ session: false }),
}));

export default useAuthStore;
