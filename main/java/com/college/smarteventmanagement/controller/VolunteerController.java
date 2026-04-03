package com.college.smarteventmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.college.smarteventmanagement.model.Volunteer;
import com.college.smarteventmanagement.service.VolunteerService;

@RestController
@RequestMapping("/volunteers")
public class VolunteerController {

    @Autowired
    private VolunteerService volunteerService;

    // Get all volunteers
    @GetMapping
    public List<Volunteer> getVolunteers(){
        return volunteerService.getAllVolunteers();
    }

    // Add volunteer
    @PostMapping
    public int addVolunteer(@RequestBody Volunteer volunteer){
        return volunteerService.addVolunteer(volunteer);
    }

    // Update volunteer
    @PutMapping("/{id}")
    public int updateVolunteer(@PathVariable int id, @RequestBody Volunteer volunteer){
        volunteer.setVolunteerId(id);
        return volunteerService.updateVolunteer(volunteer);
    }

    // Delete volunteer
    @DeleteMapping("/{id}")
    public int deleteVolunteer(@PathVariable int id){
        return volunteerService.deleteVolunteer(id);
    }
}