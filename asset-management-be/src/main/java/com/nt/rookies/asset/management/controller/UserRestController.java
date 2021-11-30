package com.nt.rookies.asset.management.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.nt.rookies.asset.management.dto.AccountDTO;
import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.service.AssignmentService;
import com.nt.rookies.asset.management.service.UserService;

/** REST controller for user. */
@RestController
@RequestMapping("/api/v1.0/users")
public class UserRestController {
  private final UserService userService;
  private final AssignmentService assignmentService;

  @Autowired
  public UserRestController(UserService userService, AssignmentService assignmentService) {
    this.userService = userService;
    this.assignmentService = assignmentService;
  }

  @GetMapping()
  public List<UserDTO> getAllUserByLocation() {
    return userService.findAllByLocation();
  }

  @PostMapping()
  public UserDTO createUser(@RequestBody UserDTO user) {
    return userService.createUser(user);
  }

  @GetMapping("/{id}")
  public UserDTO getUserById(@PathVariable(name = "id") Integer id) {
    return userService.getUserById(id);
  }

  @PutMapping("/{id}")
  public UserDTO updateUser(@PathVariable(name = "id") Integer id, @RequestBody UserDTO user) {
    return userService.updateUser(id, user);
  }

  @GetMapping("/user")
  public Optional<AccountDTO> getActiveUserByUsername(@RequestParam String username) {
    return userService.findActiveByUsername(username);
  }

  @PutMapping("/disable/{id}")
  public ResponseEntity<UserDTO> disableUser(@PathVariable(name = "id") Integer id) {
    return new ResponseEntity<>(userService.disableUser(id), HttpStatus.OK);
  }

  @GetMapping("/{id}/valid")
  public ResponseEntity<Boolean> isValidToDisable(@PathVariable(name = "id") Integer id) {
    return new ResponseEntity<>(userService.isValidToDisable(id), HttpStatus.OK);
  }

  @PutMapping("/user/updatePassword")
  public UserDTO changePasswordAtFirstLogin(@RequestParam String username, @RequestParam String password) {
    return userService.changePasswordAtFirstLogin(username, password);
  }

  @GetMapping("/{id}/validAssignment")
  public ResponseEntity<Boolean> isAssignmentValidtoDelete(@PathVariable(name = "id") Integer id) {
    return new ResponseEntity<>(assignmentService.isAssignmentValidtoDelete(id), HttpStatus.OK);
  }

  @DeleteMapping("/deleteAssignment/{id}")
  public ResponseEntity<String> deleteAssignment(@PathVariable(name = "id") Integer id) {
    return new ResponseEntity<>("Assignment Deleted", HttpStatus.GONE);
  }
}
