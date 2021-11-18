package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<UserDTO> findByUsername(String username);
    UserDTO findByUsernameTest(String username);
    List<UserDTO> getAllUser();
}
