package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.dto.AccountDTO;
import com.nt.rookies.asset.management.dto.UserDTO;
import java.util.List;
import java.util.Optional;

public interface UserService {

  UserDTO getUserById(Integer id);

  UserDTO updateUser(UserDTO userDTO);

  // Find Active(isDisable=false) Staff by username
  Optional<AccountDTO> findActiveByUsername(String username);

  List<UserDTO> getAllUser();
    UserDTO findByUsernameTest(String username);
    List<UserDTO> findAllByLocation();
}
