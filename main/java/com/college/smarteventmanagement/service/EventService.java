package com.college.smarteventmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.college.smarteventmanagement.dao.EventDAO;
import com.college.smarteventmanagement.model.Event;

@Service
public class EventService {

    @Autowired
    private EventDAO eventDAO;

    public List<Event> getEvents(){
        return eventDAO.getAllEvents();
    }

    public int createEvent(Event event){
        if (event.getCreatedBy() == null) {
            // Default to admin user in case frontend does not send createdBy
            event.setCreatedBy(1);
        }
        return eventDAO.insertEvent(event);
    }

    public int updateEvent(Event event){
        if (event.getCreatedBy() == null) {
            // Maintain a default creator when not provided
            event.setCreatedBy(1);
        }
        return eventDAO.updateEvent(event);
    }

    public int deleteEvent(int eventId){
        return eventDAO.deleteEvent(eventId);
    }

}