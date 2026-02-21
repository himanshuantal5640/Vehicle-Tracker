import React, { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { getProfile } from "../services/authService"
import { useAuthStore } from "../store/authStore"

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    getProfile()
      .then((res) => {
        setUser(res.data)
        setAuthorized(true)
      })
      .catch(() => setAuthorized(false))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-white p-10">Loading...</div>

  if (!authorized) return <Navigate to="/login" />

  return children
}