# Smart Event Management System - Setup & Run Guide

## Project Structure

```
smart-event-management/
├── backend/smarteventmanagement/     (Spring Boot REST API)
└── frontend/event-frontend/          (React Dashboard)
```

## Prerequisites

1. **Java 17+** - [Download](https://www.oracle.com/java/technologies/downloads/#java17)
2. **Maven 3.9+** - [Download](https://maven.apache.org/download.cgi)
3. **Node.js 18+** - [Download](https://nodejs.org/)
4. **MySQL 8+** - [Download](https://www.mysql.com/downloads/)

## Database Setup

1. **Start MySQL Server**
   ```bash
   # Windows
   mysql -u root -p
   
   # macOS
   mysql.server start
   ```

2. **Create Database and Tables**
   ```sql
   CREATE DATABASE event_management;
   USE event_management;

   -- Admin table
   CREATE TABLE Admin (
       adminId INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       role VARCHAR(50),
       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   -- Event table
   CREATE TABLE Event (
       eventId INT AUTO_INCREMENT PRIMARY KEY,
       eventName VARCHAR(200) NOT NULL,
       eventDate DATE NOT NULL,
       location VARCHAR(200),
       description TEXT,
       createdBy INT,
       FOREIGN KEY (createdBy) REFERENCES Admin(adminId)
   );

   -- Participant table
   CREATE TABLE Participant (
       participantId INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100),
       phone VARCHAR(15),
       eventId INT,
       FOREIGN KEY (eventId) REFERENCES Event(eventId)
   );

   -- Volunteer table
   CREATE TABLE Volunteer (
       volunteerId INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100),
       phone VARCHAR(15),
       eventId INT,
       FOREIGN KEY (eventId) REFERENCES Event(eventId)
   );

   -- Duty table
   CREATE TABLE Duty (
       dutyId INT AUTO_INCREMENT PRIMARY KEY,
       eventId INT NOT NULL,
       volunteerId INT NOT NULL,
       dutyTitle VARCHAR(200),
       dutyDescription TEXT,
       status VARCHAR(50),
       assignedDate TIMESTAMP,
       completionDate TIMESTAMP,
       FOREIGN KEY (eventId) REFERENCES Event(eventId),
       FOREIGN KEY (volunteerId) REFERENCES Volunteer(volunteerId)
   );

   -- Attendance table
   CREATE TABLE Attendance (
       attendanceId INT AUTO_INCREMENT PRIMARY KEY,
       eventId INT NOT NULL,
       personId INT NOT NULL,
       personType VARCHAR(20),
       status VARCHAR(20),
       FOREIGN KEY (eventId) REFERENCES Event(eventId)
   );

   -- ParticipantPerformance table
   CREATE TABLE ParticipantPerformance (
       performanceId INT AUTO_INCREMENT PRIMARY KEY,
       participantId INT NOT NULL,
       eventId INT NOT NULL,
       totalScore INT,
       performancePercentage DOUBLE,
       remarks TEXT,
       evaluatedBy INT,
       evaluationDate TIMESTAMP,
       FOREIGN KEY (participantId) REFERENCES Participant(participantId),
       FOREIGN KEY (eventId) REFERENCES Event(eventId)
   );
   ```

3. **Add Test Admin User**
   ```sql
   INSERT INTO Admin (name, email, password, role) 
   VALUES ('Admin User', 'admin@test.com', 'password123', 'admin');
   ```

## Backend Setup & Run

### 1. Configure Database Connection

Edit `backend/smarteventmanagement/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/event_management
spring.datasource.username=root
spring.datasource.password=your_mysql_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.application.name=smarteventmanagement
server.port=8080
```

### 2. Start Backend Server

```bash
cd backend/smarteventmanagement

# Option 1: Using Maven
mvn spring-boot:run

# Option 2: Run JAR directly
java -jar target/smarteventmanagement-0.0.1-SNAPSHOT.jar
```

Backend will start at: **http://localhost:8080**

### 3. Verify Backend APIs

Test using Postman or curl:

```bash
# Login
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}'

# Get Events
curl http://localhost:8080/events

# Get Participants
curl http://localhost:8080/participants

# Get Reports
curl http://localhost:8080/reports/event-participation
```

## Frontend Setup & Run

### 1. Install Dependencies

```bash
cd frontend/event-frontend
npm install
```

### 2. Configure API Base URL

Verify `src/services/api.js`:

```javascript
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080"
});

export default API;
```

### 3. Start React Development Server

```bash
npm start
```

Frontend will open at: **http://localhost:3000**

### 4. Build for Production

```bash
npm run build
```

## Application Features

### 👤 Authentication
- **Login Page**: Email & password authentication
- **Session Management**: Admin login required to access dashboard

### 📅 Event Management
- ✅ Create Events
- ✅ View Events in Table
- ✅ Update Event Details
- ✅ Delete Events

### 👥 Participant Management
- ✅ Register Participants
- ✅ View Participant List
- ✅ Assign to Events
- ✅ Evaluate Participant Performance

### 🙋 Volunteer Management
- ✅ Register Volunteers
- ✅ Assign Volunteers to Duties
- ✅ Track Volunteer Performance

### ✅ Attendance Tracking
- ✅ Mark Attendance (Present/Absent)
- ✅ View Attendance Records
- ✅ Filter by Event

### 📊 Reports & Analytics
- ✅ Event Participation Charts
- ✅ Volunteer Performance Metrics
- ✅ Attendance Summary (Pie Chart)
- ✅ Event Distribution (Doughnut Chart)

## API Endpoints

### Authentication
```
POST   /login                     Login with credentials
```

### Events
```
GET    /events                    Get all events
POST   /events                    Create new event
PUT    /events/{id}               Update event
DELETE /events/{id}               Delete event
```

### Participants
```
GET    /participants              Get all participants
POST   /participants              Register participant
```

### Volunteers
```
GET    /volunteers                Get all volunteers
POST   /volunteers                Add volunteer
DELETE /volunteers/{id}           Remove volunteer
```

### Attendance
```
POST   /attendance                Mark attendance
GET    /attendance                Get all attendance
GET    /attendance/{eventId}      Get attendance by event
```

### Performance/Evaluation
```
POST   /performance/evaluation    Record evaluation
GET    /performance/evaluation/{eventId}   Get evaluations
```

### Reports
```
GET    /reports/event-participation      Event participation report
GET    /reports/volunteer-performance    Volunteer performance report
GET    /reports/attendance-summary       Attendance summary report
```

## UI Navigation

### Sidebar Menu
- **Dashboard** - Overview with stats and charts
- **Events** - Event CRUD management
- **Participants** - Participant list and registration
- **Volunteers** - Volunteer assignment and management
- **Attendance** - Attendance tracking
- **Reports** - Analytics and reports

### Dashboard Features
- Real-time statistics (Events, Participants, Volunteers, Attendance)
- Bar chart for system overview
- Pie chart for attendance status
- Responsive Material UI design

## Troubleshooting

### Backend won't start
```bash
# Check if port 8080 is in use
netstat -ano | findstr :8080

# Kill process using port 8080
taskkill /PID <PID> /F
```

### Database connection error
- Verify MySQL is running
- Check credentials in `application.properties`
- Ensure database `event_management` exists
- Run SQL setup scripts again

### Frontend won't connect to backend
- Ensure backend is running on http://localhost:8080
- Check CORS is enabled in Spring Boot
- Verify `api.js` has correct baseURL
- Check browser console for errors

### Port 3000 already in use
```bash
# Kill process using port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Or use different port
PORT=3001 npm start
```

## Technology Stack

**Backend:**
- Spring Boot 4.0.3
- Spring Data JPA
- MySQL 8
- Maven 3.9

**Frontend:**
- React 18
- Material UI (MUI)
- Chart.js & react-chartjs-2
- Axios
- React Router

## Project Created Files

### Backend Controllers
- `AuthController.java` - Login endpoint
- `EventController.java` - Event CRUD
- `ParticipantController.java` - Participant management
- `VolunteerController.java` - Volunteer assignment
- `AttendanceController.java` - Attendance tracking
- `PerformanceController.java` - Performance evaluation
- `ReportsController.java` - Reports generation

### Frontend Pages
- `LoginPage.jsx` - Authentication
- `AdminDashboard.jsx` - Dashboard with charts
- `EventManagement.jsx` - Event CRUD table
- `ParticipantDashboard.jsx` - Participant list
- `ParticipantForm.jsx` - Registration form
- `VolunteerPage.js` - Volunteer assignment
- `AttendancePage.js` - Attendance marking
- `EvaluationPage.js` - Performance evaluation
- `Reports.jsx` - Analytics & reports

### Frontend Components
- `Layout.jsx` - Sidebar navigation
- `api.js` - Axios API configuration

## Next Steps

1. ✅ Start MySQL Server
2. ✅ Create database and tables
3. ✅ Configure backend `application.properties`
4. ✅ Run `mvn clean package` in backend
5. ✅ Start backend with `mvn spring-boot:run`
6. ✅ Navigate to frontend folder
7. ✅ Run `npm install` (one-time)
8. ✅ Start frontend with `npm start`
9. ✅ Login with `admin@test.com` / `password123`
10. ✅ Explore all features!

## Need Help?

Check the console logs for detailed error messages.

Happy coding! 🚀