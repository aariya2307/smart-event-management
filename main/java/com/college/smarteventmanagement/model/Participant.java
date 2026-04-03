package com.college.smarteventmanagement.model;

import java.sql.Timestamp;

public class Participant {

    private int participantId;
    private String name;
    private String department;
    private int year;
    private String email;
    private String phone;
    private Timestamp registeredDate;

    public Participant() {}

    public Participant(int participantId, String name, String department,
                       int year, String email, String phone, Timestamp registeredDate) {
        this.participantId = participantId;
        this.name = name;
        this.department = department;
        this.year = year;
        this.email = email;
        this.phone = phone;
        this.registeredDate = registeredDate;
    }

    public int getParticipantId() {
        return participantId;
    }

    public void setParticipantId(int participantId) {
        this.participantId = participantId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Timestamp getRegisteredDate() {
        return registeredDate;
    }

    public void setRegisteredDate(Timestamp registeredDate) {
        this.registeredDate = registeredDate;
    }
}