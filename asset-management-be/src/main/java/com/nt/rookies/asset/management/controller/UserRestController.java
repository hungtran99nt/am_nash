package com.nt.rookies.asset.management.controller;
import com.nt.rookies.asset.management.dto.AccountDTO;
import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1.0/users")

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

  @PutMapping("/{id}")
  @ApiOperation("Edit user by id")
  public ResponseEntity<UserDTO> updateUser(
      @PathVariable(name = "id") Integer id, @RequestBody UserDTO user) {
    UserDTO updatedUser = userService.updateUser(id, user);
    return ResponseEntity.ok().body(updatedUser);
  }

  @PostMapping(value = "/")
  @ApiOperation("Create new user")
  public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO user) {
    UserDTO createdUser = userService.createUser(user);
    return ResponseEntity.ok().body(createdUser);
  }

  @GetMapping()
  public List<UserDTO> getAllUserByLocation() {
    return userService.findAllByLocation();
  }

  @GetMapping("/username/{username}")
  public Optional<AccountDTO> getActiveUserByUsername(
      @PathVariable(name = "username") String username) {
    return userService.findActiveByUsername(username);
  }
}
