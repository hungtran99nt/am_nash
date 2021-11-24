package com.nt.rookies.asset.management.service;

import java.util.List;
import java.util.Optional;
import com.nt.rookies.asset.management.dto.AccountDTO;
import com.nt.rookies.asset.management.dto.UserDTO;

public interface UserService {

  UserDTO getUserById(Integer id);

  UserDTO updateUser(Integer id, UserDTO userDTO);

  UserDTO createUser(UserDTO userDTO);

  // Find Active(isDisable=false) Staff by username
  Optional<AccountDTO> findActiveByUsername(String username);

  UserDTO disableUser(Integer id);

  List<UserDTO> getAllUser();

  UserDTO findByUsernameTest(String username);

  List<UserDTO> findAllByLocation();

  boolean isValidToDisable(Integer id);
}
