package com.college.smarteventmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.college.smarteventmanagement.model.Event;
import com.college.smarteventmanagement.service.EventService;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    // GET all events
    @GetMapping
    public ResponseEntity<List<Event>> getEvents(){
        return ResponseEntity.ok(eventService.getEvents());
    }

    // CREATE event
    @PostMapping
    public ResponseEntity<String> createEvent(@RequestBody Event event){
        int result = eventService.createEvent(event);

        if(result > 0){
            return ResponseEntity.ok("Event created successfully");
        } else {
            return ResponseEntity.badRequest().body("Event creation failed");
        }
    }

    // UPDATE event
    @PutMapping("/{id}")
    public ResponseEntity<String> updateEvent(@PathVariable int id, @RequestBody Event event){

        event.setEventId(id);

        int result = eventService.updateEvent(event);

        if(result > 0){
            return ResponseEntity.ok("Event updated successfully");
        } else {
            return ResponseEntity.badRequest().body("Event update failed");
        }
    }

    // DELETE event
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable int id){

        int result = eventService.deleteEvent(id);

        if(result > 0){
            return ResponseEntity.ok("Event deleted successfully");
        } else {
            return ResponseEntity.badRequest().body("Event deletion failed");
        }
    }
}