import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Users } from 'lucide-react';

const Teams = () => {
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const allTeams = [
    { id: 't1', name: 'Mechanical Team', skill: 'Industrial Machinery', members: 5, requests: 1, color: 'text-green-600 bg-green-100' },
    { id: 't2', name: 'Electrical Team', skill: 'Power Systems', members: 8, requests: 3, color: 'text-yellow-600 bg-yellow-100' },
    { id: 't3', name: 'IT Support Team', skill: 'Software/Hardware', members: 3, requests: 2, color: 'text-red-600 bg-red-100' },
    { id: 't4', name: 'Facilities Team', skill: 'Building Maint.', members: 4, requests: 0, color: 'text-gray-600 bg-gray-100' },
  ];

  const filteredTeams = allTeams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.skill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <span className="text-[#00C49A] font-bold text-xs uppercase tracking-wider">Teams</span>
          <h1 className="text-3xl font-bold text-gray-800">Maintenance Teams</h1>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* SEARCH INPUT */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search teams..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#00C49A] w-full transition-all"
            />
          </div>

          <button className="p-2 border border-gray-200 rounded-full bg-white text-gray-500 hover:bg-gray-50 shadow-sm transition-colors">
            <Filter className="w-4 h-4" />
          </button>

          {/* CREATE NEW TEAM BUTTON - Updated to Emerald/Teal [#00C49A] */}
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-[#00C49A] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#00ab86] transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" /> Create New Team
          </button>
        </div>
      </div>

      {/* TEAMS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <div key={team.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-800 text-lg leading-tight">{team.name}</h3>
                <p className="text-gray-400 text-xs mt-1">Skill: {team.skill}</p>
              </div>
              <button 
                onClick={() => navigate(`/teams/${team.id}`)}
                className="text-gray-400 text-sm font-medium hover:text-[#00C49A] transition-colors"
              >
                View Details
              </button>
            </div>
            
            <div className="flex items-center mt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center shadow-sm">
                    <Users className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
              <span className="ml-4 text-sm text-gray-600 font-semibold">{team.members} Members</span>
            </div>

            <div className="mt-8 pt-5 border-t border-gray-50 flex justify-end">
              <button 
                onClick={() => navigate(`/maintenance?teamId=${team.id}`)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-transform active:scale-95 shadow-sm ${team.color}`}
              >
                {team.requests} Open Requests
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE TEAM MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl scale-in-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Team</h2>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Team Name</label>
                <input type="text" placeholder="e.g. Mechanical Team" className="w-full p-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#00C49A] outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Specialization</label>
                <input type="text" placeholder="e.g. Hydraulics" className="w-full p-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#00C49A] outline-none transition-all" />
              </div>
              <div className="flex gap-4 mt-8">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 py-3.5 bg-[#00C49A] text-white rounded-2xl font-bold hover:bg-[#00ab86] transition-all shadow-lg shadow-[#00C49A]/20">
                  Create Team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;