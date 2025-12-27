import { useState } from "react"
import { useNavigate } from "react-router-dom"
import StatsCards from "../components/dashboard/StatsCards"
import RequestsTable from "../components/dashboard/RequestsTable"
import MaintenanceRequestModal from "../components/maintenance/MaintenanceRequestModal"
import StatsCards from "../components/dashboard/StatsCards"

export default function Dashboard() {
  const [selectedRequest, setSelectedRequest] = useState(null)
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <StatsCards />
    </section>

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
  </div>

  {/* Maintenance Request Modal */}
  {selectedRequest && (
    <MaintenanceRequestModal
      request={selectedRequest}
      onClose={() => setSelectedRequest(null)}
    />
  )}
</>

  )
}