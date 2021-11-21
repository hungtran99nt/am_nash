package com.nt.rookies.asset.management.controller;

import com.nt.rookies.asset.management.dto.AccountDTO;
import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController

@RequestMapping("/api/v1.0/user")
@Api(tags = "User controller using REST API")
public class UserRestController {
    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    @ApiOperation("Get user by id")
    public ResponseEntity<UserDTO> getUserById(@PathVariable(name = "id") Integer id) {
        UserDTO user = userService.getUserById(id);
        return ResponseEntity.ok().body(user);
    }

    @PutMapping("/edit")
    @ApiOperation("Edit user")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO user) {
        UserDTO updatedUser = userService.updateUser(user);
        return ResponseEntity.ok().body(updatedUser);
    }

    @GetMapping("/")
    public List<UserDTO> getAllUser() {
        return userService.getAllUser();
    }

    @GetMapping("/users")
    public List<UserDTO> getAllUserByLocation() {
        return userService.findAllByLocation();
    }

    @GetMapping("/{username}")
    public Optional<AccountDTO> getActiveUserByUsername(
            @PathVariable(name = "username") String username) {
        return userService.findActiveByUsername(username);
    }
}
