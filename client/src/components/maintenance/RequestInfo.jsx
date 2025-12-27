export default function RequestInfo({ request }) {
  return (
    <div className="grid grid-cols-2 gap-6 p-4">
      <Field label="Equipment" value={request.equipment} />
      <Field label="Category" value={request.category} />
      <Field label="Technician" value={request.technician} />
      <Field label="Priority" value={request.priority} />
      <Field label="Scheduled At" value={request.scheduledAt || "Not scheduled"} />
    </div>
  )
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}
