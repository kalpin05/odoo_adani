export default function RequestHeader({ request, onClose }) {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div>
        <h2 className="text-lg font-semibold">{request.subject}</h2>
        <p className="text-sm text-gray-500">
          New → In Progress → Repaired → Scrap
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
          {request.status}
        </span>
        <button onClick={onClose} className="text-gray-400 hover:text-black">
          ✕
        </button>
      </div>
    </div>
  )
}
