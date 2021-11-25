package com.nt.rookies.asset.management.service.impl;

import com.nt.rookies.asset.management.common.BaseConstants;
import com.nt.rookies.asset.management.dto.AccountDTO;
import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.entity.Location;
import com.nt.rookies.asset.management.entity.User;
import com.nt.rookies.asset.management.exception.ResourceNotFoundException;
import com.nt.rookies.asset.management.repository.UserRepository;
import com.nt.rookies.asset.management.service.UserService;
import java.text.Normalizer;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
  private final UserRepository repository;
  private final ModelMapper modelMapper;
  private final PasswordEncoder passwordEncoder;

  @Autowired
  public UserServiceImpl(
      UserRepository repository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
    this.repository = repository;
    this.modelMapper = modelMapper;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public UserDTO getUserById(Integer id) {
    User user =
        repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found."));
    logger.info("getUserById: {}", user);
    return modelMapper.map(user, UserDTO.class);
  }

  @Override
  public UserDTO updateUser(Integer id, UserDTO userDTO) {
    User user =
        repository
            .findById(id)
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
  public UserDTO createUser(UserDTO userDTO) {
    String username = generateUsername(userDTO);
    String encodedPassword = generatePassword(userDTO, username);
    Location location = getUserLocation();

    User user = modelMapper.map(userDTO, User.class);
    user.setUsername(username);
    user.setPassword(encodedPassword);
    user.setStatus(BaseConstants.USER_STATUS_NEW);
    user.setLocation(location);
    logger.info("New User:{}", user);

    User createdUser = repository.save(user); // insert user to db
    String staffCode = generateStaffCode(createdUser.getId());
    createdUser.setStaffCode(staffCode);
    createdUser = repository.save(createdUser); // update user with staff code
    logger.info("Created User:{}", createdUser);
    return modelMapper.map(createdUser, UserDTO.class);
  }

  @Override
  public Optional<AccountDTO> findActiveByUsername(String username) {
    User user = repository.findByUsername(username);
    if (user.getStatus() != BaseConstants.USER_STATUS_DISABLED) {
      return Optional.of(modelMapper.map(user, AccountDTO.class));
    }
    return Optional.empty();
  }

  @Override
  public List<UserDTO> findAllByLocation() {
    Location location = getUserLocation();
    List<User> users = repository.findAllByLocation(location);
    return users.stream()
        .map(user -> modelMapper.map(user, UserDTO.class))
        .collect(Collectors.toList());
  }

  @Override
  public Location getUserLocation() {
    UserDetails userDetails =
        (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    String username = userDetails.getUsername();
    User currentUser = repository.findByUsername(username);
    return currentUser.getLocation();
  }

  private String generateUsername(UserDTO userDTO) {
    StringBuilder username = new StringBuilder();
    username.append(removeAccent(userDTO.getFirstName()).toLowerCase());
    String[] lastNames = userDTO.getLastName().split(" ");
    for (String name : lastNames) {
      username.append(Character.toLowerCase(name.charAt(0)));
    }
    Optional<Integer> maxPostfix = repository.findMaxUsernamePostfix(username.toString());
    logger.info("maxPostfix: {}", maxPostfix.orElse(0));
    //  if username existed => username = username + countUsername
    maxPostfix.ifPresent(postfix -> username.append(++postfix));
    logger.info("username: {}", username);
    return username.toString();
  }

  private String removeAccent(String text) {
    return Normalizer.normalize(text, Normalizer.Form.NFD)
        .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
        .replaceAll("Đ", "D")
        .replaceAll("đ", "d");
  }

  private String generatePassword(UserDTO userDTO, String username) {
    SimpleDateFormat formatter = new SimpleDateFormat("ddMMyyyy");
    StringBuilder password = new StringBuilder();
    password.append(username).append("@");
    password.append(formatter.format(userDTO.getBirthDate()));
    String encodedPassword = passwordEncoder.encode(password);
    logger.info("password: {}", password);
    logger.info("encoded password: {}", encodedPassword);
    return encodedPassword;
  }

  private String generateStaffCode(Integer userId) {
    String staffCode = "SD" + StringUtils.leftPad(userId.toString(), 4, "0");
    logger.info("staffCode: {}", staffCode);
    return staffCode;
  }
}
