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
  Alert,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import API from "../services/api";

function AdminManagement() {
  const [tabIndex, setTabIndex] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
  });
  const [editAdminId, setEditAdminId] = useState(null);

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = () => {
    API.get("/admins")
      .then((res) => setAdmins(res.data))
      .catch(() => {
        setMessage("Failed to load admins");
        setMessageType("error");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!adminForm.name || !adminForm.email || !adminForm.password) {
      setMessage("Name, email and password are required");
      setMessageType("error");
      return;
    }

    const promise = editAdminId
      ? API.put(`/admins/${editAdminId}`, adminForm)
      : API.post("/admins", adminForm);

    promise
      .then(() => {
        setMessage(editAdminId ? "Admin updated" : "Admin added");
        setMessageType("success");
        setAdminForm({ name: "", email: "", password: "", role: "ADMIN" });
        setEditAdminId(null);
        loadAdmins();
      })
      .catch((err) => {
        setMessage(err.response?.data || "Failed to save admin");
        setMessageType("error");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this admin?")) {
      API.delete(`/admins/${id}`)
        .then(() => {
          setMessage("Admin removed");
          setMessageType("success");
          loadAdmins();
        })
        .catch((err) => {
          setMessage(err.response?.data || "Failed to delete admin");
          setMessageType("error");
        });
    }
  };

  const handleEdit = (admin) => {
    setAdminForm(admin);
    setEditAdminId(admin.adminId);
    setTabIndex(0);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Admin Management
        </Typography>
        {message && (
          <Alert severity={messageType} onClose={() => setMessage("")}>
            {message}
          </Alert>
        )}
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabIndex} onChange={(e, v) => setTabIndex(v)}>
          <Tab label="Add / Edit Admin" />
          <Tab label="View All Admins" />
        </Tabs>
      </Box>

      {tabIndex === 0 && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editAdminId ? "Edit Admin" : "New Admin"}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Name"
              value={adminForm.name}
              onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Email"
              type="email"
              value={adminForm.email}
              onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              value={adminForm.password}
              onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
              fullWidth
              required
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                {editAdminId ? "Update" : "Add"}
              </Button>
              {editAdminId && (
                <Button
                  variant="outlined"
                  onClick={() => {
                    setAdminForm({ name: "", email: "", password: "", role: "ADMIN" });
                    setEditAdminId(null);
                  }}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      )}

      {tabIndex === 1 && (
        <Paper sx={{ p: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.map((adm) => (
                  <TableRow key={adm.adminId}>
                    <TableCell>{adm.adminId}</TableCell>
                    <TableCell>{adm.name}</TableCell>
                    <TableCell>{adm.email}</TableCell>
                    <TableCell>{adm.role}</TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => handleEdit(adm)}>
                        <EditIcon fontSize="small" />
                      </Button>
                      <Button size="small" color="error" onClick={() => handleDelete(adm.adminId)}>
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
}

export default AdminManagement;
