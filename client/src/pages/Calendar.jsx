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

        const res = await fetch("/api/calendar/maintenance", {
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
            : "-";

          // Backend provides only YYYY-MM-DD (no time), so everything becomes 0:00.
          // To show items in the grid, we keep hour as "0:00" by default.
          // If later backend sends time, this will automatically start using it.
          const hour = dt ? `${dt.getHours()}:00` : "0:00";

          const task = `${item?.type ?? "maintenance"} | Eq#${
            item?.equipmentId ?? "-"
          } | ${item?.status ?? "-"}`;

          return { day, hour, task };
        });

        if (!cancelled) setSchedule(formatted);
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
        style={{
          border: "1px solid #ccc",
          padding: "4px",
          minWidth: "120px",
          height: "40px",
          background: taskItem ? "#ffe6cc" : "white",
        }}
      >
        {taskItem ? <strong>{taskItem.task}</strong> : ""}
      </td>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Maintenance Calendar</h2>

      {loading ? <p>Loading...</p> : null}

      {!loading && error ? (
        <p style={{ color: "red", whiteSpace: "pre-wrap" }}>{error}</p>
      ) : null}

      {!loading && !error ? (
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  background: "#f0f0f0",
                }}
              >
                Time
              </th>

              {days.map((day) => (
                <th
                  key={day}
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    background: "#f0f0f0",
                  }}
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "6px",
                    fontWeight: "bold",
                    background: "#fafafa",
                  }}
                >
                  {hour}
                </td>

                {days.map((day) => renderCell(day, hour))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default Calendar;