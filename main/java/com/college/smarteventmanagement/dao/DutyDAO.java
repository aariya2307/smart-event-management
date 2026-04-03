package com.college.smarteventmanagement.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.college.smarteventmanagement.model.Duty;

@Repository
public class DutyDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Existing method
    public int assignDuty(Duty duty){
        String sql = "INSERT INTO Duty(event_id,volunteer_id,duty_title,duty_description,status) VALUES (?,?,?,?,?)";
        return jdbcTemplate.update(sql,
                duty.getEventId(),
                duty.getVolunteerId(),
                duty.getDutyTitle(),
                duty.getDutyDescription(),
                duty.getStatus());
    }

    // Added method (for DutyService compatibility)
    public int insertDuty(Duty duty){
        String sql = "INSERT INTO Duty(event_id,volunteer_id,duty_title,duty_description,status) VALUES (?,?,?,?,?)";
        return jdbcTemplate.update(sql,
                duty.getEventId(),
                duty.getVolunteerId(),
                duty.getDutyTitle(),
                duty.getDutyDescription(),
                duty.getStatus());
    }

    public List<Duty> getAllDuties(){
        String sql = "SELECT * FROM Duty";
        return jdbcTemplate.query(sql,new BeanPropertyRowMapper<>(Duty.class));
    }

    public int updateDutyStatus(int dutyId,String status){
        String sql = "UPDATE Duty SET status=? WHERE duty_id=?";
        return jdbcTemplate.update(sql,status,dutyId);
    }

    public int deleteDuty(int dutyId){
        String sql = "DELETE FROM Duty WHERE duty_id=?";
        return jdbcTemplate.update(sql,dutyId);
    }
}