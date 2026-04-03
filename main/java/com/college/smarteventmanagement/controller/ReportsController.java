package com.college.smarteventmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.college.smarteventmanagement.service.EventService;
import com.college.smarteventmanagement.service.VolunteerService;
import com.college.smarteventmanagement.service.AttendanceService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/reports")
public class ReportsController {

    @Autowired
    private EventService eventService;

    @Autowired
    private VolunteerService volunteerService;

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/event-participation")
    public ResponseEntity<?> getEventParticipation() {
        Map<String, Object> report = new HashMap<>();
        report.put("events", eventService.getEvents());
        report.put("totalEvents", eventService.getEvents().size());
        return ResponseEntity.ok(report);
    }

    @GetMapping("/volunteer-performance")
    public ResponseEntity<?> getVolunteerPerformance() {
        Map<String, Object> report = new HashMap<>();
        report.put("volunteers", volunteerService.getAllVolunteers());
        report.put("totalVolunteers", volunteerService.getAllVolunteers().size());
        return ResponseEntity.ok(report);
    }

    @GetMapping("/attendance-summary")
    public ResponseEntity<?> getAttendanceSummary() {
        Map<String, Object> report = new HashMap<>();
        report.put("attendance", attendanceService.getAttendance());
        report.put("totalRecords", attendanceService.getAttendance().size());
        return ResponseEntity.ok(report);
    }
}