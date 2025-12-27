import React, { useEffect, useState } from 'react';

const MaintainanceReports = () => {
  const [kpis, setKpis] = useState(null);
  const [teamReports, setTeamReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        setError('');

        const [kpiRes, teamRes] = await Promise.all([
          fetch('/api/reports/dashboard'),
          fetch('/api/reports/requests-by-team')
        ]);

        if (!kpiRes.ok || !teamRes.ok) {
          throw new Error('Failed to load reports');
        }

        const kpiData = await kpiRes.json();
        const teamData = await teamRes.json();

        setKpis(kpiData.data);
        setTeamReports(teamData.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center text-gray-500">Loading reports...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Maintenance Reports</h1>
        <p className="text-gray-600 mt-2">Comprehensive analytics and KPIs for maintenance operations</p>
      </div>

      {/* KPI Cards */}
      {kpis && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Requests</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">{kpis.totalRequests}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Open Requests</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">{kpis.openRequests}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">In Progress</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{kpis.inProgressRequests}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Completed</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{kpis.completedRequests}</p>
          </div>
        </div>
      )}

      {/* Average Repair Time */}
      {kpis && (
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Average Repair Time</h3>
          <div className="text-4xl font-bold text-[#00C49A]">{kpis.avgRepairTimeHours} hours</div>
          <p className="text-gray-600 mt-2">Average time to complete maintenance requests</p>
        </div>
      )}

      {/* Team Performance */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Team Performance</h3>
          <p className="text-gray-600">Requests handled by each maintenance team</p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Team Name</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Total Requests</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Completed</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-700">Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                {teamReports.map((team, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-800">{team.teamName}</td>
                    <td className="py-3 px-4 text-center">{team.totalRequests}</td>
                    <td className="py-3 px-4 text-center text-green-600">{team.completed}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        (team.completed / team.totalRequests * 100) >= 80
                          ? 'bg-green-100 text-green-800'
                          : (team.completed / team.totalRequests * 100) >= 60
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {team.totalRequests > 0 ? Math.round((team.completed / team.totalRequests) * 100) : 0}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintainanceReports;