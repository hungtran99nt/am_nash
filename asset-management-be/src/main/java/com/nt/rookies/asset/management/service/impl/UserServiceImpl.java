package com.nt.rookies.asset.management.service.impl;

import com.nt.rookies.asset.management.dto.AccountDTO;
import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.entity.Location;
import com.nt.rookies.asset.management.entity.User;
import com.nt.rookies.asset.management.exception.ResourceNotFoundException;
import com.nt.rookies.asset.management.repository.UserRepository;
import com.nt.rookies.asset.management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
  private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
  private final UserRepository repository;
  private final ModelMapper modelMapper;

  @Autowired
  public UserServiceImpl(UserRepository repository, ModelMapper modelMapper) {
    this.repository = repository;
    this.modelMapper = modelMapper;
  }

  @Override
  public UserDTO getUserById(Integer id) {
    User user =
        repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found."));
    return modelMapper.map(user, UserDTO.class);
  }

  @Override
  public UserDTO updateUser(UserDTO userDTO) {
    User user =
        repository
            .findById(userDTO.getId())
            .orElseThrow(() -> new ResourceNotFoundException("Update user not found."));
    logger.info("User found: {}", user);
    user.setBirthDate(userDTO.getBirthDate());
    user.setGender(userDTO.getGender());
    user.setJoinedDate(userDTO.getJoinedDate());
    user.setType(userDTO.getType());
    logger.info("User edited: {}", user);

    User updatedUser = repository.save(user);
    logger.info("User updated: {}", updatedUser);
    return modelMapper.map(updatedUser, UserDTO.class);
  }

  @Override
  public Optional<AccountDTO> findActiveByUsername(String username) {
    User user = repository.findByUsername(username);
    if (!user.isDisable()) return Optional.of(modelMapper.map(user, AccountDTO.class));
    return Optional.empty();
  }

  @Override
  public List<UserDTO> getAllUser() {
    return repository.findAll().stream()
        .map(user -> modelMapper.map(user, UserDTO.class))
        .collect(Collectors.toList());
  }
    @Override
    public List<UserDTO> findAllByLocation(){
        Location location = getUserLocation();

        List<User> users = userRepository.findAllByLocation(location);
        return users.stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    private Location getUserLocation() {
        // get user location from token
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String username = userDetails.getUsername();
        User currentUser = userRepository.findByUsername(username);

        return currentUser.getLocation();
    }

    private UserDTO convertEntityToDto (User user){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setStaffCode(user.getStaffCode());
        userDTO.setUsername(user.getUsername());
        userDTO.setType(user.getType());
        userDTO.setPassword(user.getPassword());
        userDTO.setDisable(user.isDisable());
        userDTO.setGender(user.getGender());
        userDTO.setBirthDate(user.getBirthDate());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setJoinedDate(user.getJoinedDate());
        userDTO.setLocation(user.getLocation().getLocationName());
        return userDTO;
    }
}
