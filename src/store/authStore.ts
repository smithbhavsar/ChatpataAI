import { create } from 'zustand';
import { User } from '../types';
import { supabase } from './supabaseClient';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (phoneNumber: string) => Promise<User | null>;
  logout: () => void;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  // Login function
  login: async (phoneNumber) => {
    const { data, error } = await supabase
      .from('customers')
      .select('*, role') // Fetch role along with user data
      .eq('phone_number', phoneNumber)
      .single();

    if (error || !data) {
      throw new Error('User not registered. Please sign up first.');
    }

    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify(data));

    set({ user: data, isAuthenticated: true });
    return data;
  },

  // Logout function
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },

  // Restore session from local storage on page reload
  restoreSession: async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      set({ user: JSON.parse(storedUser), isAuthenticated: true });
    }
  },
}));

