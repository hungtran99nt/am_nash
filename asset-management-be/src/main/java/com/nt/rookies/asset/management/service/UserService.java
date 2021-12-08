package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.dto.AccountDTO;
import com.nt.rookies.asset.management.dto.PasswordDTO;
import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.entity.Location;
import com.nt.rookies.asset.management.entity.User;
import com.nt.rookies.asset.management.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface UserService {

  UserDTO getUserById(Integer id);

  UserDTO updateUser(Integer id, UserDTO userDTO);

  UserDTO createUser(UserDTO userDTO);

  /**
   * Get user who is active (status != 0) by username
   *
   * @param username
   * @return {@link AccountDTO}
   * @exception ResourceNotFoundException if user not found
   */
  Optional<AccountDTO> findActiveByUsername(String username);

  /**
   * Change password at first login (user status = -1) <br>
   * and change status to 1
   *
   * @param username
   * @param newPassword
   * @return
   * @exception ResourceNotFoundException if user not found
   */
  UserDTO changePasswordAtFirstLogin(String username, String newPassword);

  UserDTO disableUser(Integer id);

  List<UserDTO> findAllByLocation();

  boolean isValidToDisable(Integer id);

  /**
   * Get user's location follow current user login
   *
   * @return {@link Location}
   * @exception ResourceNotFoundException if user not found
   */
  Location getUserLocation();

  /**
   * Change password
   * @param passwordDTO
   * @return Change status: OK, FAILED
   */
  void changePassword(PasswordDTO passwordDTO);

  /**
   * Get current user login
   * @return current {@link User} entity
   * @exception ResourceNotFoundException if user not found
   */
  User getCurrentUser();
}
