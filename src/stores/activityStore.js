import { create } from 'zustand';

export const useActivityStore = create((set) => ({
  activity: null,
  setActivity: (activity) => set({ activity }),
}));
