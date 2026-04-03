package com.college.smarteventmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.college.smarteventmanagement.model.Duty;
import com.college.smarteventmanagement.service.DutyService;

@RestController
@RequestMapping("/duties")
public class DutyController {

    @Autowired
    private DutyService dutyService;

    // Get all duties
    @GetMapping
    public List<Duty> getDuties(){
        return dutyService.getDuties();
    }

    // Assign duty
    @PostMapping
    public int assignDuty(@RequestBody Duty duty){
        return dutyService.assignDuty(duty);
    }

}