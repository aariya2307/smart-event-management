import React, { useEffect, useState } from "react";
import API from "../services/api";

function ReportsPage() {
  const [events, setEvents] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    API.get("/events").then(res => setEvents(res.data)).catch(console.error);
    API.get("/participants").then(res => setParticipants(res.data)).catch(console.error);
    API.get("/attendance").then(res => setAttendance(res.data)).catch(console.error);
    API.get("/performance/evaluation/1").then(res => setEvaluations(res.data)).catch(console.error); // example event 1
  }, []);

  return (
    <div>
      <h2>Reports</h2>
      <div>
        <h3>Event Participation: {events.length} events</h3>
        <h3>Total Participants: {participants.length}</h3>
        <h3>Attendance Records: {attendance.length}</h3>
        <h3>Evaluations: {evaluations.length}</h3>
      </div>
    </div>
  );
}

export default ReportsPage;