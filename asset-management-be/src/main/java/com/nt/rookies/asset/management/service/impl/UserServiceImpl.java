package com.nt.rookies.asset.management.service.impl;

import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.entity.User;
import com.nt.rookies.asset.management.repository.UserRepository;
import com.nt.rookies.asset.management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl (UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public Optional<UserDTO> findByUsername(String username) {
        return userRepository.findAll()
                .stream()
                .filter( user -> user.isDisable() == false && user.getUsername().equals(username))
                .map(this::convertEntityToDto)
                .findFirst();
    }

    @Override
    public UserDTO findByUsernameTest(String username) {
        System.out.println("ServiceImpl:" + username);
        return convertEntityToDto(userRepository.findByUsername(username));
    }

    @Override
    public List<UserDTO> getAllUser() {
        return userRepository.findAll()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    private UserDTO convertEntityToDto (User user){
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setStaffCode(user.getStaffCode());
        userDTO.setUsername(user.getUsername());
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
