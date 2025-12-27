import { useEffect, useState } from "react"

export default function StatsCards() {
  const [stats, setStats] = useState({
    criticalEquipment: 0,
    technicianLoad: "0%",
    openRequests: 0,
    overdueRequests: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false

    async function loadStats() {
      try {
        setLoading(true)
        setError("")

        const res = await fetch("/api/stats", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })

        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || `Request failed (${res.status})`)
        }

        const json = await res.json()
        const data = json?.data ?? {}

        if (!cancelled) {
          setStats({
            criticalEquipment: data.criticalEquipment ?? 0,
            technicianLoad: `${data.technicianLoad ?? 0}%`,
            openRequests: data.openRequests ?? 0,
            overdueRequests: data.overdueRequests ?? 0,
          })
        }
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load stats")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadStats()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return <div className="grid grid-cols-3 gap-4"><div className="text-sm text-gray-500">Loading stats...</div></div>
  if (error) return <div className="grid grid-cols-3 gap-4"><div className="text-sm text-red-500">{error}</div></div>

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card color="red" title="Critical Equipment" value={`${stats.criticalEquipment} Units`} sub="Health < 30%" />
      <Card color="blue" title="Technician Load" value={stats.technicianLoad} sub="Assign carefully" />
      <Card color="green" title="Open Requests" value={`${stats.openRequests} Pending / ${stats.overdueRequests} Overdue`} />
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