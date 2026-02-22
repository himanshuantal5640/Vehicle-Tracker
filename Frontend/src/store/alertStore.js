
import { create } from "zustand"

export const useAlertStore = create((set) => ({
  alerts: [],

  addAlert: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, alert],
    })),

  clearAlerts: () => set({ alerts: [] }),
}))