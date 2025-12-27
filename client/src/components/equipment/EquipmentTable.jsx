import { useState } from "react"
import EquipmentCategoryPopup from "./EquipmentCategoryPopup";

export default function EquipmentTable({ data, onRowClick }) {
  const [openCategoryPopup, setOpenCategoryPopup] = useState(false)

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Employee</th>
            <td
              className="p-3 text-teal-600 cursor-pointer hover:underline"
              onClick={() => setOpenCategoryPopup(true)}
            >
              Monitors
            </td>

            <th className="p-3 text-left">Technician</th>
            <th className="p-3 text-left">Company</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick(item)}
              className="cursor-pointer hover:bg-gray-50 border-t"
            >
              <td className="p-3 font-medium text-gray-800">{item.name}</td>
              <td className="p-3">{item.employee}</td>
              <td className="p-3">{item.category}</td>
              <td className="p-3">{item.technician}</td>
              <td className="p-3">{item.company}</td>
            </tr>
          ))}
        </tbody>
      </table>

        <EquipmentCategoryPopup
        open={openCategoryPopup}
        onClose={() => setOpenCategoryPopup(false)}
      />
    </div>
  );
}
