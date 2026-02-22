// import React from "react"
// import { create } from "zustand"

// export const useVehicleStore = create((set) => ({
//   vehicles: [],
//   setVehicles: (vehicles) => set({ vehicles }),

//   updateVehicle: (updatedVehicle) =>
//     set((state) => ({
//       vehicles: state.vehicles.map((v) =>
//         v._id === updatedVehicle._id ? updatedVehicle : v
//       ),
//     })),
// }))

import { create } from "zustand"

export const useVehicleStore = create((set) => ({
  vehicles: [],

  setVehicles: (vehicles) => set({ vehicles }),

}))