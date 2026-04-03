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

function VolunteerManagement() {
  const [tabIndex, setTabIndex] = useState(0);
  const [volunteers, setVolunteers] = useState([]);
  const [events, setEvents] = useState([]);
  const [duties, setDuties] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // Volunteer form
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
  });
  const [editVolunteerId, setEditVolunteerId] = useState(null);

  // Duty form
  const [dutyForm, setDutyForm] = useState({
    volunteerId: "",
    eventId: "",
    role: "",
  });
  const [openDutyDialog, setOpenDutyDialog] = useState(false);

  // Load data on mount
  useEffect(() => {
    loadVolunteers();
    loadEvents();
    loadDuties();
  }, []);

  const loadVolunteers = () => {
    API.get("/volunteers")
      .then((res) => setVolunteers(res.data))
      .catch((err) => {
        setMessage("Failed to load volunteers");
        setMessageType("error");
      });
  };

  const loadEvents = () => {
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => {
        setMessage("Failed to load events");
        setMessageType("error");
      });
  };

  const loadDuties = () => {
    API.get("/duties")
      .then((res) => setDuties(res.data))
      .catch((err) => {
        setMessage("Failed to load duties");
        setMessageType("error");
      });
  };

  // Handle volunteer form submission
  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    if (!volunteerForm.name || !volunteerForm.email) {
      setMessage("Name and email are required");
      setMessageType("error");
      return;
    }

    const promise = editVolunteerId
      ? API.put(`/volunteers/${editVolunteerId}`, volunteerForm)
      : API.post("/volunteers", volunteerForm);

    promise
      .then(() => {
        setMessage(editVolunteerId ? "Volunteer updated successfully" : "Volunteer added successfully");
        setMessageType("success");
        setVolunteerForm({ name: "", email: "", phone: "", skills: "" });
        setEditVolunteerId(null);
        loadVolunteers();
      })
      .catch((err) => {
        setMessage(err.response?.data || "Failed to save volunteer");
        setMessageType("error");
      });
  };

  // Handle duty submission
  const handleDutySubmit = () => {
    if (!dutyForm.volunteerId || !dutyForm.eventId || !dutyForm.role) {
      setMessage("Please fill all fields");
      setMessageType("error");
      return;
    }

    API.post("/duties", dutyForm)
      .then(() => {
        setMessage("Duty assigned successfully");
        setMessageType("success");
        setDutyForm({ volunteerId: "", eventId: "", role: "" });
        setOpenDutyDialog(false);
        loadDuties();
      })
      .catch((err) => {
        setMessage(err.response?.data || "Failed to assign duty");
        setMessageType("error");
      });
  };

  // Handle volunteer deletion
  const handleDeleteVolunteer = (volunteerId) => {
    if (window.confirm("Are you sure you want to delete this volunteer?")) {
      API.delete(`/volunteers/${volunteerId}`)
        .then(() => {
          setMessage("Volunteer deleted successfully");
          setMessageType("success");
          loadVolunteers();
        })
        .catch((err) => {
          setMessage(err.response?.data || "Failed to delete volunteer");
          setMessageType("error");
        });
    }
  };

  // Handle volunteer edit
  const handleEditVolunteer = (volunteer) => {
    setVolunteerForm(volunteer);
    setEditVolunteerId(volunteer.volunteerId);
    setTabIndex(0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Volunteer Management
        </Typography>
        {message && (
          <Alert severity={messageType} onClose={() => setMessage("")}>
            {message}
          </Alert>
        )}
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
          <Tab label="Add/Manage Volunteers" />
          <Tab label="Assign Duties" />
          <Tab label="View Assignments" />
        </Tabs>
      </Box>

      {/* Tab 1: Add/Manage Volunteers */}
      {tabIndex === 0 && (
        <Box>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {editVolunteerId ? "Edit Volunteer" : "Add New Volunteer"}
            </Typography>
            <Box component="form" onSubmit={handleVolunteerSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Volunteer Name"
                value={volunteerForm.name}
                onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Email"
                type="email"
                value={volunteerForm.email}
                onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Phone"
                value={volunteerForm.phone}
                onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                fullWidth
              />
              <TextField
                label="Skills"
                value={volunteerForm.skills}
                onChange={(e) => setVolunteerForm({ ...volunteerForm, skills: e.target.value })}
                fullWidth
                multiline
                rows={3}
                placeholder="Comma-separated skills"
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  {editVolunteerId ? "Update Volunteer" : "Add Volunteer"}
                </Button>
                {editVolunteerId && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setVolunteerForm({ name: "", email: "", phone: "", skills: "" });
                      setEditVolunteerId(null);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </Box>
            </Box>
          </Paper>

          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              All Volunteers
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Phone</strong></TableCell>
                    <TableCell><strong>Skills</strong></TableCell>
                    <TableCell align="center"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {volunteers.map((volunteer) => (
                    <TableRow key={volunteer.volunteerId}>
                      <TableCell>{volunteer.name}</TableCell>
                      <TableCell>{volunteer.email}</TableCell>
                      <TableCell>{volunteer.phone}</TableCell>
                      <TableCell>{volunteer.skills}</TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEditVolunteer(volunteer)}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteVolunteer(volunteer.volunteerId)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}

      {/* Tab 2: Assign Duties */}
      {tabIndex === 1 && (
        <Box>
          <Paper sx={{ p: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenDutyDialog(true)}
              sx={{ mb: 2 }}
            >
              Assign New Duty
            </Button>

            <Dialog open={openDutyDialog} onClose={() => setOpenDutyDialog(false)} maxWidth="sm" fullWidth>
              <DialogTitle>Assign Volunteer to Duty</DialogTitle>
              <DialogContent sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  select
                  label="Select Volunteer"
                  value={dutyForm.volunteerId}
                  onChange={(e) => setDutyForm({ ...dutyForm, volunteerId: e.target.value })}
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">-- Select Volunteer --</option>
                  {volunteers.map((v) => (
                    <option key={v.volunteerId} value={v.volunteerId}>
                      {v.name}
                    </option>
                  ))}
                </TextField>

                <TextField
                  select
                  label="Select Event"
                  value={dutyForm.eventId}
                  onChange={(e) => setDutyForm({ ...dutyForm, eventId: e.target.value })}
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="">-- Select Event --</option>
                  {events.map((ev) => (
                    <option key={ev.eventId} value={ev.eventId}>
                      {ev.eventName}
                    </option>
                  ))}
                </TextField>

                <TextField
                  label="Role/Duty Title"
                  value={dutyForm.role}
                  onChange={(e) => setDutyForm({ ...dutyForm, role: e.target.value })}
                  fullWidth
                  placeholder="e.g., Registration Desk, Security, Setup"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDutyDialog(false)}>Cancel</Button>
                <Button onClick={handleDutySubmit} variant="contained" color="primary">
                  Assign
                </Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Box>
      )}

      {/* Tab 3: View Assignments */}
      {tabIndex === 2 && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Volunteer Duty Assignments
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell><strong>Volunteer</strong></TableCell>
                  <TableCell><strong>Event</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {duties.map((duty) => {
                  const volunteerName = volunteers.find((v) => v.volunteerId === duty.volunteerId)?.name || "Unknown";
                  const eventName = events.find((e) => e.eventId === duty.eventId)?.eventName || "Unknown";

                  return (
                    <TableRow key={duty.dutyId}>
                      <TableCell>{volunteerName}</TableCell>
                      <TableCell>{eventName}</TableCell>
                      <TableCell>{duty.role}</TableCell>
                      <TableCell>{duty.status || "Assigned"}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
}

export default VolunteerManagement;
