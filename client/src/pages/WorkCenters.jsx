import React, { useState } from 'react';
import { workCenters } from '../components/workcenter/workCenterData';
import WorkCenterModal from '../components/workcenter/WorkCenterModal';

const WorkCenters = () => {
  const [selectedWorkCenter, setSelectedWorkCenter] = useState(null);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Work Centers</h1>
        <p className="text-gray-600 mt-2">Manage production work centers and their configurations</p>
      </div>

      {/* Work Centers Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="border-b">
                <th className="text-left py-4 px-6 font-medium text-gray-700">Work Center</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Code</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Tag</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Alternative</th>
                <th className="text-right py-4 px-6 font-medium text-gray-700">Cost / hr</th>
                <th className="text-right py-4 px-6 font-medium text-gray-700">Capacity</th>
                <th className="text-right py-4 px-6 font-medium text-gray-700">OEE Target</th>
                <th className="text-center py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workCenters.map((center) => (
                <tr key={center.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-800">{center.name}</td>
                  <td className="py-4 px-6 text-gray-600">{center.code}</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {center.tag}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{center.alternative}</td>
                  <td className="py-4 px-6 text-right font-medium">${center.costPerHour.toFixed(2)}</td>
                  <td className="py-4 px-6 text-right">{center.capacityEfficiency}%</td>
                  <td className="py-4 px-6 text-right font-medium">{center.oeeTarget.toFixed(2)}%</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => setSelectedWorkCenter(center)}
                      className="px-3 py-1 bg-[#00C49A] text-white rounded-lg text-sm hover:bg-[#00ab86] transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Work Center Modal */}
      {selectedWorkCenter && (
        <WorkCenterModal
          open={!!selectedWorkCenter}
          onClose={() => setSelectedWorkCenter(null)}
          data={selectedWorkCenter}
        />
      )}
    </div>
  );
};

export default WorkCenters;