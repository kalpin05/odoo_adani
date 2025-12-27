export default function WorkCenterModal({ open, onClose, data }) {
  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[720px] rounded-xl bg-white p-6 shadow-xl">
        
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b pb-3">
          <h2 className="text-lg font-semibold text-gray-800">
            Work Center — {data.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          <Field label="Work Center" value={data.name} />
          <Field label="Code" value={data.code} />
          <Field label="Tag" value={data.tag} />
          <Field label="Alternative Work Center" value={data.alternative} />
          <Field label="Cost per Hour" value={`${data.costPerHour.toFixed(2)}`} />
          <Field
            label="Capacity Time Efficiency"
            value={`${data.capacityEfficiency}%`}
          />
          <Field label="OEE Target" value={`${data.oeeTarget}%`} />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-1 font-medium text-gray-800">{value}</p>
    </div>
  );
}
