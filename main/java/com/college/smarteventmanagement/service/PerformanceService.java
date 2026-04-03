package com.college.smarteventmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.college.smarteventmanagement.dao.PerformanceDAO;
import com.college.smarteventmanagement.model.ParticipantPerformance;

@Service
public class PerformanceService {

    @Autowired
    private PerformanceDAO performanceDAO;

    // Calculate performance score
    public double calculateScore(int completedDuties, double attendancePercent){
        double score = (completedDuties * 5) + (attendancePercent * 0.5);
        return score;
    }

    // Add participant performance to database
    public int addPerformance(ParticipantPerformance performance){
        return performanceDAO.addPerformance(performance);
    }

    // Get performance by event
    public List<ParticipantPerformance> getPerformanceByEvent(int eventId){
        return performanceDAO.getPerformanceByEvent(eventId);
    }
}