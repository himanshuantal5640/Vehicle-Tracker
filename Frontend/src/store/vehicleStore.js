import { create } from "zustand";

export const useVehicleStore = create((set) => ({
  vehicles: [],
  selectedVehicle: null,
  selectedTrip: null,   
  history: {},

  bookingMode: false,
  bookingPoints: [],
  previewRoute: [],

 

  setBookingMode: (mode) =>
    set({ bookingMode: mode }),

  addBookingPoint: (point) =>
    set((state) => ({
      bookingPoints: [...state.bookingPoints, point],
    })),

  setPreviewRoute: (route) =>
    set({ previewRoute: route }),

  resetBooking: () =>
    set({
      bookingMode: false,
      bookingPoints: [],
      previewRoute: [],
    }),



  setVehicles: (vehicles) =>
    set((state) => {
      const newHistory = { ...state.history };

      vehicles.forEach((v) => {
        if (!newHistory[v._id]) newHistory[v._id] = [];
        newHistory[v._id].push([v.lat, v.lng]);

        if (newHistory[v._id].length > 10) {
          newHistory[v._id].shift();
        }
      });

      return { vehicles, history: newHistory };
    }),

  setSelectedVehicle: (vehicle) =>
    set({ selectedVehicle: vehicle }),



  setSelectedTrip: (trip) =>  
    set({ selectedTrip: trip }),
}));