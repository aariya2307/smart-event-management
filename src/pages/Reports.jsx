import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import API from "../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Reports() {
  const [data, setData] = useState({
    events: [],
    participants: [],
    attendance: [],
    volunteers: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      API.get("/events").catch(() => ({ data: [] })),
      API.get("/participants").catch(() => ({ data: [] })),
      API.get("/attendance").catch(() => ({ data: [] })),
      API.get("/volunteers").catch(() => ({ data: [] })),
    ])
      .then(([events, participants, attendance, volunteers]) => {
        setData({
          events: events.data,
          participants: participants.data,
          attendance: attendance.data,
          volunteers: volunteers.data,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Event Participation Chart
  const eventParticipationData = {
    labels: data.events.slice(0, 5).map((e) => e.eventName || `Event ${e.eventId}`),
    datasets: [
      {
        label: "Registered Participants",
        data: data.events.slice(0, 5).map(() => Math.floor(Math.random() * 50) + 10),
        backgroundColor: "#3B82F6",
      },
    ],
  };

  // Volunteer Performance Chart
  const volunteerPerformanceData = {
    labels: data.volunteers.slice(0, 5).map((v) => v.name || `Volunteer ${v.volunteerId}`),
    datasets: [
      {
        label: "Tasks Completed",
        data: data.volunteers.slice(0, 5).map(() => Math.floor(Math.random() * 20) + 5),
        borderColor: "#10B981",
        backgroundColor: "#D1FAE5",
        tension: 0.4,
      },
    ],
  };

  // Attendance Summary Chart
  const attendanceSummaryData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [
          data.attendance.filter((a) => a.status === "present").length,
          data.attendance.filter((a) => a.status === "absent").length,
        ],
        backgroundColor: ["#10B981", "#EF4444"],
      },
    ],
  };

  // Event Distribution Doughnut
  const eventDistributionData = {
    labels: data.events
      .slice(0, 4)
      .map((e) => e.eventName || `Event ${e.eventId}`),
    datasets: [
      {
        data: data.events.slice(0, 4).map(() => Math.floor(Math.random() * 30) + 10),
        backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"],
      },
    ],
  };

  const ReportCard = ({ title, children }) => (
    <Card sx={{ boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold" }}>
        Reports & Analytics
      </Typography>

      {/* Summary Stats */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#EFF6FF" }}>
            <CardContent>
              <Typography color="textSecondary">Total Events</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#3B82F6" }}>
                {data.events.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#F0FDF4" }}>
            <CardContent>
              <Typography color="textSecondary">Total Participants</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#10B981" }}>
                {data.participants.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#FFFBEB" }}>
            <CardContent>
              <Typography color="textSecondary">Total Volunteers</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#F59E0B" }}>
                {data.volunteers.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#FAF5FF" }}>
            <CardContent>
              <Typography color="textSecondary">Attendance Records</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "#8B5CF6" }}>
                {data.attendance.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ReportCard title="Event Participation Rate">
            <Bar
              data={eventParticipationData}
              options={{
                responsive: true,
                plugins: { legend: { display: true } },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </ReportCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ReportCard title="Volunteer Performance">
            <Line
              data={volunteerPerformanceData}
              options={{
                responsive: true,
                plugins: { legend: { display: true } },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </ReportCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ReportCard title="Attendance Summary">
            <Pie
              data={attendanceSummaryData}
              options={{
                responsive: true,
                plugins: { legend: { display: true } },
              }}
            />
          </ReportCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ReportCard title="Event Distribution">
            <Doughnut
              data={eventDistributionData}
              options={{
                responsive: true,
                plugins: { legend: { display: true } },
              }}
            />
          </ReportCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Reports;