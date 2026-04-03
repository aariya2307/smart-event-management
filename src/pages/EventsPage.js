import React, { useEffect, useState } from "react";
import API from "../services/api";

function EventsPage() {

  const [events, setEvents] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const fetchEvents = () => {
    API.get("/events")
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    API.post("/events", { eventName: name, eventDate: date, location, description })
      .then(() => {
        setName("");
        setDate("");
        setLocation("");
        setDescription("");
        fetchEvents();
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    API.delete(`/events/${id}`)
      .then(() => fetchEvents())
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Events</h2>

      <form onSubmit={handleCreate} style={{ marginBottom: "20px" }}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
        <input value={date} onChange={e=>setDate(e.target.value)} type="date" />
        <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location" />
        <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" />
        <button type="submit">Create Event</button>
      </form>

      {events.map(event => (
        <div key={event.eventId} style={{ border: "1px solid #ccc", padding: "8px", marginBottom: "8px" }}>
          <strong>{event.eventName}</strong> ({event.eventDate})<br />
          {event.location}<br />
          {event.description}<br />
          <button onClick={() => handleDelete(event.eventId)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default EventsPage;