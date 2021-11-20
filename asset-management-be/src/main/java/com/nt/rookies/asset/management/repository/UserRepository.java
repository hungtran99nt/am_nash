package com.nt.rookies.asset.management.repository;

import com.nt.rookies.asset.management.entity.Location;
import com.nt.rookies.asset.management.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  @Query("SELECT u FROM User u WHERE u.username = :username")
  User findByUsername(@Param("username") String username);

  List<User> findAllByLocation(Location location);

  // TODO: finish query
  @Query("SELECT count (u) FROM User u WHERE u.username like :username%")
  Integer findCountUsername(@Param("username") String username);
}
