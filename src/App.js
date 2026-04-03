import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminManagement from "./pages/AdminManagement";
import EventManagement from "./pages/EventManagement";
import ParticipantDashboard from "./pages/ParticipantDashboard";
import ParticipantManagement from "./pages/ParticipantManagement";
import ParticipantForm from "./components/ParticipantForm";
import VolunteerPage from "./pages/VolunteerPage";
import VolunteerManagement from "./pages/VolunteerManagement";
import AttendancePage from "./pages/AttendancePage";
import EvaluationPage from "./pages/EvaluationPage";
import Reports from "./pages/Reports";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />

        {/* Protected Routes with Layout */}
        <Route
          path="/admin"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />
        <Route
          path="/admins"
          element={
            <Layout>
              <AdminManagement />
            </Layout>
          }
        />
        <Route
          path="/events"
          element={
            <Layout>
              <EventManagement />
            </Layout>
          }
        />
        <Route
          path="/participants"
          element={
            <Layout>
              <ParticipantManagement />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <ParticipantForm />
            </Layout>
          }
        />
        <Route
          path="/volunteers"
          element={
            <Layout>
              <VolunteerManagement />
            </Layout>
          }
        />
        <Route
          path="/volunteer-duties"
          element={
            <Layout>
              <VolunteerPage />
            </Layout>
          }
        />
        <Route
          path="/attendance"
          element={
            <Layout>
              <AttendancePage />
            </Layout>
          }
        />
        <Route
          path="/evaluation"
          element={
            <Layout>
              <EvaluationPage />
            </Layout>
          }
        />
        <Route
          path="/reports"
          element={
            <Layout>
              <Reports />
            </Layout>
          }
        />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;