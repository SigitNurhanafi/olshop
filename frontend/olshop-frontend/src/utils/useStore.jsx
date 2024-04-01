import { create } from 'zustand';

const useStore = create((set) => ({
  token: null,
  setToken: (newToken) => set({ token: newToken }),
}));

export default useStore;