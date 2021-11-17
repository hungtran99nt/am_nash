package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.dto.UserDTO;

public interface UserService {

  UserDTO getUserById(Integer id);

  UserDTO updateUser(UserDTO userDTO);

//  UserDTO createUser(UserDTO userDTO);
}
