# 🚀 QUICK START GUIDE - Smart Event Management System

## 30-Second Setup

### Prerequisites Check
- ✅ MySQL 8+ installed and running
- ✅ Node.js 16+ installed
- ✅ Maven 3.9+ (automatic with mvnw)
- ✅ VS Code with workspace open

---

## STEP 1: Database Setup (5 minutes)

### Create Database
```sql
CREATE DATABASE smarteventmanagement;
USE smarteventmanagement;
```

### Create Tables
Execute this SQL in your MySQL client:

```sql
-- Admin Table
CREATE TABLE admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  name VARCHAR(100)
);

-- Event Table
CREATE TABLE event (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  eventDate DATE,
  location VARCHAR(100),
  capacity INT
);

-- Participant Table
CREATE TABLE participant (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  eventId INT,
  FOREIGN KEY (eventId) REFERENCES event(id)
);

-- Volunteer Table
CREATE TABLE volunteer (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  availability VARCHAR(100)
);

-- Duty Table
CREATE TABLE duty (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  description TEXT,
  volunteerId INT,
  eventId INT,
  FOREIGN KEY (volunteerId) REFERENCES volunteer(id),
  FOREIGN KEY (eventId) REFERENCES event(id)
);

-- Attendance Table
CREATE TABLE attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  personId INT,
  eventId INT,
  status VARCHAR(50),
  FOREIGN KEY (eventId) REFERENCES event(id)
);

-- ParticipantPerformance Table
CREATE TABLE participant_performance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  participantId INT,
  eventId INT,
  score INT,
  remarks TEXT,
  evaluatedBy VARCHAR(100),
  evaluationDate DATE,
  FOREIGN KEY (participantId) REFERENCES participant(id),
  FOREIGN KEY (eventId) REFERENCES event(id)
);
```

### Insert Test Admin User
```sql
INSERT INTO admin (email, password, name) 
VALUES ('admin@test.com', 'password123', 'Admin User');
```

**✅ Database ready!**

---

## STEP 2: Backend Configuration (1 minute)

### Edit: `backend/smarteventmanagement/src/main/resources/application.properties`

```properties
spring.application.name=smarteventmanagement
server.port=8080
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/smarteventmanagement
spring.datasource.username=root
spring.datasource.password=YourMySQLPassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

**❌ If MySQL on different host/port, update the URL accordingly**

**✅ Configuration complete!**

---

## STEP 3: Start Backend (2 minutes)

### Terminal 1 - Backend
```bash
cd backend/smarteventmanagement
mvn spring-boot:run
```

**Wait for:** `Started SmarteventmanagementApplication`

**✅ Backend running on http://localhost:8080**

### Verify Backend
- Open browser: http://localhost:8080/events
- Should return: `[]` (empty array)
- If error: Check MySQL connection (see troubleshooting)

---

## STEP 4: Start Frontend (1 minute)

### Terminal 2 - Frontend
```bash
cd frontend/event-frontend
npm start
```

**Wait for:** Browser opens automatically to http://localhost:3000

**✅ Frontend running on http://localhost:3000**

---

## STEP 5: Login & Explore

### Login Credentials
```
Email: admin@test.com
Password: password123
```

### Features to Test
1. **Dashboard** - View stats and charts
2. **Events** - Create, edit, delete events
3. **Participants** - Register participants
4. **Volunteers** - Assign volunteers
5. **Attendance** - Mark attendance
6. **Evaluation** - Score participants
7. **Reports** - View analytics

---

## 🎯 Testing Workflow

### 1. Create Event
```
Dashboard → Events → Add Event button
Fill: Name, Date, Location, Capacity
Click: Save
```

### 2. Register Participant
```
Dashboard → Participants → Add Participant
Fill: Name, Email, Phone, Select Event
Click: Register
```

### 3. Mark Attendance
```
Dashboard → Attendance → Select Event
Fill: Participant, Status (Present/Absent)
Click: Mark
```

### 4. View Reports
```
Dashboard → Reports
See: Charts with data, Statistics cards
```

---

## 🔴 Troubleshooting

### Backend Won't Start

**Error: `Connection refused` or `Can't connect to MySQL`**
- [ ] MySQL service running? `mysql -u root -p` (should work)
- [ ] Correct password in `application.properties`?
- [ ] Database exists? `SHOW DATABASES;`
- [ ] Tables created? `USE smarteventmanagement; SHOW TABLES;`
- [ ] Port 8080 available? Check with `netstat -ano | findstr 8080`

