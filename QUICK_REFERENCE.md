# 🎯 QUICK REFERENCE CARD

## ONE-CLICK START (Recommended)
```
Double-click: D:\smart-event-management\COMPLETE_SETUP.cmd
```
Then wait 30 seconds and visit: **http://localhost:3000**

---

## LOGIN INFO
```
Email:    admin@test.com
Password: password123
```

---

## MANUAL COMMANDS

### Rebuild Backend
```powershell
cd "D:\smart-event-management\backend\smarteventmanagement"
set "JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot"
mvnw.cmd clean package -DskipTests
```

### Start Backend Only
```powershell
cd "D:\smart-event-management\backend\smarteventmanagement"
set "JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot"
mvnw.cmd spring-boot:run
```

### Start Frontend Only
```powershell
cd "D:\smart-event-management\frontend\event-frontend"
npm install
npm start
```

---

## DELETE OLD DATABASE & RESTART

```powershell
# 1. Delete old database
Remove-Item "D:\smart-event-management\backend\smarteventmanagement\event_system_db.mv.db" -Force

# 2. Run complete setup
D:\smart-event-management\COMPLETE_SETUP.cmd
```

---

## VERIFY EVERYTHING IS RUNNING

### Check Backend (Should return 200)
```
curl http://localhost:8080/events
```

### Check Frontend (Should load in browser)
```
http://localhost:3000
```

### H2 Console (View database)
```
http://localhost:8080/h2-console
Username: sa
Password: (leave empty)
```

---

## PORT ALREADY IN USE?

### Find process on port 8080 (Backend)
```powershell
netstat -ano | findstr :8080
```

### Find process on port 3000 (Frontend)
```powershell
netstat -ano | findstr :3000
```

### Kill process
```powershell
taskkill /PID <PID> /F
```

---

## COMMON ISSUES

| Issue | Solution |
|-------|----------|
| Login fails | Delete database & rebuild: `Remove-Item event_system_db.mv.db -Force` |
| Port in use | Kill process or change port in config |
| Can't see data | Clear browser cache (Ctrl+Shift+Delete) & refresh |
| Backend won't start | Check Java: `java -version` |
| Frontend won't start | Check Node: `node -version` |
| Events not appearing | Verify backend is running: http://localhost:8080/events |

---

## CREATE NEW EVENT (API)

```powershell
# PowerShell
$body = @{
    eventName = "Conference 2026"
    eventDate = "2026-08-15"
    location = "Main Hall"
    description = "Tech conference"
    createdBy = 1
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8080/events" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

---

## DATABASE STRUCTURE

### admin table
```sql
id       | name           | email              | password     | role
---------|----------------|--------------------|--------------|---------
1        | Admin User     | admin@test.com     | password123  | ADMIN
```

### event table
```sql
id | name                   | date       | location          | description          | created_by
---|------------------------|-----------  |--------------------|----------------------|----------
1  | Tech Conference 2026   | 2026-04-15 | Convention Center  | Annual tech conf     | 1
2  | Student Orientation    | 2026-03-20 | Main Auditorium    | Campus tour          | 1
...
```

### participant table
```sql
id | name        | department        | year | email              | phone
---|-------------|-------------------|------|--------------------|-----------
1  | Aariya K    | Computer Science  | 3    | aariya@gmail.com   | 06374291986
2  | Rahul Kumar | Information Tech  | 2    | rahul@college.edu  | 9876543210
...
```

---

## FILES YOU CHANGED

✅ `pom.xml` - Added H2 dependency
✅ `application.properties` - Changed to H2 config
✅ `data.sql` - Sample data for testing
✅ `EventController.java` - API endpoints
✅ `AuthController.java` - Login endpoint
✅ `api.js` - Frontend API config
✅ `COMPLETE_SETUP.cmd` - One-click startup
✅ `start-backend.cmd` - Backend launcher
✅ `start-frontend.cmd` - Frontend launcher

---

## IMPORTANT NOTES

⚠️ **First Time Setup**
- Run `COMPLETE_SETUP.cmd` ONCE
- Wait for "Tomcat started" message
- Don't close the windows
- Open browser and visit http://localhost:3000

⚠️ **Database Resets on Restart**
- H2 with `create-drop` means fresh tables every startup
- Sample data reloads automatically from data.sql
- This is INTENTIONAL for testing

⚠️ **Ports Must Be Available**
- Backend needs: 8080
- Frontend needs: 3000
- If in use, close other apps or change ports

⚠️ **After Adding New Events**
- They persist in H2 database file
- On next restart, database resets BUT sample data reloads
- If you want to keep custom events, change `create-drop` to `update`

---

## CHECK JAVA VERSION
```powershell
java -version
```

Should show: **Java 21**

---

## INSTALL MISSING JAVA
```powershell
# If Java 21 not found, download from:
# https://www.microsoft.com/openjdk

# Or install via winget:
winget install --id Microsoft.OpenJDK.21 --source winget
```

---

## npm ISSUES?

```powershell
# Clear cache
npm cache clean --force

# Reinstall dependencies
cd "D:\smart-event-management\frontend\event-frontend"
npm install
```

---

## QUICK TEST FLOW

1. ✅ Open http://localhost:3000
2. ✅ Login with admin@test.com / password123
3. ✅ Click "Events" in sidebar
4. ✅ See 5 sample events
5. ✅ Click "Create Event" button
6. ✅ Fill in form: Name, Date, Location, Description
7. ✅ Click "Save"
8. ✅ New event appears in list!

---

## STILL HAVING ISSUES?

1. **Close everything** (all cmd windows)
2. **Delete database**: 
   ```
   D:\smart-event-management\backend\smarteventmanagement\event_system_db.mv.db
   ```
3. **Run setup again**:
   ```
   D:\smart-event-management\COMPLETE_SETUP.cmd
   ```
4. **Wait 30 seconds** for servers to start
5. **Try login** again

---

**You're all set! Happy coding! 🚀**

