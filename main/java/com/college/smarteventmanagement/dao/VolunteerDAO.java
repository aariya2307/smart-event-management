package com.college.smarteventmanagement.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.college.smarteventmanagement.model.Volunteer;

@Repository
public class VolunteerDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Existing method
    public int addVolunteer(Volunteer volunteer){
        String sql = "INSERT INTO Volunteer(name,department,year,phone,email,skills,status) VALUES (?,?,?,?,?,?,?)";
        return jdbcTemplate.update(sql,
                volunteer.getName(),
                volunteer.getDepartment(),
                volunteer.getYear(),
                volunteer.getPhone(),
                volunteer.getEmail(),
                volunteer.getSkills(),
                volunteer.getStatus());
    }

    // Added method for VolunteerService compatibility
    public int insertVolunteer(Volunteer volunteer){
        String sql = "INSERT INTO Volunteer(name,department,year,phone,email,skills,status) VALUES (?,?,?,?,?,?,?)";
        return jdbcTemplate.update(sql,
                volunteer.getName(),
                volunteer.getDepartment(),
                volunteer.getYear(),
                volunteer.getPhone(),
                volunteer.getEmail(),
                volunteer.getSkills(),
                volunteer.getStatus());
    }

    public List<Volunteer> getAllVolunteers(){
        String sql = "SELECT * FROM Volunteer";
        return jdbcTemplate.query(sql,new BeanPropertyRowMapper<>(Volunteer.class));
    }

    public Volunteer getVolunteerById(int volunteerId){
        String sql = "SELECT * FROM Volunteer WHERE volunteer_id=?";
        return jdbcTemplate.queryForObject(
                sql,
                new BeanPropertyRowMapper<>(Volunteer.class),
                volunteerId
        );
    }

    public int updateVolunteer(Volunteer volunteer){
        String sql = "UPDATE Volunteer SET name=?,department=?,year=?,phone=?,email=?,skills=?,status=? WHERE volunteer_id=?";
        return jdbcTemplate.update(sql,
                volunteer.getName(),
                volunteer.getDepartment(),
                volunteer.getYear(),
                volunteer.getPhone(),
                volunteer.getEmail(),
                volunteer.getSkills(),
                volunteer.getStatus(),
                volunteer.getVolunteerId());
    }

    public int deleteVolunteer(int id){
        String sql = "DELETE FROM Volunteer WHERE volunteer_id=?";
        return jdbcTemplate.update(sql,id);
    }
}