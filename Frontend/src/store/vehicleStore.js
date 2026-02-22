import { create } from "zustand"

export const useVehicleStore = create((set) => ({
  vehicles: [],
  selectedVehicle: null,
  history: {},

  setVehicles: (vehicles) =>
    set((state) => {
      const newHistory = { ...state.history }

      vehicles.forEach((v) => {
        if (!newHistory[v._id]) newHistory[v._id] = []

        newHistory[v._id].push([v.lat, v.lng])

        // Keep last 10 positions
        if (newHistory[v._id].length > 10) {
          newHistory[v._id].shift()
        }
      })

      return {
        vehicles,
        history: newHistory,
      }
    }),

  setSelectedVehicle: (vehicle) =>
    set({ selectedVehicle: vehicle }),
}))