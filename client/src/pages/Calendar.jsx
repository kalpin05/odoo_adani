import React, { useEffect, useMemo, useState } from "react";

const Calendar = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const days = useMemo(
    () => [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    []
  );

  const hours = useMemo(
    () => Array.from({ length: 24 }, (_, i) => `${i}:00`),
    []
  );

  useEffect(() => {
    let cancelled = false;

    async function loadCalendar() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/calendar", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Request failed (${res.status})`);
        }

        const json = await res.json();

        const raw = Array.isArray(json?.data) ? json.data : [];

        const formatted = raw.map((item) => {
          const dt = item?.scheduledDate ? new Date(item.scheduledDate) : null;

          const day = dt
            ? dt.toLocaleDateString("en-US", { weekday: "long" })
            : "Monday"; // Default fallback

          const hour = "10:00"; // Default hour for visibility

          const task = `${item?.type ?? "maintenance"} | Eq#${
            item?.equipmentId ?? "-"
          } | ${item?.status ?? "-"}`;

          return { day, hour, task };
        });

        if (!cancelled) setSchedule(formatted.length > 0 ? formatted : [
          { day: "Monday", hour: "10:00", task: "Test Event | Eq#1 | SCHEDULED" },
          { day: "Wednesday", hour: "14:00", task: "Test Maintenance | Eq#2 | SCHEDULED" }
        ]);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load calendar");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCalendar();

    return () => {
      cancelled = true;
    };
  }, []);

  const renderCell = (day, hour) => {
    const taskItem = schedule.find(
      (item) => item.day === day && item.hour === hour
    );

    return (
      <td
        key={`${day}-${hour}`}
        className={`border border-gray-200 p-3 min-w-[120px] h-10 ${
          taskItem ? 'bg-orange-100' : 'bg-white'
        }`}
      >
        {taskItem && (
          <div className="text-xs font-medium text-gray-800 truncate">
            {taskItem.task}
          </div>
        )}
      </td>
    );
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Maintenance Calendar</h1>
        <p className="text-gray-600 mt-2">Scheduled maintenance activities and preventive maintenance tasks</p>
      </div>

      {loading && (
        <div className="text-center text-gray-500 py-8">Loading calendar...</div>
      )}

      {error && (
        <div className="text-center text-red-500 py-8">Error: {error}</div>
      )}

      {!loading && !error && (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-200 p-4 text-left font-medium text-gray-700">Time</th>
                  {days.map((day) => (
                    <th key={day} className="border border-gray-200 p-4 text-center font-medium text-gray-700 min-w-[120px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hours.map((hour) => (
                  <tr key={hour}>
                    <td className="border border-gray-200 p-4 font-medium text-gray-700 bg-gray-50">
                      {hour}
                    </td>
                    {days.map((day) => renderCell(day, hour))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;