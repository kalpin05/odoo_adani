import { useEffect, useMemo, useState } from "react"
import EquipmentTable from "../components/equipment/EquipmentTable"
import EquipmentModal from "../components/equipment/EquipmentModal"

function mapEquipmentFromApi(row) {
  const purchaseDate = row.purchase_date
    ? new Date(row.purchase_date).toISOString().slice(0, 10)
    : "-"

  const warrantyDate = row.warranty_date
    ? new Date(row.warranty_date).toISOString().slice(0, 10)
    : "-"

  const serial = row.serial_no ? `Serial: ${row.serial_no}` : ""
  const warranty = warrantyDate !== "-" ? `Warranty: ${warrantyDate}` : ""
  const description = [serial, warranty].filter(Boolean).join(" | ") || "-"

  return {
    id: row.id,
    name: row.name ?? "-",
    category: row.department ?? "-",
    company: "-",
    technician: "-",
    employee: "-",
    usedBy: "-",
    maintenanceTeam: row.team_id ? `Team ${row.team_id}` : "-",
    assignedDate: purchaseDate,
    scrapDate: "",
    location: row.location ?? "-",
    workCenter: "-",
    description,
  }
}

export default function Equipment() {
  const [equipment, setEquipment] = useState([])
  const [selectedEquipment, setSelectedEquipment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const authHeaders = useMemo(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token")

    const headers = { "Content-Type": "application/json" }
    if (token) headers.Authorization = `Bearer ${token}`
    return headers
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadEquipment() {
      try {
        setLoading(true)
        setError("")

        const res = await fetch("/api/equipment", {
          method: "GET",
          headers: authHeaders,
        })

        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || `Request failed (${res.status})`)
        }

        const json = await res.json()
        const rows = json?.data?.equipment ?? []
        const mapped = rows.map(mapEquipmentFromApi)

        if (!cancelled) setEquipment(mapped)
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load equipment")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadEquipment()
    return () => {
      cancelled = true
    }
  }, [authHeaders])

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Equipment</h1>

        <button className="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm">
          + New
        </button>
      </div>

      {loading && (
        <div className="text-sm text-gray-600 mb-4">Loading equipment...</div>
      )}

      {error && (
        <div className="text-sm text-red-600 mb-4">
          {error}
        </div>
      )}

      <EquipmentTable data={equipment} onRowClick={setSelectedEquipment} />

      {selectedEquipment && (
        <EquipmentModal
          equipment={selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
        />
      )}
    </div>
  )
}