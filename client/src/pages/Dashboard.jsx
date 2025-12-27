import { useState } from "react"
import StatsCards from "../components/dashboard/StatsCards"
import RequestsTable from "../components/dashboard/RequestsTable"
import MaintenanceRequestModal from "../components/maintenance/MaintenanceRequestModal"

const dummyRequests = [
  {
    id: 1,
    subject: "Test activity",
    status: "In Progress",
    equipment: "Acer Laptop",
    category: "Computers",
    technician: "Aka Foster",
    priority: "High",
    scheduledAt: "2025-12-28 14:30",
    notes: "Screen flickering issue",
  },
  {
    id: 2,
    subject: "Battery replacement",
    status: "New",
    equipment: "HP Elitebook",
    category: "Computers",
    technician: "Unassigned",
    priority: "Medium",
    scheduledAt: null,
    notes: "",
  },
]

export default function Dashboard() {
  const [selectedRequest, setSelectedRequest] = useState(null)

  return (
    <div className="space-y-6">
      <StatsCards />
      <RequestsTable
        data={dummyRequests}
        onSelect={setSelectedRequest}
      />

      {selectedRequest && (
        <MaintenanceRequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  )
}
