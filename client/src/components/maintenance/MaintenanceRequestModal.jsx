import { useState } from "react"
import EquipmentModal from "../equipment/EquipmentModal"
import WorkCenterModal from "../workcenter/WorkCenterModal"

export default function MaintenanceRequestModal({ request, onClose }) {

  const [maintenanceFor, setMaintenanceFor] = useState(request.maintenanceForType)
const [openEquipment, setOpenEquipment] = useState(false)
const [openWorkCenter, setOpenWorkCenter] = useState(false)

  return (
    <>
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={onClose} />

      {/* MAIN REQUEST POPUP */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white w-[900px] rounded-xl shadow-xl p-6 relative">

          {/* HEADER */}
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h2 className="text-xl font-semibold">{request.subject}</h2>
              <p className="text-sm text-gray-500">Maintenance Request</p>
            </div>

            <button onClick={onClose} className="text-gray-400 hover:text-black">
              ✕
            </button>
          </div>

          {/* BODY */}
          <div className="grid grid-cols-2 gap-6 py-6">

            {/* LEFT */}
            <div className="space-y-4">
              <Info label="Created By" value={request.createdBy} />
              <Info label="Category" value={request.category} />
              <Info label="Request Date" value={request.requestDate} />

              {/* Maintenance For */}
              <label className="text-sm font-medium">Maintenance For</label>

<select
  value={maintenanceFor}
  onChange={(e) => {
    const value = e.target.value
    setMaintenanceFor(value)

    // reset both first
    setOpenEquipment(false)
    setOpenWorkCenter(false)
  }}
  className="mt-1 w-full rounded-lg border px-3 py-2 text-base"
>
  <option value="equipment">Equipment</option>
  <option value="workcenter">Work Center</option>
</select>

{maintenanceFor === "equipment" && (
  <button
    onClick={() => setOpenEquipment(true)}
    className="text-left underline text-blue-600 hover:text-blue-800"
  >
    {request.equipment}
  </button>
)}
{maintenanceFor === "workcenter" && (
  <button
    onClick={() => setOpenWorkCenter(true)}
    className="text-left underline text-blue-600 hover:text-blue-800"
  >
    {request.workCenter}
  </button>
)}
{openEquipment && (
  <EquipmentModal
    equipment={request.equipment}
    onClose={() => setOpenEquipment(false)}
  />
)}

{openWorkCenter && (
  <WorkCenterModal
    workCenter={request.workCenter}
    onClose={() => setOpenWorkCenter(false)}
  />
)}



              {/* CLICKABLE FIELD */}
              {request.maintenanceForType === "equipment" && (
                <Clickable
                  label="Equipment"
                  value={request.equipment}
                  onClick={() => setOpenEquipment(true)}
                />
              )}

              {request.maintenanceForType === "workcenter" && (
                <Clickable
                  label="Work Center"
                  value={request.workCenter}
                  onClick={() => setOpenWorkCenter(true)}
                />
              )}
            </div>

            {/* RIGHT */}
            <div className="space-y-4">
              <Info label="Team" value={request.team} />
              <Info label="Technician" value={request.technician} />
              <Info label="Scheduled Date" value={request.scheduledDate} />
              <Info label="Duration" value={request.duration} />
              <Info label="Company" value={request.company} />

              {/* PRIORITY */}
              <div>
                <p className="text-xs text-gray-500 mb-1">Priority</p>
                <div className="flex gap-1">
                  {[1, 2, 3].map((p) => (
                    <span
                      key={p}
                      className={`h-4 w-4 rotate-45 ${
                        p <= request.priority
                          ? "bg-blue-600"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* NOTES */}
          <div className="border-t pt-4">
            <p className="text-xs text-gray-500 mb-1">Notes</p>
            <p className="text-sm text-gray-700">{request.notes}</p>
          </div>
        </div>
      </div>

      {/* CHILD MODALS */}
      {openEquipment && (
        <EquipmentModal
          equipment={request.equipment}
          onClose={() => setOpenEquipment(false)}
        />
      )}

      {openWorkCenter && (
        <WorkCenterModal
          workCenter={request.workCenter}
          onClose={() => setOpenWorkCenter(false)}
        />
      )}
    </>
  )
}
function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  )
}

function Clickable({ label, value, onClick }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <button
        onClick={onClick}
        className="w-full text-left border rounded-md px-3 py-2 hover:bg-gray-50 text-blue-600"
      >
        {value}
      </button>
    </div>
  )
}
