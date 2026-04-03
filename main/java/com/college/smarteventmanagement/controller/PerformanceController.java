package com.college.smarteventmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.college.smarteventmanagement.service.PerformanceService;

@RestController
@RequestMapping("/performance")
public class PerformanceController {

    @Autowired
    private PerformanceService performanceService;

    @GetMapping("/score")
    public double calculateScore(
            @RequestParam int dutiesCompleted,
            @RequestParam double attendancePercentage){

        return performanceService.calculateScore(dutiesCompleted, attendancePercentage);
    }

    // store participant evaluation
    @PostMapping("/evaluation")
    public int addPerformance(@RequestBody com.college.smarteventmanagement.model.ParticipantPerformance perf){
        return performanceService.addPerformance(perf);
    }

    // get all evaluations for an event
    @GetMapping("/evaluation/{eventId}")
    public java.util.List<com.college.smarteventmanagement.model.ParticipantPerformance> getPerformanceByEvent(@PathVariable int eventId){
        return performanceService.getPerformanceByEvent(eventId);
    }

}