import { useState } from "react";
import { workCenters } from "@/components/workcenter/workCenterData";
import WorkCenterModal from "@/components/workcenter/WorkCenterModal";

export default function WorkCenter() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="border-b text-left text-sm text-gray-500">
            <th className="p-3">Work Center</th>
            <th className="p-3">Code</th>
            <th className="p-3">Tag</th>
            <th className="p-3">Cost / hr</th>
            <th className="p-3">OEE Target</th>
          </tr>
        </thead>

        <tbody>
          {workCenters.map((wc) => (
            <tr
              key={wc.id}
              onClick={() => setSelected(wc)}
              className="cursor-pointer border-b hover:bg-gray-50"
            >
              <td className="p-3 font-medium">{wc.name}</td>
              <td className="p-3">{wc.code}</td>
              <td className="p-3">{wc.tag}</td>
              <td className="p-3">{wc.costPerHour}</td>
              <td className="p-3">{wc.oeeTarget}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <WorkCenterModal
        open={!!selected}
        data={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
