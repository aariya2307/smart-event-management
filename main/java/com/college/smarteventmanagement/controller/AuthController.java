package com.college.smarteventmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.college.smarteventmanagement.model.Admin;
import com.college.smarteventmanagement.model.LoginRequest;
import com.college.smarteventmanagement.model.LoginResponse;
import com.college.smarteventmanagement.service.AdminService;

@RestController
// allow requests from the React development server
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // try database authentication first
        Admin admin = adminService.authenticate(request.getEmail(), request.getPassword());
        if (admin == null) {
            // fallback to a hard‑coded admin so that the UI works even when the database is empty
            if ("admin@test.com".equals(request.getEmail()) &&
                "password123".equals(request.getPassword())) {
                admin = new Admin();
                admin.setEmail(request.getEmail());
                admin.setName("Administrator");
                admin.setRole("ADMIN");
            }
        }

        if (admin != null) {
            // return an object shaped the way the frontend expects
            LoginResponse resp = new LoginResponse("dummy-token", admin);
            return ResponseEntity.ok(resp);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
