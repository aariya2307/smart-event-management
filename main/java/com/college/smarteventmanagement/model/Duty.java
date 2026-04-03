package com.college.smarteventmanagement.model;

import java.sql.Timestamp;

public class Duty {

    private int dutyId;
    private int eventId;
    private int volunteerId;
    private String dutyTitle;
    private String dutyDescription;
    private String status;
    private Timestamp assignedDate;
    private Timestamp completionDate;

    public Duty() {}

    public Duty(int dutyId, int eventId, int volunteerId,
                String dutyTitle, String dutyDescription,
                String status, Timestamp assignedDate,
                Timestamp completionDate) {

        this.dutyId = dutyId;
        this.eventId = eventId;
        this.volunteerId = volunteerId;
        this.dutyTitle = dutyTitle;
        this.dutyDescription = dutyDescription;
        this.status = status;
        this.assignedDate = assignedDate;
        this.completionDate = completionDate;
    }

    public int getDutyId() {
        return dutyId;
    }

    public void setDutyId(int dutyId) {
        this.dutyId = dutyId;
    }

    public int getEventId() {
        return eventId;
    }

    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public int getVolunteerId() {
        return volunteerId;
    }

    public void setVolunteerId(int volunteerId) {
        this.volunteerId = volunteerId;
    }

    public String getDutyTitle() {
        return dutyTitle;
    }

    public void setDutyTitle(String dutyTitle) {
        this.dutyTitle = dutyTitle;
    }

    public String getDutyDescription() {
        return dutyDescription;
    }

    public void setDutyDescription(String dutyDescription) {
        this.dutyDescription = dutyDescription;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getAssignedDate() {
        return assignedDate;
    }

    public void setAssignedDate(Timestamp assignedDate) {
        this.assignedDate = assignedDate;
    }

    public Timestamp getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(Timestamp completionDate) {
        this.completionDate = completionDate;
    }
}