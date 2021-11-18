package com.nt.rookies.asset.management.controller;

import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
  @ApiOperation("Get post by id")
  public ResponseEntity<UserDTO> getUserById(@PathVariable(name = "id") Integer id) {
    UserDTO user = userService.getUserById(id);
    System.out.println(user);
    return ResponseEntity.ok().body(user);
  }

  @PutMapping("/update")
  @ApiOperation("Update user")
  public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO user) {
    UserDTO updatedUser = userService.updateUser(user);
    return ResponseEntity.ok().body(updatedUser);
  }

  @GetMapping("/")
  public List<UserDTO> getAllUser() {
    return userService.getAllUser();
  }
}
