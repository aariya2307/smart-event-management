import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import API from "../services/api";

function ParticipantManagement() {
  const [tabIndex, setTabIndex] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // Participant form
  const [participantForm, setParticipantForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    year: "",
  });
  const [editParticipantId, setEditParticipantId] = useState(null);

  // Load data on mount
  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = () => {
    API.get("/participants")
      .then((res) => setParticipants(res.data))
      .catch((err) => {
        setMessage("Failed to load participants");
        setMessageType("error");
      });
  };

  // Handle participant form submission
  const handleParticipantSubmit = (e) => {
    e.preventDefault();
    if (!participantForm.name || !participantForm.email) {
      setMessage("Name and email are required");
      setMessageType("error");
      return;
    }

    const dataToSend = {
      ...participantForm,
      year: participantForm.year ? parseInt(participantForm.year) : null,
    };

    const promise = editParticipantId
      ? API.put(`/participants/${editParticipantId}`, dataToSend)
      : API.post("/participants", dataToSend);

    promise
      .then(() => {
        setMessage(editParticipantId ? "Participant updated successfully" : "Participant registered successfully");
        setMessageType("success");
        setParticipantForm({ name: "", email: "", phone: "", department: "", year: "" });
        setEditParticipantId(null);
        loadParticipants();
      })
      .catch((err) => {
        setMessage(err.response?.data || "Failed to save participant");
        setMessageType("error");
      });
  };

  // Handle participant deletion
  const handleDeleteParticipant = (participantId) => {
    if (window.confirm("Are you sure you want to delete this participant?")) {
      API.delete(`/participants/${participantId}`)
        .then(() => {
          setMessage("Participant deleted successfully");
          setMessageType("success");
          loadParticipants();
        })
        .catch((err) => {
          setMessage(err.response?.data || "Failed to delete participant");
          setMessageType("error");
        });
    }
  };

  // Handle participant edit
  const handleEditParticipant = (participant) => {
    setParticipantForm(participant);
    setEditParticipantId(participant.participantId);
    setTabIndex(0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Participant Management
        </Typography>
        {message && (
          <Alert severity={messageType} onClose={() => setMessage("")}>
            {message}
          </Alert>
        )}
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
          <Tab label="Register/Manage Participants" />
          <Tab label="View All Participants" />
        </Tabs>
      </Box>

      {/* Tab 1: Register/Manage Participants */}
      {tabIndex === 0 && (
        <Box>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {editParticipantId ? "Edit Participant" : "Register New Participant"}
            </Typography>
            <Box component="form" onSubmit={handleParticipantSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Full Name"
                value={participantForm.name}
                onChange={(e) => setParticipantForm({ ...participantForm, name: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Email"
                type="email"
                value={participantForm.email}
                onChange={(e) => setParticipantForm({ ...participantForm, email: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Phone"
                value={participantForm.phone}
                onChange={(e) => setParticipantForm({ ...participantForm, phone: e.target.value })}
                fullWidth
              />
              <TextField
                label="Department"
                value={participantForm.department}
                onChange={(e) => setParticipantForm({ ...participantForm, department: e.target.value })}
                fullWidth
                placeholder="e.g., Computer Science, Engineering"
              />
              <TextField
                label="Year"
                type="number"
                value={participantForm.year}
                onChange={(e) => setParticipantForm({ ...participantForm, year: e.target.value })}
                fullWidth
                inputProps={{ min: "1", max: "4" }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  {editParticipantId ? "Update Participant" : "Register Participant"}
                </Button>
                {editParticipantId && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setParticipantForm({ name: "", email: "", phone: "", department: "", year: "" });
                      setEditParticipantId(null);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>
        </Box>
      )}

      {/* Tab 2: View All Participants */}
      {tabIndex === 1 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            All Registered Participants
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Department</strong></TableCell>
                  <TableCell><strong>Year</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participants.length > 0 ? (
                  participants.map((participant) => (
                    <TableRow key={participant.participantId}>
                      <TableCell>{participant.name}</TableCell>
                      <TableCell>{participant.email}</TableCell>
                      <TableCell>{participant.phone}</TableCell>
                      <TableCell>{participant.department}</TableCell>
                      <TableCell>{participant.year}</TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEditParticipant(participant)}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteParticipant(participant.participantId)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No participants registered yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
}

export default ParticipantManagement;
