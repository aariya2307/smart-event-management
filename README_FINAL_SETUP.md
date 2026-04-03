# 🚀 FINAL SETUP - Smart Event Management System

## ⚡ QUICK START (Recommended)

**Run this ONE TIME to set everything up:**

```
Double-click: D:\smart-event-management\COMPLETE_SETUP.cmd
```

This will:
- ✅ Clean old database files
- ✅ Rebuild the project
- ✅ Start backend server (port 8080)
- ✅ Start frontend server (port 3000)
- ✅ Load sample data automatically

---

## 🔐 LOGIN CREDENTIALS

Once both servers are running:

**Admin Login:**
- Email: `admin@test.com`
- Password: `password123`

**Frontend URL:**
```
http://localhost:3000
```

---

## ✅ WHAT'S INCLUDED

### Database (H2 - No Server Needed)
- **File**: `event_system_db.mv.db` (auto-created)
- **Console**: http://localhost:8080/h2-console
- **Credentials**: Username: `sa` | Password: (empty)

### Pre-Loaded Sample Data

**5 Events:**
1. Tech Conference 2026 - April 15
2. Student Orientation - March 20
3. Sports Day - May 10
4. Cultural Fest - June 1
5. Leadership Workshop - March 25

**Admin User:**
- Email: `admin@test.com`
- Password: `password123`

**5 Sample Participants:**
- Aariya K (CS, Year 3)
- Rahul Kumar (IT, Year 2)
- Priya Singh (CS, Year 3)
- Amit Patel (Electronics, Year 1)
- Neha Desai (Mechanical, Year 4)

---

## 📝 HOW TO USE

### 1️⃣ Login
```
Email: admin@test.com
Password: password123
[Click SIGN IN]
```

### 2️⃣ Navigate to Events
Click on **"Events"** in the sidebar

### 3️⃣ Create New Event
- Click **"Create Event"** button
- Fill in the form:
  - Event Name: `My New Event`
  - Event Date: `2026-07-20`
  - Location: `Main Hall`
  - Description: `Test event`
- Click **"Save"**

### 4️⃣ View Events
All events (sample + newly created) will appear in the list

### 5️⃣ Register Participants
Go to **"Participants"** section to register attendees

---

## 🔧 API ENDPOINTS (Backend)

All APIs start with: `http://localhost:8080`

### Events
```
GET    /events              - List all events
POST   /events              - Create new event
PUT    /events/{id}         - Update event
DELETE /events/{id}         - Delete event
GET    /events/{id}         - Get event by ID
```

### Admin
```
POST   /login               - Login with email/password
```

### Participants
```
GET    /participants        - List all participants
POST   /participants        - Register participant
PUT    /participants/{id}   - Update participant
DELETE /participants/{id}   - Delete participant
```

---

## 🌐 Frontend Features

- **Dashboard**: Overview of events and stats
- **Events**: Create, view, edit, delete events
- **Participants**: View and register participants
- **Volunteers**: Manage volunteers
- **Attendance**: Track attendance
- **Reports**: View reports and analytics

---

## 🐛 TROUBLESHOOTING

### "Port 8080 already in use"
- Kill the process: `netstat -ano | findstr :8080`
- Or change `server.port` in `application.properties`

### "Port 3000 already in use"
- Kill the process: `netstat -ano | findstr :3000`
- Or set environment: `set PORT=3001` before running npm start

### "Login still fails"
1. Close all terminals
2. Delete database file: `event_system_db.mv.db`
3. Run `COMPLETE_SETUP.cmd` again
4. Wait for both servers to fully start (~30 seconds)
5. Try login

### "Cannot see events in frontend"
1. Verify backend is running: Visit http://localhost:8080/events
2. Check browser console (F12) for API errors
3. Clear browser cache (Ctrl+Shift+Delete)
4. Refresh page

### "Build failed"
- Check Java 21 is installed: `java -version`
- Try manual rebuild: Navigate to `backend/smarteventmanagement` and run:
  ```
  mvnw.cmd clean package -DskipTests
  ```

---

## 📂 KEY FILES

```
D:\smart-event-management\
├── COMPLETE_SETUP.cmd                    ← Run this to start everything
├── backend/
│   └── smarteventmanagement/
│       ├── pom.xml                       ← Dependencies (H2 database)
│       ├── src/main/resources/
│       │   ├── application.properties    ← Database config
│       │   └── data.sql                  ← Sample data (auto-loaded)
│       └── target/
│           └── smarteventmanagement-0.0.1-SNAPSHOT.jar
└── frontend/
    └── event-frontend/
        ├── package.json
        ├── src/services/api.js           ← Backend URL config
        └── public/
            └── index.html
```

---

## ✨ YOU'RE ALL SET!

1. Run `COMPLETE_SETUP.cmd`
2. Wait for both servers to start (~30 seconds)
3. Visit `http://localhost:3000`
4. Login with:
   - **Email**: `admin@test.com`
   - **Password**: `password123`
5. Start creating events!

---

## 🎯 NEXT STEPS

After successful login:

✅ **Create Events**
- Go to "Events" → "Create Event"
- Fill in details and save

✅ **Register Participants**
- Go to "Participants"
- Register new attendees

✅ **Track Attendance**
- Go to "Attendance"
- Mark participants as present/absent

✅ **View Reports**
- Go to "Reports"
- See event statistics and summaries

---

## 📞 SUPPORT

If you encounter issues:

1. **Check the console windows** - Look for error messages
2. **Verify ports are available** - 8080 (backend), 3000 (frontend)
3. **Check internet connection** - Frontend needs to reach backend
4. **Clear browser cache** - Sometimes helps with API issues
5. **Restart everything** - Close all windows and run COMPLETE_SETUP.cmd again

---

**Happy Event Managing! 🎉**

For detailed API documentation, visit: `http://localhost:8080` (add `/swagger-ui` if Swagger is configured)

