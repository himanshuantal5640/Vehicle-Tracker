// import React, { useEffect } from "react"
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
//   Circle,
//   useMap,
// } from "react-leaflet"
// import L from "leaflet"
// import { useVehicleStore } from "../../store/vehicleStore"
// import "leaflet/dist/leaflet.css"

// /* Fix default marker */
// delete L.Icon.Default.prototype._getIconUrl
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
//   iconUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//   shadowUrl:
//     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
// })

// /* Arrow Icon */
// const arrowIcon = (heading) =>
//   L.divIcon({
//     className: "vehicle-arrow",
//     html: `<div style="transform: rotate(${heading}deg)">▲</div>`,
//     iconSize: [20, 20],
//   })

// function FlyToSelected() {
//   const selectedVehicle = useVehicleStore((state) => state.selectedVehicle)
//   const map = useMap()

//   useEffect(() => {
//     if (selectedVehicle) {
//       map.flyTo(
//         [selectedVehicle.lat, selectedVehicle.lng],
//         15,
//         { duration: 1.5 }
//       )
//     }
//   }, [selectedVehicle])

//   return null
// }

// export default function MapSection() {
//   const vehicles = useVehicleStore((state) => state.vehicles)
//   const history = useVehicleStore((state) => state.history)

//   return (
//     <MapContainer
//       center={[12.9716, 77.5946]}
//       zoom={12}
//       style={{ height: "100%", width: "100%" }}
//     >
//       <TileLayer
//         attribution="© OpenStreetMap contributors"
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       <FlyToSelected />

//       {/* ✅ SINGLE Geofence Circle */}
//       <Circle
//         center={[12.9716, 77.5946]}
//         radius={2000}
//         pathOptions={{
//           color: "cyan",
//           fillColor: "cyan",
//           fillOpacity: 0.15,
//         }}
//       />

//       {vehicles.map((vehicle) => {
//         const path = history[vehicle._id] || []

//         return (
//           <React.Fragment key={vehicle._id}>
            
//             {/* Trail Line */}
//             {path.length > 1 && (
//               <Polyline
//                 positions={path}
//                 pathOptions={{
//                   color:
//                     vehicle.status === "active"
//                       ? "lime"
//                       : vehicle.status === "delayed"
//                       ? "orange"
//                       : "gray",
//                   weight: 3,
//                   opacity: 0.7,
//                 }}
//               />
//             )}

//             {/* Direction Arrow */}
//             <Marker
//               position={[vehicle.lat, vehicle.lng]}
//               icon={arrowIcon(vehicle.heading || 0)}
//             >
//               <Popup>
//                 <div>
//                   <strong>{vehicle.driverName}</strong>
//                   <br />
//                   Speed: {vehicle.speed || 0} km/h
//                   <br />
//                   Status: {vehicle.status}
//                 </div>
//               </Popup>
//             </Marker>

//           </React.Fragment>
//         )
//       })}
//     </MapContainer>
//   )
// }

import React, { useEffect } from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
  useMap,
} from "react-leaflet"
import L from "leaflet"
import { useVehicleStore } from "../../store/vehicleStore"
import "leaflet/dist/leaflet.css"

/* Fix default icon */
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

/* Arrow icon */
const arrowIcon = (heading) =>
  L.divIcon({
    className: "vehicle-arrow",
    html: `<div style="transform: rotate(${heading}deg)">▲</div>`,
    iconSize: [20, 20],
  })

const GEOFENCE_CENTER = [12.9716, 77.5946]
const GEOFENCE_RADIUS = 2000

function FlyToSelected() {
  const selectedVehicle = useVehicleStore((state) => state.selectedVehicle)
  const map = useMap()

  useEffect(() => {
    if (selectedVehicle) {
      map.flyTo(
        [selectedVehicle.lat, selectedVehicle.lng],
        15,
        { duration: 1.5 }
      )
    }
  }, [selectedVehicle])

  return null
}

export default function MapSection() {
  const vehicles = useVehicleStore((state) => state.vehicles)
  const history = useVehicleStore((state) => state.history)

  const zoneActive = vehicles.length > 0

  return (
    <MapContainer
      center={GEOFENCE_CENTER}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyToSelected />

      {/* Intelligent Geofence */}
      <Circle
        center={GEOFENCE_CENTER}
        radius={GEOFENCE_RADIUS}
        pathOptions={{
          color: zoneActive ? "red" : "cyan",
          fillColor: zoneActive ? "red" : "cyan",
          fillOpacity: 0.2,
          weight: 3,
        }}
      />

      {vehicles.map((vehicle) => {
        const path = history?.[vehicle._id] || []

        return (
          <React.Fragment key={vehicle._id}>
            {path.length > 1 && (
              <Polyline
                positions={path}
                pathOptions={{
                  color:
                    vehicle.status === "active"
                      ? "lime"
                      : vehicle.status === "delayed"
                      ? "orange"
                      : "gray",
                  weight: 3,
                }}
              />
            )}

            <Marker
              position={[vehicle.lat, vehicle.lng]}
              icon={arrowIcon(vehicle.heading || 0)}
            >
              <Popup>
                <div>
                  <strong>{vehicle.driverName}</strong>
                  <br />
                  Speed: {vehicle.speed || 0} km/h
                  <br />
                  Status: {vehicle.status}
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        )
      })}
    </MapContainer>
  )
}