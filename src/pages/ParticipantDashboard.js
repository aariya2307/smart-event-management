import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ParticipantDashboard() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    API.get("/participants")
      .then(res => setParticipants(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Participants</h2>
      <Link to="/register">Register new participant</Link>
      <ul>
        {participants.map(p => (
          <li key={p.participantId}>{p.name} ({p.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default ParticipantDashboard;