package com.nt.rookies.asset.management.service.impl;

import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.entity.User;
import com.nt.rookies.asset.management.repository.UserRepository;
import com.nt.rookies.asset.management.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
  private final UserRepository repository;
  private final ModelMapper modelMapper;

  @Autowired
  public UserServiceImpl(UserRepository repository, ModelMapper modelMapper) {
    this.repository = repository;
    this.modelMapper = modelMapper;
  }

  public UserDTO getUserById(Integer id) {
    User user = repository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    return modelMapper.map(user, UserDTO.class);
  }

  public UserDTO updateUser(UserDTO userDTO) {
    User user =
        repository
            .findById(userDTO.getId())
            .orElseThrow(() -> new RuntimeException("Update user not found"));
    user.setBirthDate(userDTO.getBirthDate());
    user.setGender(userDTO.getGender());
    user.setJoinedDate(userDTO.getJoinedDate());
    user.setType(userDTO.getType());

    User updatedUser = repository.save(user);
    return modelMapper.map(updatedUser, UserDTO.class);
  }
}
