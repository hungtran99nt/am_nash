package com.nt.rookies.asset.management.repository;

import com.nt.rookies.asset.management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer> {
  // TODO: finish query
  String findMaxUsernameContains(String keyword);
}
