package com.nt.rookies.asset.management.controller;

import com.nt.rookies.asset.management.dto.AccountDTO;
import com.nt.rookies.asset.management.dto.PasswordDTO;
import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1.0/account")
public class AccountRestController {
    private final UserService userService;

    @Autowired
    public AccountRestController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Get Account info: username, status, type
     * @param username
     * @return
     */
    @GetMapping("/user")
    public Optional<AccountDTO> getActiveUserByUsername(@RequestParam String username) {
        return userService.findActiveByUsername(username);
    }

    /**
     * Change password at first login
     * @param password
     * @return
     */
    @PutMapping("/resetPassword")
    public UserDTO changePasswordAtFirstLogin(@RequestParam String password) {
        return userService.changePasswordAtFirstLogin(password);
    }

    /**
     * Change password as needed
     * @param passwordDTO
     * @return
     */
    @PutMapping("/changePassword")
    public ResponseEntity<Void> changePassword(@RequestBody @Valid PasswordDTO passwordDTO){
        userService.changePassword(passwordDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
