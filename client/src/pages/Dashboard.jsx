import { useState } from "react"
import { useNavigate } from "react-router-dom"
import StatsCards from "../components/dashboard/StatsCards"
import RequestsTable from "../components/dashboard/RequestsTable"
import MaintenanceRequestModal from "../components/maintenance/MaintenanceRequestModal"

export default function Dashboard() {
  const [selectedRequest, setSelectedRequest] = useState(null)
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm"
        >
          + New
        </button>
      </div>

      <StatsCards />

      {/* Requests Section */}
      <section className="bg-white rounded-2xl border shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Maintenance Requests
          </h2>
          <p className="text-sm text-gray-500">
            Click a request to view full details
          </p>
        </div>

        {/* Table */}
        <div className="p-4">
          <RequestsTable
            onSelect={(r) => {
              console.log("ROW CLICKED:", r)
              setSelectedRequest(r)
            }}
          />
        </div>
      </section>

      {/* Maintenance Request Modal */}
      {selectedRequest && (
        <MaintenanceRequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  )
}