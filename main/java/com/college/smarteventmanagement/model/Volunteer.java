package com.college.smarteventmanagement.model;

public class Volunteer {

    private int volunteerId;
    private String name;
    private String department;
    private int year;
    private String phone;
    private String email;
    private String skills;
    private String status;

    public Volunteer() {}

    public Volunteer(int volunteerId, String name, String department, int year,
                     String phone, String email, String skills, String status) {
        this.volunteerId = volunteerId;
        this.name = name;
        this.department = department;
        this.year = year;
        this.phone = phone;
        this.email = email;
        this.skills = skills;
        this.status = status;
    }

    public int getVolunteerId() {
        return volunteerId;
    }

    public void setVolunteerId(int volunteerId) {
        this.volunteerId = volunteerId;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}