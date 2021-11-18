package com.nt.rookies.asset.management.controller;

import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserRestController {
    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public List<UserDTO> getAllUser(){
        return userService.getAllUser();
    }
}
