package com.example.jobportal.controllers;


import com.example.jobportal.models.User;
import com.example.jobportal.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("api/user")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("signup")
    public ResponseEntity<Object> signUp(@RequestBody User user) {
        return authService.signUp(
                user.getEmail(),
                user.getUsername(),
                user.getPassword()
        );
    }

    @PostMapping("signin")
    public ResponseEntity<Object> signIn(@RequestBody User user) {
        return authService.signIn(
                user.getEmail(),
                user.getPassword()
        );
    }

}
