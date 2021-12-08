package com.nt.rookies.asset.management.repository;

import com.nt.rookies.asset.management.entity.Location;
import com.nt.rookies.asset.management.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  /**
   * Find user by username
   *
   * @param username of user
   * @return Optional of @{@link User} object
   */
  @Query("SELECT u FROM User u WHERE u.username = :username")
  Optional<User> findByUsername(@Param("username") String username);

  List<User> findAllByLocation(Location location);

  @Query(
      value =
          "SELECT MAX(CAST(REPLACE(UPPER(username), UPPER(:username), '') AS UNSIGNED)) AS numbers "
              + "FROM user WHERE username LIKE CONCAT(:username, '%');",
      nativeQuery = true)
  Optional<Integer> findMaxUsernamePostfix(@Param("username") String username);
}
