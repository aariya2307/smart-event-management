package com.college.smarteventmanagement;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.college.smarteventmanagement.dao.AdminDAO;
import com.college.smarteventmanagement.model.Admin;

@SpringBootApplication
public class SmarteventmanagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmarteventmanagementApplication.class, args);
	}

	@Bean
	public CommandLineRunner initAdmin(AdminDAO adminDAO) {
		return args -> {
			try {
				if (adminDAO.getAllAdmins().isEmpty()) {
					Admin admin = new Admin();
					admin.setName("Admin");
					admin.setEmail("admin@test.com");
					admin.setPassword("password123");
					adminDAO.insertAdmin(admin);
					System.out.println("Default admin created: admin@test.com / password123");
				}
			} catch (Exception e) {
				System.out.println("Note: Admin initialization skipped (tables may already be initialized)");
			}
		};
	}

}
