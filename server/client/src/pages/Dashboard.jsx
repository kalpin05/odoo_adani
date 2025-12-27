export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dfeff0] via-[#e9edf7] to-[#f3e8f9] p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Overview of maintenance activity
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-lg border bg-white text-sm focus:outline-none"
          />
          <div className="w-9 h-9 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-semibold">
            A
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        <StatCard title="Total Equipment" value="124" />
        <StatCard title="Open Requests" value="18" />
        <StatCard title="Overdue" value="5" danger />
        <StatCard title="Preventive Scheduled" value="9" />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Recent Requests */}
        <div className="xl:col-span-2 bg-white/70 backdrop-blur rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold text-gray-700">
              Recent Maintenance Requests
            </h2>
            <button className="text-sm text-teal-600">
              View all
            </button>
          </div>

          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-2 text-left">Equipment</th>
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="py-2">Printer A1</td>
                <td>Corrective</td>
                <td className="text-yellow-600">In Progress</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">CNC Machine</td>
                <td>Preventive</td>
                <td className="text-green-600">Scheduled</td>
              </tr>
              <tr>
                <td className="py-2">Office Laptop</td>
                <td>Corrective</td>
                <td className="text-red-500">Overdue</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Reminder Card */}
        <div className="bg-gradient-to-br from-teal-500 to-emerald-400 text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              Don’t forget
            </h3>
            <p className="text-sm opacity-90 mt-2">
              You have preventive maintenance tasks scheduled this week.
            </p>
          </div>

          <button className="mt-4 bg-white text-teal-600 text-sm font-medium px-4 py-2 rounded-lg w-fit">
            View Calendar
          </button>
        </div>

      </div>
    </div>
  )
}

function StatCard({ title, value, danger }) {
  return (
    <div className="bg-white/70 backdrop-blur rounded-2xl p-5 shadow-sm">
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <h3
        className={`text-2xl font-semibold ${
          danger ? "text-red-500" : "text-gray-800"
        }`}
      >
        {value}
      </h3>
    </div>
  )
}
