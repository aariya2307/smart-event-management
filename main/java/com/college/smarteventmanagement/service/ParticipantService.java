package com.college.smarteventmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.college.smarteventmanagement.dao.ParticipantDAO;
import com.college.smarteventmanagement.model.Participant;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantDAO participantDAO;

    public List<Participant> getParticipants(){
        return participantDAO.getAllParticipants();
    }

    public int addParticipant(Participant participant){
        return participantDAO.insertParticipant(participant);
    }

    public int updateParticipant(Participant participant){
        return participantDAO.updateParticipant(participant);
    }

    public int deleteParticipant(int id){
        return participantDAO.deleteParticipant(id);
    }
}