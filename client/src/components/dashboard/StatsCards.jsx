export default function StatsCards() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card color="red" title="Critical Equipment" value="5 Units" sub="Health < 30%" />
      <Card color="blue" title="Technician Load" value="85%" sub="Assign carefully" />
      <Card color="green" title="Open Requests" value="12 Pending / 3 Overdue" />
    </div>
  )
}

function Card({ color, title, value, sub }) {
  const map = {
    red: "bg-red-50 border-red-300 text-red-700",
    blue: "bg-blue-50 border-blue-300 text-blue-700",
    green: "bg-green-50 border-green-300 text-green-700",
  }

  return (
    <div className={`p-4 rounded-xl border ${map[color]}`}>
      <p className="text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-semibold">{value}</h3>
      <p className="text-xs opacity-80">{sub}</p>
    </div>
  )
}
