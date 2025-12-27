export default function CategoryModal({ category, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-[600px] rounded-xl p-6">
        
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Equipment Category
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-4 text-sm">
          <Row label="Name" value={category.name} />
          <Row label="Responsible" value={category.responsible} />
          <Row label="Company" value={category.company} />
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}
