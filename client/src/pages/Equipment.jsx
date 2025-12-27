import { useState } from "react"
import EquipmentTable from "../components/equipment/EquipmentTable"
import EquipmentModal from "../components/equipment/EquipmentModal"


const EQUIPMENT_DATA = [
  {
    id: 1,
    name: "Samsung Monitor 15\"",
    category: "Monitors",
    company: "My Company (San Francisco)",
    technician: "Mitchell Admin",
    employee: "Abigail Peterson",
    usedBy: "Employee",
    maintenanceTeam: "Internal Maintenance",
    assignedDate: "2025-12-24",
    scrapDate: "",
    location: "Office - SF",
    workCenter: "Main IT",
    description: "Primary monitor used by design team.",
  },
  {
    id: 2,
    name: "Acer Laptop",
    category: "Computers",
    company: "My Company (San Francisco)",
    technician: "Marc Demo",
    employee: "Bhaumik P",
    usedBy: "Employee",
    maintenanceTeam: "Internal Maintenance",
    assignedDate: "2025-11-18",
    scrapDate: "",
    location: "Engineering Floor",
    workCenter: "Hardware",
    description: "Development laptop.",
  },
]


export default function Equipment() {
  const [selectedEquipment, setSelectedEquipment] = useState(null)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Equipment
        </h1>
        <button className="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm">
          + New
        </button>
      </div>

      {/* Table */}
      <EquipmentTable
        data={EQUIPMENT_DATA}
        onRowClick={setSelectedEquipment}
      />

      {/* Popup */}
      {selectedEquipment && (
        <EquipmentModal
          equipment={selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
        />
      )}
    </div>
  )
}
