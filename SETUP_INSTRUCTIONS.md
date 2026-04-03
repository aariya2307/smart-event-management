# Setting Up & Running the Smart Event Management System

## ✅ What's Been Done

The application is now configured with **H2 embedded database** (no MySQL server needed!):

- ✅ **Backend**: Updated to use H2 database with automatic table creation
- ✅ **Sample Data**: 5 sample events pre-loaded in the database
- ✅ **Database**: File-based at `./event_system_db.mv.db` (auto-created on first run)
- ✅ **Startup Scripts**: Created for easy launching

---

## 🚀 Quick Start (3 Steps)

### Step 1: Start the Backend
Open **Windows Command Prompt (cmd)** and run:
```
D:\smart-event-management\backend\smarteventmanagement\start-backend.cmd
```

Wait for this message (takes ~15-30 seconds):
```
Tomcat started on port(s): 8080
```

The H2 database will be created automatically on first run.

### Step 2: Start the Frontend
Open a **New Command Prompt** and run:
```
D:\smart-event-management\frontend\event-frontend\start-frontend.cmd
```

Wait for this message:
```
Webpack compiled success
```

The browser will automatically open `http://localhost:3000`

### Step 3: Browse the Application
- The frontend is now running at: **http://localhost:3000**
- The backend API is running at: **http://localhost:8080**
- H2 Console available at: **http://localhost:8080/h2-console** (use default credentials: username `sa`, password empty)

---

## 📊 Sample Events

5 events are automatically loaded:
1. **Tech Conference 2026** - April 15, 2026
2. **Student Orientation** - March 20, 2026
3. **Sports Day** - May 10, 2026
4. **Cultural Fest** - June 1, 2026
5. **Leadership Workshop** - March 25, 2026

---

## 🔧 Technical Details

### Database Configuration
- **Type**: H2 (Embedded)
- **File**: `event_system_db.mv.db` (in the backend folder)
- **Username**: `sa` (System Administrator)
- **Password**: (empty)
- **Auto DDL**: Tables created/updated automatically on startup
- **Console**: Enabled at `/h2-console`

### Backend (Spring Boot)
- **Framework**: Spring Boot 4.0.3
- **Java**: Java 21
- **API Base URL**: `http://localhost:8080`
- **Endpoints**:
  - `GET /api/events` - List all events
  - `POST /api/events` - Create new event
  - `GET /api/events/{id}` - Get event by ID
  - `PUT /api/events/{id}` - Update event
  - `DELETE /api/events/{id}` - Delete event

### Frontend (React)
- **Framework**: React 18+
- **Port**: 3000
- **API Base URL**: Configured in `src/services/api.js`

---

## 🆘 Troubleshooting

### Backend won't start
- Check that Java 21 is installed: `java -version`
- Check port 8080 is available: `netstat -ano | findstr :8080`
- Check logs in the command window for error messages

### Frontend won't start  
- Check Node.js is installed: `node -v`
- Check port 3000 is available
- Reinstall dependencies: `npm install` in the frontend folder

### Can't see events in the UI
- Backend must be running first
- Refresh the browser
- Check browser console (F12) for API errors
- Visit H2 console to verify data: `http://localhost:8080/h2-console`

### Port already in use
- **For Port 8080**: Change `server.port` in `application.properties`
- **For Port 3000**: Change in frontend `package.json` in "start" script

---

## 📝 Manual Testing with Curl

Test the API directly:

```powershell
# List all events
curl http://localhost:8080/api/events

# Create new event
curl -X POST http://localhost:8080/api/events `
  -H "Content-Type: application/json" `
  -d '{
    "eventName": "My New Event",
    "eventDate": "2026-07-15",
    "location": "Main Hall",
    "description": "Test event",
    "createdBy": 1
  }'
```

---

## 📂 Important Files

- **Backend Config**: `backend/smarteventmanagement/src/main/resources/application.properties`
- **Sample Data**: `backend/smarteventmanagement/src/main/resources/data.sql`
- **Frontend API Config**: `frontend/event-frontend/src/services/api.js`
- **Database File**: `backend/smarteventmanagement/event_system_db.mv.db`

---

## ✨ You're All Set!

Everything is connected and ready to go. Just run the two startup scripts and start testing! 🎉

