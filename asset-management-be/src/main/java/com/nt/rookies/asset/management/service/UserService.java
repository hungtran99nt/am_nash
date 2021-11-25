package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.dto.AccountDTO;
import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.entity.Location;

import java.util.List;
import java.util.Optional;

public interface UserService {

  UserDTO getUserById(Integer id);

  UserDTO updateUser(Integer id, UserDTO userDTO);

  UserDTO createUser(UserDTO userDTO);

  // Find Active(isDisable=false) Staff by username
  Optional<AccountDTO> findActiveByUsername(String username);

  List<UserDTO> findAllByLocation();

  /**
  * Get user's location follow current user login
  *
  * @return {@link Location}
  * */
  Location getUserLocation();
}
