
import { create } from "zustand"

export const useVehicleStore = create((set) => ({
  vehicles: [],

  setVehicles: (vehicles) => set({ vehicles }),

}))