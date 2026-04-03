package com.college.smarteventmanagement.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.college.smarteventmanagement.model.Attendance;

@Repository
public class AttendanceDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Existing method
    public int markAttendance(Attendance attendance){
        String sql = "INSERT INTO Attendance(event_id,person_id,person_type,status) VALUES (?,?,?,?)";
        return jdbcTemplate.update(sql,
                attendance.getEventId(),
                attendance.getPersonId(),
                attendance.getPersonType(),
                attendance.getStatus());
    }

    // Existing method
    public List<Attendance> getAttendanceByEvent(int eventId){
        String sql = "SELECT * FROM Attendance WHERE event_id=?";
        return jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Attendance.class),
                eventId);
    }

    // -------- ADDED METHODS --------

    public int insertAttendance(Attendance attendance){
        String sql = "INSERT INTO Attendance(event_id,person_id,person_type,status) VALUES (?,?,?,?)";
        return jdbcTemplate.update(sql,
                attendance.getEventId(),
                attendance.getPersonId(),
                attendance.getPersonType(),
                attendance.getStatus());
    }

    public List<Attendance> getAttendanceList(){
        String sql = "SELECT * FROM Attendance";
        return jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Attendance.class));
    }

    // Update attendance record
    public int updateAttendance(Attendance attendance) {
        String sql = "UPDATE Attendance SET event_id=?, person_id=?, person_type=?, status=? WHERE attendance_id=?";
        return jdbcTemplate.update(sql,
                attendance.getEventId(),
                attendance.getPersonId(),
                attendance.getPersonType(),
                attendance.getStatus(),
                attendance.getAttendanceId());
    }

    // Delete attendance record
    public int deleteAttendance(int id) {
        String sql = "DELETE FROM Attendance WHERE attendance_id=?";
        return jdbcTemplate.update(sql, id);
    }

}