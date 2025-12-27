const requests = [
  {
    id: "REQ-001",
    subject: "Test activity",
    status: "In Progress",
    breadcrumbs: ["New Request", "In Progress", "Repaired", "Scrap"],

    createdBy: "Mitchell Admin",
    maintenanceForType: "equipment", // "equipment" | "workcenter"

    equipment: "Acer Laptop / LP / 203 / 19281928",
    workCenter: "Assembly 1",

    category: "Computers",
    requestDate: "12/18/2025",
    maintenanceType: "Corrective",

    team: "Internal Maintenance",
    technician: "Aka Foster",

    scheduledDate: "12/28/2025 14:30",
    duration: "00:00 hours",
    priority: 2,

    company: "My Company (San Francisco)",
    notes: "Device randomly shuts down during heavy load.",
  },
]


const statusStyles = {
  "New Request": "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Repaired: "bg-green-100 text-green-700",
  Scrap: "bg-red-100 text-red-700",
}

export default function RequestsTable({ onSelect }) {
  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b text-gray-600">
          <tr>
            <th className="p-3 text-left">Subject</th>
            <th className="text-left">Created By</th>
            <th className="text-left">Technician</th>
            <th className="text-left">Category</th>
            <th className="text-left">Status</th>
            <th className="text-left">Company</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => (
            <tr
              key={r.id}
              onClick={() => onSelect(r)}
              className="cursor-pointer hover:bg-blue-50 transition"
            >
              <td className="p-3 font-medium">{r.subject}</td>
              <td>{r.createdBy}</td>
              <td>{r.technician}</td>
              <td>{r.category}</td>
              <td>
                <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                  {r.status}
                </span>
              </td>
              <td>{r.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}