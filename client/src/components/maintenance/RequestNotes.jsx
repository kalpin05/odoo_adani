export default function RequestNotes({ request }) {
  return (
    <div className="p-4 border-t">
      <div className="flex gap-4 mb-2">
        <button className="font-medium">Notes</button>
        <button className="text-gray-400">Instructions</button>
      </div>

      <textarea
        className="w-full border rounded-lg p-2 text-sm"
        rows={4}
        placeholder="Add notes..."
        defaultValue={request.notes}
      />
    </div>
  )
}
