import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import VolunteerIcon from "@mui/icons-material/NaturePeople";
import ChecklistIcon from "@mui/icons-material/Checklist";
import API from "../services/api";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [stats, setStats] = useState({
    events: 0,
    participants: 0,
    volunteers: 0,
    attendance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = () => {
    setLoading(true);
    Promise.all([
      API.get("/events").catch(() => ({ data: [] })),
      API.get("/participants").catch(() => ({ data: [] })),
      API.get("/volunteers").catch(() => ({ data: [] })),
      API.get("/attendance").catch(() => ({ data: [] })),
    ])
      .then(([events, participants, volunteers, attendance]) => {
        setStats({
          events: events.data.length,
          participants: participants.data.length,
          volunteers: volunteers.data.length,
          attendance: attendance.data.length,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
        border: `2px solid ${color}`,
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ color: color, fontSize: "40px" }}>{icon}</Box>
          <Box>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5">{value}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const chartData = {
    labels: ["Events", "Participants", "Volunteers"],
    datasets: [
      {
        label: "System Overview",
        data: [stats.events, stats.participants, stats.volunteers],
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
      },
    ],
  };

  const pieData = {
    labels: ["Attendance", "Absence"],
    datasets: [
      {
        data: [
          stats.attendance,
          Math.max(0, stats.participants - stats.attendance),
        ],
        backgroundColor: ["#10B981", "#EF4444"],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold" }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Events"
            value={stats.events}
            icon={<EventIcon />}
            color="#3B82F6"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Participants"
            value={stats.participants}
            icon={<PeopleIcon />}
            color="#10B981"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Volunteers"
            value={stats.volunteers}
            icon={<VolunteerIcon />}
            color="#F59E0B"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Attendance Records"
            value={stats.attendance}
            icon={<ChecklistIcon />}
            color="#8B5CF6"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                System Overview
              </Typography>
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true },
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Attendance Status
              </Typography>
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  plugins: { legend: { display: true } },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminDashboard;