package com.college.smarteventmanagement.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registrations")
public class RegistrationController {

    // Register participant for event
    @PostMapping
    public String registerParticipant(){

        return "Participant registered successfully";

    }

}