package com.nt.rookies.asset.management.service;

import java.util.List;
import java.util.Optional;
import com.nt.rookies.asset.management.dto.AccountDTO;
import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.entity.Location;

public interface UserService {

  UserDTO getUserById(Integer id);

  UserDTO updateUser(Integer id, UserDTO userDTO);

  UserDTO createUser(UserDTO userDTO);


  /**
   * Get user who is active (status != 0) by username
   * @param username
   * @return {@link AccountDTO}
   */
  Optional<AccountDTO> findActiveByUsername(String username);

  /**
   * Change password at first login (user status = -1)
   * and change status to 1
   * @param username
   * @param newPassword
   * @return
   */
  UserDTO changePasswordAtFirstLogin(String username, String newPassword);

  UserDTO disableUser(Integer id);

  List<UserDTO> findAllByLocation();

  boolean isValidToDisable(Integer id);

  /**
   * Get user's location follow current user login
   *
   * @return {@link Location}
   */
  Location getUserLocation();
}
