package com.nt.rookies.asset.management;

import com.nt.rookies.asset.management.dto.UserDTO;
import com.nt.rookies.asset.management.service.UserService;
import com.nt.rookies.asset.management.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Optional;

@SpringBootApplication
public class AssetManagementBeApplication {

    public static void main(String[] args) {
        SpringApplication.run(AssetManagementBeApplication.class, args);
    }
}
