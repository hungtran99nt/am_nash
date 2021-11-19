package com.nt.rookies.asset.management.controller;

import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class UserRestController {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<UserDTO> getAllUser(){
        return userService.findAllByLocation();
    }

    @GetMapping("/user/{username}")
    public Optional<UserDTO> getActiveUserByUsername(@PathVariable(name = "username") String username) {
        return userService.findActiveByUsername(username);
    }
}
