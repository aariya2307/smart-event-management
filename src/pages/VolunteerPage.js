import React, { useEffect, useState } from "react";
import API from "../services/api";

function VolunteerPage() {
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [duties, setDuties] = useState([]);

  const [volunteerId, setVolunteerId] = useState("");
  const [eventId, setEventId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    API.get("/volunteers").then(res => setVolunteers(res.data)).catch(console.error);
    API.get("/events").then(res => setEvents(res.data)).catch(console.error);
    API.get("/duties").then(res => setDuties(res.data)).catch(console.error);
  }, []);

  const handleAssign = e => {
    e.preventDefault();
    API.post("/duties", { volunteerId, eventId, dutyTitle: title, dutyDescription: description })
      .then(() => {
        setTitle("");
        setDescription("");
        setVolunteerId("");
        setEventId("");
        return API.get("/duties");
      })
      .then(res => setDuties(res.data))
      .catch(console.error);
  };

  return (
    <div>
      <h2>Volunteer Assignment</h2>
      <form onSubmit={handleAssign}>
        <select value={volunteerId} onChange={e=>setVolunteerId(e.target.value)}>
          <option value="">Select volunteer</option>
          {volunteers.map(v=> <option key={v.volunteerId} value={v.volunteerId}>{v.name}</option>)}
        </select>
        <select value={eventId} onChange={e=>setEventId(e.target.value)}>
          <option value="">Select event</option>
          {events.map(ev=> <option key={ev.eventId} value={ev.eventId}>{ev.eventName}</option>)}
        </select>
        <input value={title} placeholder="Duty title" onChange={e=>setTitle(e.target.value)} />
        <input value={description} placeholder="Duty description" onChange={e=>setDescription(e.target.value)} />
        <button type="submit">Assign</button>
      </form>

      <h3>Assigned Duties</h3>
      <ul>
        {duties.map(d => (
          <li key={d.dutyId}>{`Volunteer ${d.volunteerId} -> Event ${d.eventId}: ${d.dutyTitle}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default VolunteerPage;