package com.college.smarteventmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.college.smarteventmanagement.model.Participant;
import com.college.smarteventmanagement.service.ParticipantService;

@RestController
@RequestMapping("/participants")
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;

    // Get all participants
    @GetMapping
    public List<Participant> getParticipants(){
        return participantService.getParticipants();
    }

    // Add participant
    @PostMapping
    public int addParticipant(@RequestBody Participant participant){
        return participantService.addParticipant(participant);
    }

    // Update participant
    @PutMapping("/{id}")
    public int updateParticipant(@PathVariable int id, @RequestBody Participant participant){
        participant.setParticipantId(id);
        return participantService.updateParticipant(participant);
    }

    // Delete participant
    @DeleteMapping("/{id}")
    public int deleteParticipant(@PathVariable int id){
        return participantService.deleteParticipant(id);
    }
}