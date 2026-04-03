import React, { useState } from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Dashboard from "@mui/icons-material/Dashboard";
import Event from "@mui/icons-material/Event";
import People from "@mui/icons-material/People";
import Volunteer from "@mui/icons-material/NaturePeople";
import Checklist from "@mui/icons-material/Checklist";
import Assessment from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", icon: <Dashboard />, path: "/admin" },
    { label: "Events", icon: <Event />, path: "/events" },
    { label: "Participants", icon: <People />, path: "/participants" },
    { label: "Volunteers", icon: <Volunteer />, path: "/volunteers" },
    { label: "Attendance", icon: <Checklist />, path: "/attendance" },
    { label: "Reports", icon: <Assessment />, path: "/reports" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setOpen(!open)}
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Event Management System
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 240 : 60,
          transition: "all 0.3s",
          "& .MuiDrawer-paper": {
            marginTop: "64px",
            width: open ? 240 : 60,
            transition: "all 0.3s",
            overflow: "hidden",
          },
        }}
      >
        <List>
          {menuItems.map((item, idx) => (
            <ListItem
              button
              key={idx}
              onClick={() => navigate(item.path)}
              sx={{
                justifyContent: "center",
                padding: "8px",
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, marginRight: open ? 2 : 0 }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.label} />}
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        sx={{
          marginLeft: open ? "240px" : "60px",
          marginTop: "64px",
          padding: "20px",
          width: open ? "calc(100% - 240px)" : "calc(100% - 60px)",
          transition: "all 0.3s",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;