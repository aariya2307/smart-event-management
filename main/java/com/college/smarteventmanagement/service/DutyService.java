package com.college.smarteventmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.college.smarteventmanagement.dao.DutyDAO;
import com.college.smarteventmanagement.model.Duty;

@Service
public class DutyService {

    @Autowired
    private DutyDAO dutyDAO;

    public List<Duty> getDuties(){
        return dutyDAO.getAllDuties();
    }

    public int assignDuty(Duty duty){
        return dutyDAO.insertDuty(duty);
    }

    public int updateDutyStatus(int dutyId,String status){
        return dutyDAO.updateDutyStatus(dutyId,status);
    }

}