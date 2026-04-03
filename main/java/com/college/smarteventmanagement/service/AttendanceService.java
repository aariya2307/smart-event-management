package com.college.smarteventmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.college.smarteventmanagement.dao.AttendanceDAO;
import com.college.smarteventmanagement.model.Attendance;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceDAO attendanceDAO;

    public int markAttendance(Attendance attendance){
        return attendanceDAO.insertAttendance(attendance);
    }

    public List<Attendance> getAttendance(){
        return attendanceDAO.getAttendanceList();
    }

    public List<Attendance> getAttendanceByEvent(int eventId){
        return attendanceDAO.getAttendanceByEvent(eventId);
    }

    public int updateAttendance(Attendance attendance) {
        return attendanceDAO.updateAttendance(attendance);
    }

    public int deleteAttendance(int id) {
        return attendanceDAO.deleteAttendance(id);
    }

}