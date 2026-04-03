import React from "react";
import EventChart from "../components/EventChart";
function AdminDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginTop: "20px"
      }}>

        <div style={cardStyle}>
          <h3>Total Events</h3>
          <p>12</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Volunteers</h3>
          <p>45</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Participants</h3>
          <p>300</p>
        </div>

        <div style={cardStyle}>
          <h3>Attendance Rate</h3>
          <p>92%</p>
        </div>

      </div>

    </div>
  );
}

const cardStyle = {
  backgroundColor: "#f5f5f5",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  textAlign: "center"
};

export default AdminDashboard;