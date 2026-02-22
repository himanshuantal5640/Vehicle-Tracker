
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import "leaflet/dist/leaflet.css"
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0F1629",
            color: "#fff",
            border: "1px solid #1f2937",
          },
        }}
      />

      {/* Main App */}
      <App />
    </>
  </React.StrictMode>
)