package com.nt.rookies.asset.management.repository;

import com.nt.rookies.asset.management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {}