**Fix:** Restart MySQL service
```bash
# Windows
net stop MySQL80
net start MySQL80

# Or use Services app
```

### Frontend Won't Start

**Error: `npm: command not found`**
- [ ] Node.js installed? `node --version` (should show v16+)
- [ ] npm up to date? `npm install -g npm@latest`

**Error: Port 3000 in use**
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr 3000
taskkill /PID <PID> /F

# Or use different port
PORT=3001 npm start
```

### API Not Responding

**Frontend shows error messages on network calls**
- [ ] Backend running? Check terminal for startup logs
- [ ] Backend on 8080? Check `curl http://localhost:8080/events`
- [ ] CORS enabled? (it is in config)
- [ ] Check browser console: F12 → Console tab for errors

### Login Fails

**Error: `Invalid credentials`**
- [ ] Admin user exists? `SELECT * FROM admin;`
- [ ] Email exactly `admin@test.com`?
- [ ] Password exactly `password123`?
- [ ] Database connection working? See above

**Fix:** Reinsert admin user
```sql
DELETE FROM admin WHERE email = 'admin@test.com';
INSERT INTO admin (email, password, name) 
VALUES ('admin@test.com', 'password123', 'Admin');
```

### Charts Show No Data

**Dashboard shows empty charts**
- [ ] Created events? Go to Events page and add one
- [ ] Event has participants? Register some participants
- [ ] Marked attendance? Then check reports

**Fix:** Add test data using Event Management page

### Database Connection Error in Console

**Red error about connection pool**
- Check `application.properties` values match MySQL setup
- Verify MySQL running: `mysql -u root -p` 
- Test URL format: `jdbc:mysql://localhost:3306/smarteventmanagement`

---

## 🔧 Advanced Configuration

### Change Backend Port (if 8080 busy)
Edit `application.properties`:
```properties
server.port=9090
```

### Enable MySQL Logging (debug)
Add to `application.properties`:
```properties
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

### Production Build
```bash
# Backend
cd backend/smarteventmanagement
mvn clean package

# Frontend
cd frontend/event-frontend
npm run build
```

---

## 📊 API Quick Reference

### Create Event
```bash
POST http://localhost:8080/events
Body: {
  "name": "College Fest",
  "description": "Annual fest",
  "eventDate": "2024-12-15",
  "location": "Auditorium",
  "capacity": 500
}
```

### Login
```bash
POST http://localhost:8080/login
Body: {
  "email": "admin@test.com",
  "password": "password123"
}
```

### List Events
```bash
GET http://localhost:8080/events
Response: [{id, name, date, location, capacity}]
```

### View Reports
```bash
GET http://localhost:8080/reports/event-participation
GET http://localhost:8080/reports/attendance-summary
GET http://localhost:8080/reports/volunteer-performance
```

---

## ✅ Success Checklist

- [ ] MySQL database created & tables created
- [ ] Admin user inserted
- [ ] Backend started (see "Started" message)
- [ ] Frontend started (browser opened)
- [ ] Can login with admin@test.com / password123
- [ ] Dashboard displays
- [ ] Can create event
- [ ] All navigation menu items work
- [ ] Charts on dashboard display
- [ ] Reports page shows statistics

**✅ If all checked, system is fully operational!**

---

## 📞 Common Issues

| Issue | Solution |
|-------|----------|
| MySQL connection error | Restart MySQL service, verify credentials |
| Port 8080 already in use | Change port in `application.properties` |
| Login page shows but can't login | Check admin user exists in database |
| Dashboard loads but no data | Create events first from Event Management page |
| CORS error in console | Backend should have CORS configured (it does) |
| npm: command not found | Install Node.js from nodejs.org |

---

## 🎓 What's Running

- **Backend**: Spring Boot REST API on port 8080
- **Frontend**: React app on port 3000
- **Database**: MySQL on port 3306
- **Total Tables**: 7 (Admin, Event, Participant, Volunteer, Duty, Attendance, Performance)
- **Total API Endpoints**: 28
- **Frontend Pages**: 9 (Login, Dashboard, Events, Participants, Volunteers, Attendance, Evaluation, Reports, etc.)

---

**🎉 Application is now LIVE and ready to use!**

Report any issues to: [Your Support Contact]