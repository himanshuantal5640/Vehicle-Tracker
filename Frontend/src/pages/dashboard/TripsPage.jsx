import React from "react"
import TripForm from "../../components/trips/TripForm"
import TripTable from "../../components/trips/TripTable"

export default function TripsPage() {
  return (
    <div className="p-6">
      <TripForm />
      <TripTable />
    </div>
  )
}