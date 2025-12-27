//single row in equipment list
export default function EquipmentRow({ item }) {
  return (
    <div
      className="grid grid-cols-7 px-4 py-3 text-sm text-gray-700 border-b hover:bg-gray-50 cursor-pointer"
      onClick={() => {
        // future: open EquipmentModal(item)
        console.log("Open equipment:", item)
      }}
    >
      <div className="font-medium">{item.name}</div>
      <div>{item.employee}</div>
      <div>{item.department}</div>
      <div className="text-gray-500">{item.serial}</div>
      <div>{item.technician}</div>
      <div>{item.category}</div>
      <div className="text-gray-500">{item.company}</div>
    </div>
  )
}
