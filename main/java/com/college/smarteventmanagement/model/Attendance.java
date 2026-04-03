package com.college.smarteventmanagement.model;

import java.sql.Timestamp;

public class Attendance {

    private int attendanceId;
    private int eventId;
    private int personId;
    private String personType;
    private String status;
    private Timestamp markedTime;

    public Attendance() {}

    public Attendance(int attendanceId, int eventId, int personId,
                      String personType, String status, Timestamp markedTime) {
        this.attendanceId = attendanceId;
        this.eventId = eventId;
        this.personId = personId;
        this.personType = personType;
        this.status = status;
        this.markedTime = markedTime;
    }

    public int getAttendanceId() {
        return attendanceId;
    }

    public void setAttendanceId(int attendanceId) {
        this.attendanceId = attendanceId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public int getPersonId() {
        return personId;
    }

    public void setPersonId(int personId) {
        this.personId = personId;
    }

    public String getPersonType() {
        return personType;
    }

    public void setPersonType(String personType) {
        this.personType = personType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getMarkedTime() {
        return markedTime;
    }

    public void setMarkedTime(Timestamp markedTime) {
        this.markedTime = markedTime;
    }
}