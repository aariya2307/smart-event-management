import React, { useState } from "react";
import API from "../services/api";

function EvaluationPage() {
  const [participantId, setParticipantId] = useState("");
  const [eventId, setEventId] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  const submit = e => {
    e.preventDefault();
    API.post("/performance/evaluation", { participantId, eventId, totalScore: score })
      .then(() => setMessage("Evaluation recorded"))
      .catch(err => {
        console.error(err);
        setMessage("Failed to record");
      });
  };

  return (
    <div>
      <h2>Participant Evaluation</h2>
      {message && <p>{message}</p>}
      <form onSubmit={submit}>
        <input value={participantId} placeholder="Participant ID" onChange={e=>setParticipantId(e.target.value)} />
        <input value={eventId} placeholder="Event ID" onChange={e=>setEventId(e.target.value)} />
        <input type="number" value={score} placeholder="Score" onChange={e=>setScore(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EvaluationPage;