// import React from "react"
// import { create } from "zustand"

// export const useAlertStore = create((set) => ({
//   alerts: [],
//   setAlerts: (alerts) => set({ alerts }),
//   addAlert: (alert) =>
//     set((state) => ({ alerts: [alert, ...state.alerts] })),
// }))

import { create } from "zustand"

export const useAlertStore = create((set) => ({
  alerts: [],

  addAlert: (alert) =>
    set((state) => ({
      alerts: [...state.alerts, alert],
    })),

  clearAlerts: () => set({ alerts: [] }),
}))