package com.college.smarteventmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.college.smarteventmanagement.model.Admin;
import com.college.smarteventmanagement.service.AdminService;

@RestController
@RequestMapping("/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Get all admins
    @GetMapping
    public List<Admin> getAdmins(){
        return adminService.getAllAdmins();
    }

    // Add admin
    @PostMapping
    public int addAdmin(@RequestBody Admin admin){
        return adminService.addAdmin(admin);
    }

    // Update admin
    @PutMapping("/{id}")
    public int updateAdmin(@PathVariable int id, @RequestBody Admin admin) {
        admin.setAdminId(id);
        return adminService.updateAdmin(admin);
    }

    // Delete admin
    @DeleteMapping("/{id}")
    public int deleteAdmin(@PathVariable int id) {
        return adminService.deleteAdmin(id);
    }

}