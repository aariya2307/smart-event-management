package com.college.smarteventmanagement.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.college.smarteventmanagement.model.Admin;

@Repository
public class AdminDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Insert admin
    public int insertAdmin(Admin admin){
        // note: the database table is named `admin` (lowercase) according to the DDL
        String sql = "INSERT INTO admin(name,email,password,role) VALUES (?,?,?,?)";
        return jdbcTemplate.update(sql,
                admin.getName(),
                admin.getEmail(),
                admin.getPassword(),
                "ADMIN");
    }

    // Update existing admin
    public int updateAdmin(Admin admin) {
        String sql = "UPDATE admin SET name=?, email=?, password=?, role=? WHERE admin_id=?";
        return jdbcTemplate.update(sql,
                admin.getName(),
                admin.getEmail(),
                admin.getPassword(),
                admin.getRole(),
                admin.getAdminId());
    }

    // Delete admin by id
    public int deleteAdmin(int id) {
        String sql = "DELETE FROM admin WHERE admin_id=?";
        return jdbcTemplate.update(sql, id);
    }

    // Get all admins
    public List<Admin> getAllAdmins(){
        String sql = "SELECT * FROM admin";
        return jdbcTemplate.query(
                sql,
                new BeanPropertyRowMapper<>(Admin.class)
        );
    }

    // Find admin by email and password (for login)
    public Admin findByEmailAndPassword(String email, String password) {
        String sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
        List<Admin> list = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Admin.class),
                email, password);
        return list.isEmpty() ? null : list.get(0);
    }

}