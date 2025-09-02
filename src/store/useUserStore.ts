import { create } from 'zustand';

// Define the structure of the store
interface UserState {
  user: {
    name: string;
    email: string;
    username: string;
  } | null;
  setUser: (user: UserState['user']) => void;
  clearUser: () => void;
}

// Create the store
export const useUserStore = create<UserState>((set) => ({
  user: null,  // initial state
  setUser: (user) => set({ user }), // set user data
  clearUser: () => set({ user: null }), // clear user data
}));
