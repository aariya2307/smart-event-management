package com.college.smarteventmanagement.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.college.smarteventmanagement.model.Participant;

@Repository
public class ParticipantDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Existing method
    public int addParticipant(Participant participant){
        String sql = "INSERT INTO Participant(name,department,year,email,phone) VALUES (?,?,?,?,?)";
        return jdbcTemplate.update(sql,
                participant.getName(),
                participant.getDepartment(),
                participant.getYear(),
                participant.getEmail(),
                participant.getPhone());
    }

    // Added method (for ParticipantService compatibility)
    public int insertParticipant(Participant participant){
        String sql = "INSERT INTO Participant(name,department,year,email,phone) VALUES (?,?,?,?,?)";
        return jdbcTemplate.update(sql,
                participant.getName(),
                participant.getDepartment(),
                participant.getYear(),
                participant.getEmail(),
                participant.getPhone());
    }

    public List<Participant> getAllParticipants(){
        String sql = "SELECT * FROM Participant";
        return jdbcTemplate.query(sql,new BeanPropertyRowMapper<>(Participant.class));
    }

    public int updateParticipant(Participant participant){
        String sql = "UPDATE Participant SET name=?,department=?,year=?,email=?,phone=? WHERE participant_id=?";
        return jdbcTemplate.update(sql,
                participant.getName(),
                participant.getDepartment(),
                participant.getYear(),
                participant.getEmail(),
                participant.getPhone(),
                participant.getParticipantId());
    }

    public int deleteParticipant(int id){
        String sql = "DELETE FROM Participant WHERE participant_id=?";
        return jdbcTemplate.update(sql,id);
    }
}