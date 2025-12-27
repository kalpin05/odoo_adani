const requests = [
  {
    id: 1,
    subject: "Test activity",
    employee: "Mitchell Admin",
    technician: "Aka Foster",
    category: "Computer",
    stage: "New Request",
    company: "My Company",
  },
]

export default function RequestsTable({ onSelect }) {
  return (
    <div className="bg-white rounded-xl border">
      <table className="w-full text-sm">
        <thead className="border-b">
          <tr className="text-left text-gray-500">
            <th className="p-3">Subject</th>
            <th>Employee</th>
            <th>Technician</th>
            <th>Category</th>
            <th>Stage</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr
              key={r.id}
              onClick={() => onSelect(r)}
              className="cursor-pointer hover:bg-gray-50"
            >
              <td className="p-3">{r.subject}</td>
              <td>{r.employee}</td>
              <td>{r.technician}</td>
              <td>{r.category}</td>
              <td>{r.stage}</td>
              <td>{r.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
