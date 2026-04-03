package com.college.smarteventmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.college.smarteventmanagement.model.Attendance;
import com.college.smarteventmanagement.service.AttendanceService;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    // Mark attendance
    @PostMapping
    public int markAttendance(@RequestBody Attendance attendance){
        return attendanceService.markAttendance(attendance);
    }

    // Get attendance
    @GetMapping
    public List<Attendance> getAttendance(){
        return attendanceService.getAttendance();
    }

    // Get attendance for specific event
    @GetMapping("/{eventId}")
    public List<Attendance> getAttendanceByEvent(@PathVariable int eventId){
        return attendanceService.getAttendanceByEvent(eventId);
    }

    // Update attendance entry
    @PutMapping("/{id}")
    public int updateAttendance(@PathVariable int id, @RequestBody Attendance attendance) {
        attendance.setAttendanceId(id);
        return attendanceService.updateAttendance(attendance);
    }

    // Delete attendance
    @DeleteMapping("/{id}")
    public int deleteAttendance(@PathVariable int id) {
        return attendanceService.deleteAttendance(id);
    }

}