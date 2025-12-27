import { useEffect, useState } from "react"

const statusStyles = {
  new: "bg-gray-100 text-gray-700",
  in_progress: "bg-blue-100 text-blue-700",
  repaired: "bg-green-100 text-green-700",
  scrap: "bg-red-100 text-red-700",
}

export default function RequestsTable({ onSelect }) {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false

    async function loadRequests() {
      try {
        setLoading(true)
        setError("")

        const res = await fetch("/api/maintenance-requests", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })

        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || `Request failed (${res.status})`)
        }

        const json = await res.json()
        const rows = json?.data?.requests ?? []

        if (!cancelled) setRequests(rows)
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load requests")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadRequests()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return <div className="text-sm text-gray-500 p-4">Loading requests...</div>
  if (error) return <div className="text-sm text-red-500 p-4">{error}</div>

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b text-gray-600">
          <tr>
            <th className="p-3 text-left">Subject</th>
            <th className="text-left">Equipment</th>
            <th className="text-left">Technician</th>
            <th className="text-left">Type</th>
            <th className="text-left">Status</th>
            <th className="text-left">Team</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => (
            <tr
              key={r.id}
              onClick={() => onSelect(r)}
              className="cursor-pointer hover:bg-blue-50 transition"
            >
              <td className="p-3 font-medium">{r.subject ?? "-"}</td>
              <td>{r.equipment_name ?? "-"}</td>
              <td>{r.technician_name ?? "Unassigned"}</td>
              <td>{r.request_type ?? "-"}</td>
              <td>
                <span className={`px-2 py-1 rounded-full text-xs ${statusStyles[r.stage] || "bg-gray-100 text-gray-700"}`}>
                  {r.stage ?? "-"}
                </span>
              </td>
              <td>{r.team_name ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}