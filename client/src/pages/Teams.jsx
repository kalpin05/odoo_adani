import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Users } from 'lucide-react';

const Teams = () => {
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadTeams() {
      try {
        setLoading(true);
        setError('');

        const res = await fetch('/api/teams', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Request failed (${res.status})`);
        }

        const json = await res.json();
        const rows = json?.data?.teams ?? [];

        if (!cancelled) setTeams(rows);
      } catch (e) {
        if (!cancelled) setError(e?.message || 'Failed to load teams');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadTeams();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredTeams = teams.filter(team => 
    team.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    if (!name) return;

    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed (${res.status})`);
      }

      const json = await res.json();
      setTeams(prev => [...prev, json?.data?.team]);
      setShowCreateModal(false);
    } catch (err) {
      alert(err?.message || 'Failed to create team');
    }
  };

  if (loading) return <div className="p-8 text-sm text-gray-500">Loading teams...</div>;
  if (error) return <div className="p-8 text-sm text-red-500">{error}</div>;

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

          {/* CREATE NEW TEAM BUTTON */}
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
                <p className="text-gray-400 text-xs mt-1">Members: {team.member_count ?? 0}</p>
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
              <span className="ml-4 text-sm text-gray-600 font-semibold">{team.member_count ?? 0} Members</span>
            </div>

            <div className="mt-8 pt-5 border-t border-gray-50 flex justify-end">
              <button 
                onClick={() => navigate('/')}
                className="px-4 py-1.5 rounded-full text-xs font-bold transition-transform active:scale-95 shadow-sm text-gray-600 bg-gray-100"
              >
                View Requests
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE TEAM MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-semibold mb-4">Create New Team</h3>
            <form onSubmit={handleCreateTeam}>
              <input 
                name="name" 
                placeholder="Team Name" 
                required 
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00C49A]" 
              />
              <div className="flex justify-end gap-2 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowCreateModal(false)} 
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-[#00C49A] text-white rounded-lg hover:bg-[#00ab86] transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;