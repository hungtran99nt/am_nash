package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.dto.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserService {
    // Find Active(isDisable=false) Staff by username
    Optional<UserDTO> findActiveByUsername(String username);
    List<UserDTO> getAllUser();
    UserDTO findByUsernameTest(String username);
}
