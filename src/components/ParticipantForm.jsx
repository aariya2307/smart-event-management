import React, { useState } from "react";
import API from "../services/api";

function ParticipantForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/participants", { name, email, phone })
      .then(res => {
        setMessage("Registered successfully");
        setName("");
        setEmail("");
        setPhone("");
      })
      .catch(err => {
        console.error(err);
        setMessage("Registration failed");
      });
  };

  return (
    <div>
      <h2>Participant Registration</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default ParticipantForm;