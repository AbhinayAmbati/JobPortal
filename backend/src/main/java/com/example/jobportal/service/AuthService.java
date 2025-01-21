package com.example.jobportal.service;


import com.example.jobportal.dao.AuthDao;
import com.example.jobportal.models.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.util.Date;
import java.util.Optional;

@Configuration
@Service
public class AuthService {


    @Autowired
    AuthDao authDao;

    @Autowired
    BCryptPasswordEncoder encoder;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public ResponseEntity<Object> signUp(String email, String username,  String password) {
        try{
            if(authDao.findByEmail(email).isPresent()){
                return new ResponseEntity<>(email + " is already registered", HttpStatus.CONFLICT);
            }

            String hashedPassword = encoder.encode(password);

            User user = new User();
            user.setEmail(email);
            user.setUsername(username);
            user.setPassword(hashedPassword);
            authDao.save(user);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public ResponseEntity<Object> signIn(String email, String password) {
        try {
            Optional<User> userData = authDao.findByEmail(email);

            if (userData.isEmpty()) {
                return new ResponseEntity<>("Email is not registered", HttpStatus.NOT_FOUND);
            }

            User user = userData.get();

            if (!passwordEncoder.matches(password, user.getPassword())) {
                return new ResponseEntity<>("Incorrect password", HttpStatus.UNAUTHORIZED);
            }

            KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
            KeyPair keyPair = keyGen.generateKeyPair();

            String jwtToken = Jwts.builder().setSubject(user.getUsername()).setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis()+3600000))
                    .signWith(SignatureAlgorithm.RS256,keyPair.getPrivate())
                    .compact();

            class JwtResponse{
                private String jwtToken;
                private User user;

                public JwtResponse(String jwtToken, User user) {
                    this.jwtToken = jwtToken;
                    this.user = user;
                }
                public String getJwtToken() {
                    return jwtToken;
                }
                public User getUser() {
                    return user;
                }
                public void setUser(User user) {
                    this.user = user;
                }
                public void setJwtToken(String jwtToken) {
                    this.jwtToken = jwtToken;
                }
                public String toString(String jwtToken, User user){
                    return jwtToken + " " + user.getUsername();
                }
            }

            JwtResponse  jwtResponse = new JwtResponse(jwtToken,user);

            return ResponseEntity.ok(jwtResponse);

        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred during sign-in: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
