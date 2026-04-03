package com.college.smarteventmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.college.smarteventmanagement.dao.VolunteerDAO;
import com.college.smarteventmanagement.model.Volunteer;

@Service
public class VolunteerService {

    @Autowired
    private VolunteerDAO volunteerDAO;

    // Get all volunteers
    public List<Volunteer> getAllVolunteers() {
        return volunteerDAO.getAllVolunteers();
    }

    // Add new volunteer
    public int addVolunteer(Volunteer volunteer) {
        return volunteerDAO.insertVolunteer(volunteer);
    }

    // Update volunteer details
    public int updateVolunteer(Volunteer volunteer) {
        return volunteerDAO.updateVolunteer(volunteer);
    }

    // Delete volunteer
    public int deleteVolunteer(int volunteerId) {
        return volunteerDAO.deleteVolunteer(volunteerId);
    }

    // Get volunteer by ID
    public Volunteer getVolunteerById(int volunteerId) {
        return volunteerDAO.getVolunteerById(volunteerId);
    }

}