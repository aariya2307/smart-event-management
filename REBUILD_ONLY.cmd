@echo off
REM Quick Rebuild Script - Just rebuilds, doesn't start servers

setlocal enabledelayedexpansion

echo.
echo ============================================
echo Smart Event Management - Quick Rebuild
echo ============================================
echo.

REM Navigate to backend
cd /d "D:\smart-event-management\backend\smarteventmanagement"

echo [1/3] Cleaning previous build...
del /f /s /q event_system_db.* 2>nul
del /f /s /q target 2>nul
echo OK

echo.
echo [2/3] Setting Java 21 environment...
set "JAVA_HOME=C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot"
echo OK

echo.
echo [3/3] Building project...
call mvnw.cmd clean package -DskipTests -q
if !errorlevel! neq 0 (
    echo.
    echo ERROR: Build failed. Check Java installation.
    echo Run: java -version
    pause
    exit /b 1
)

echo.
echo ============================================
echo BUILD COMPLETE
echo ============================================
echo.
echo Next steps:
echo 1. Start Backend:  D:\smart-event-management\backend\smarteventmanagement\start-backend.cmd
echo 2. Start Frontend: D:\smart-event-management\frontend\event-frontend\start-frontend.cmd
echo 3. Login to http://localhost:3000 with:
echo    Email: admin@test.com
echo    Password: password123
echo.
echo ============================================
echo.
pause
