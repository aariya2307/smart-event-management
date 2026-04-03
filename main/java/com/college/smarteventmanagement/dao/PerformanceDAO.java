package com.college.smarteventmanagement.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.college.smarteventmanagement.model.ParticipantPerformance;

@Repository
public class PerformanceDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int addPerformance(ParticipantPerformance performance){

        String sql = "INSERT INTO Participant_Performance(participant_id,event_id,participation_score,engagement_score,task_quality_score,presentation_score,team_contribution_score,total_score,performance_percentage,remarks,evaluated_by) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

        return jdbcTemplate.update(sql,
                performance.getParticipantId(),
                performance.getEventId(),
                performance.getParticipationScore(),
                performance.getEngagementScore(),
                performance.getTaskQualityScore(),
                performance.getPresentationScore(),
                performance.getTeamContributionScore(),
                performance.getTotalScore(),
                performance.getPerformancePercentage(),
                performance.getRemarks(),
                performance.getEvaluatedBy());
    }

    public List<ParticipantPerformance> getPerformanceByEvent(int eventId){

        String sql = "SELECT * FROM Participant_Performance WHERE event_id=?";

        return jdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<>(ParticipantPerformance.class),
                eventId
        );
    }
}