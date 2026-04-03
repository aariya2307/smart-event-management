package com.college.smarteventmanagement.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.college.smarteventmanagement.model.Event;

@Repository
public class EventDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int insertEvent(Event event){
        String sql = "INSERT INTO Event(event_name,event_date,location,description,created_by) VALUES (?,?,?,?,?)";
        return jdbcTemplate.update(sql,
                event.getEventName(),
                event.getEventDate(),
                event.getLocation(),
                event.getDescription(),
                event.getCreatedBy());
    }

    public List<Event> getAllEvents(){
        String sql = "SELECT * FROM Event";
        return jdbcTemplate.query(sql,new BeanPropertyRowMapper<>(Event.class));
    }

    public int updateEvent(Event event){
        String sql = "UPDATE Event SET event_name=?,event_date=?,location=?,description=? WHERE event_id=?";
        return jdbcTemplate.update(sql,
                event.getEventName(),
                event.getEventDate(),
                event.getLocation(),
                event.getDescription(),
                event.getEventId());
    }

    public int deleteEvent(int id){
        String sql = "DELETE FROM Event WHERE event_id=?";
        return jdbcTemplate.update(sql,id);
    }
}