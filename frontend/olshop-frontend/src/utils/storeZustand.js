import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isLoggedIn: false, // Awalnya pengguna tidak login
  login: () => set({ isLoggedIn: true }), // Fungsi untuk menandai pengguna telah login
  logout: () => set({ isLoggedIn: false }), // Fungsi untuk menandai pengguna telah logout
}));

export { useAuthStore };