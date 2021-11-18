package com.nt.rookies.asset.management.service.impl;

import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class JwtUserDetailServiceImpl implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username){
//        return userService.findByUsername(username).map(u -> {
//            User.UserBuilder builder = User.withUsername(u.getUsername());
//            builder.password(u.getPassword());
//            SimpleGrantedAuthority authorities = new SimpleGrantedAuthority(u.getType());
//            builder.authorities(authorities);
//            return builder.build();
//        }).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        try{
            System.out.println(username);
            UserDTO userDTO = userService.findByUsernameTest(username);
            System.out.println(userDTO.toString());
            User.UserBuilder builder = User.withUsername(userDTO.getUsername());
            builder.password(new BCryptPasswordEncoder().encode(userDTO.getPassword()));
            SimpleGrantedAuthority authority = new SimpleGrantedAuthority(userDTO.getType());
            builder.authorities(authority.toString());
//            System.out.println("builder username: " + builder.build().getUsername());
//            System.out.println("builder pass: " + builder.build().getPassword());
//            System.out.println("builder authority: " + builder.build().getAuthorities());
            return builder.build();
        } catch (UsernameNotFoundException ex){
            ex.printStackTrace();
            return null;
        }
    }
}
