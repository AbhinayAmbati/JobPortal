package com.example.jobportal.dao;


import com.example.jobportal.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthDao extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
}
