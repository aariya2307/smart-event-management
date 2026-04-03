@echo off
REM Complete Setup Script - Rebuilds Backend and Starts Services
REM Run this ONCE to set everything up properly

setlocal enabledelayedexpansion

echo.
echo ============================================
echo Smart Event Management - Complete Setup
echo ============================================
echo.

REM Navigate to backend
cd /d "D:\smart-event-management\backend\smarteventmanagement"

echo [1/5] Cleaning previous build...
del /f /s /q event_system_db.* 2>nul
del /f /s /q target 2>nul
echo OK

echo.
echo [2/5] Setting Java 21 environment...
set "JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot"
echo OK

echo.
echo [3/5] Building project with new database configuration...
call mvnw.cmd clean package -DskipTests -q
if !errorlevel! neq 0 (
    echo ERROR: Build failed
    pause
    exit /b 1
)
echo OK

echo.
echo [4/5] Starting Backend Server...
echo.
echo *** Backend is starting (port 8080) ***
echo *** Wait for "Tomcat started on port(s): 8080" message ***
echo.
start "Backend - Smart Event Management" cmd /k "set JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot && java -jar target\smarteventmanagement-0.0.1-SNAPSHOT.jar"

timeout /t 5 /nobreak

echo.
echo [5/5] Starting Frontend Server...
echo.
cd /d "D:\smart-event-management\frontend\event-frontend"
echo *** Frontend is starting (port 3000) ***
echo.
start "Frontend - Smart Event Management" cmd /k "npm start"

echo.
echo ============================================
echo SETUP COMPLETE!
echo ============================================
echo.
echo Backend:   http://localhost:8080
echo Frontend:  http://localhost:3000
echo.
echo LOGIN CREDENTIALS:
echo   Email: admin@test.com
echo   Password: password123
echo.
echo ============================================
echo.
pause
