export default function EquipmentCategoryPopup({ open, onClose }) {
  if (!open) return null

  const categories = [
    {
      name: "Computers",
      responsible: "OdooBot",
      company: "My Company (San Francisco)",
    },
    {
      name: "Software",
      responsible: "OdooBot",
      company: "My Company (San Francisco)",
    },
    {
      name: "Monitors",
      responsible: "Mitchell Admin",
      company: "My Company (San Francisco)",
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-[600px] rounded-xl shadow-lg p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Equipment Categories
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Responsible</th>
                <th className="p-3 text-left">Company</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">{cat.name}</td>
                  <td className="p-3">{cat.responsible}</td>
                  <td className="p-3">{cat.company}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
