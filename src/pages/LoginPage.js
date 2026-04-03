import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Event } from "@mui/icons-material";
import "../styles/LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // simple email format check (require @ and a domain)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const res = await API.post("/login", { email, password });
      // backend now returns an object with { token, user }
      localStorage.setItem("token", res.data.token || "");
      localStorage.setItem("user", JSON.stringify(res.data.user || res.data));
      navigate("/admin");
    } catch (err) {
      // network error (backend not reachable) vs. authentication failure
      if (!err.response) {
        setError(
          "Unable to contact server. Make sure the backend is running on port 8080."
        );
      } else {
        setError(
          err.response?.data ||
            err.response?.data?.message ||
            "Login failed. Check credentials."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box className="login-container">
      <Container maxWidth="sm">
        <Paper elevation={6} className="login-paper">
          <Box className="login-header">
            <Event className="login-icon" />
            <Typography variant="h4" className="login-title">
              Smart Event Management
            </Typography>
            <Typography variant="body2" className="login-subtitle">
              Admin Portal
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} className="login-form">
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              disabled={loading}
              margin="normal"
              placeholder="admin@test.com"
              variant="outlined"
              className="login-input"
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
              disabled={loading}
              margin="normal"
              placeholder="Enter your password"
              variant="outlined"
              className="login-input"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              className="login-button"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>

            <Typography align="center" variant="body2" sx={{ mt: 2, color: "#666" }}>
              Demo Credentials:<br />
              Email: admin@test.com<br />
              Password: password123
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}


export default LoginPage;