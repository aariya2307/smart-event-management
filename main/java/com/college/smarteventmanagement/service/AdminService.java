package com.college.smarteventmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.college.smarteventmanagement.dao.AdminDAO;
import com.college.smarteventmanagement.model.Admin;

@Service
public class AdminService {

    @Autowired
    private AdminDAO adminDAO;

    // Existing method
    public String getAdminDashboard() {
        return "Admin Dashboard";
    }

    // Get all admins
    public List<Admin> getAllAdmins(){
        return adminDAO.getAllAdmins();
    }

    // Add admin
    public int addAdmin(Admin admin){
        return adminDAO.insertAdmin(admin);
    }

    // Update existing admin
    public int updateAdmin(Admin admin) {
        return adminDAO.updateAdmin(admin);
    }

    // Delete admin
    public int deleteAdmin(int id) {
        return adminDAO.deleteAdmin(id);
    }

    // Authenticate admin using email/password
    public Admin authenticate(String email, String password){
        return adminDAO.findByEmailAndPassword(email, password);
    }

}