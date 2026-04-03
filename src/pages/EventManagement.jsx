import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import API from "../services/api";

function EventManagement() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch(console.error);
  };

  const handleOpen = (event = null) => {
    if (event) {
      setEditId(event.eventId);
      setFormData({
        eventName: event.eventName,
        eventDate: event.eventDate,
        location: event.location,
        description: event.description,
      });
    } else {
      setEditId(null);
      setFormData({
        eventName: "",
        eventDate: "",
        location: "",
        description: "",
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (editId) {
      API.put(`/events/${editId}`, formData)
        .then(() => {
          loadEvents();
          handleClose();
        })
        .catch(console.error);
    } else {
      API.post("/events", formData)
        .then(() => {
          loadEvents();
          handleClose();
        })
        .catch(console.error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this event?")) {
      API.delete(`/events/${id}`)
        .then(() => loadEvents())
        .catch(console.error);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Event Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Event
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Event Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.eventId} hover>
                  <TableCell>{event.eventId}</TableCell>
                  <TableCell>{event.eventName}</TableCell>
                  <TableCell>{event.eventDate}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpen(event)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(event.eventId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editId ? "Edit Event" : "Create Event"}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: 2 }}>
          <TextField
            fullWidth
            label="Event Name"
            value={formData.eventName}
            onChange={(e) =>
              setFormData({ ...formData, eventName: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Event Date"
            type="date"
            value={formData.eventDate}
            onChange={(e) =>
              setFormData({ ...formData, eventDate: e.target.value })
            }
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EventManagement;