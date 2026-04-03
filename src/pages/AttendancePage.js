import React, { useEffect, useState } from "react";
import API from "../services/api";

function AttendancePage() {
  const [eventId, setEventId] = useState("");
  const [personId, setPersonId] = useState("");
  const [personType, setPersonType] = useState("participant");
  const [status, setStatus] = useState("present");
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const mark = e => {
    e.preventDefault();
    const payload = { eventId, personId, personType, status };
    const request = editingId
      ? API.put(`/attendance/${editingId}`, payload)
      : API.post("/attendance", payload);
    request.then(() => {
      load();
      setEditingId(null);
      setEventId("");
      setPersonId("");
      setPersonType("participant");
      setStatus("present");
    });
  };

  const load = () => {
    if(eventId){
      API.get(`/attendance/${eventId}`)
        .then(res=>setRecords(res.data))
        .catch(console.error);
    }
  };

  const handleEdit = (rec) => {
    setEditingId(rec.attendanceId);
    setEventId(rec.eventId);
    setPersonId(rec.personId);
    setPersonType(rec.personType);
    setStatus(rec.status);
  };

  const handleDelete = (id) => {
    if(window.confirm("Delete this record?")){
      API.delete(`/attendance/${id}`).then(load).catch(console.error);
    }
  };

  return (
    <div>
      <h2>Attendance</h2>
      <form onSubmit={mark}>
        <input value={eventId} placeholder="Event ID" onChange={e=>setEventId(e.target.value)} />
        <input value={personId} placeholder="Person ID" onChange={e=>setPersonId(e.target.value)} />
        <select value={personType} onChange={e=>setPersonType(e.target.value)}>
          <option value="participant">Participant</option>
          <option value="volunteer">Volunteer</option>
        </select>
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
        <button type="submit">{editingId ? "Save" : "Mark"}</button>
        {editingId && <button type="button" onClick={()=>{
          setEditingId(null);
          setEventId("");
          setPersonId("");
          setPersonType("participant");
          setStatus("present");
        }}>Cancel</button>}
      </form>
      <button onClick={load}>Load for event</button>
      <ul>
        {records.map((r,i)=><li key={i}>
          {JSON.stringify(r)} 
          <button onClick={()=>handleEdit(r)}>Edit</button>
          <button onClick={()=>handleDelete(r.attendanceId)}>Del</button>
        </li>)}
      </ul>
    </div>
  );
}

export default AttendancePage;