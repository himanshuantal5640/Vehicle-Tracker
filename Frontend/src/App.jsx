import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import VerifyOTP from "./pages/VerifyOTP"
import DashboardHome from "./pages/dashboard/DashboardHome"
import DashboardAlerts from "./pages/dashboard/DashboardAlerts"
import ProtectedRoute from "./routes/ProtectedRoute"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/alerts"
          element={
            <ProtectedRoute>
              <DashboardAlerts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}