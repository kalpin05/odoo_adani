//popup modal to show equipment details

export default function EquipmentModal({ equipment, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[720px] rounded-xl p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {equipment.name}
        </h2>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          <Info label="Category" value={equipment.category} />
          <Info label="Company" value={equipment.company} />
          <Info label="Technician" value={equipment.technician} />
          <Info label="Employee" value={equipment.employee} />
          <Info label="Used By" value={equipment.usedBy} />
          <Info label="Work Center" value={equipment.workCenter} />
          <Info label="Location" value={equipment.location} />
          <Info label="Maintenance Team" value={equipment.maintenanceTeam} />
          <Info label="Assigned Date" value={equipment.assignedDate} />
          <Info label="Scrap Date" value={equipment.scrapDate || "-"} />
        </div>

        {/* Description */}
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700 mb-1">
            Description
          </p>
          <p className="text-sm text-gray-600">
            {equipment.description}
          </p>
        </div>
      </div>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  )
}
