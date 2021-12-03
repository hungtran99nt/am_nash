package com.nt.rookies.asset.management.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nt.rookies.asset.management.entity.Assignment;
import com.nt.rookies.asset.management.entity.Location;
import com.nt.rookies.asset.management.entity.User;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {
  @Query("SELECT count(*) FROM Assignment a WHERE a.assignTo = :id")
  int getTotalCountByAssigneeId(@Param("id") int id);
  
  /**
   * get state by assignment id
   *
   * @param id current id
   * @return Optional Assignment of that id
   */
  Optional<Assignment> getStateById(int id); 

  /**
   * find assignment by user id
   *
   * @param assignTo current User assignTo
   * @return List of user assignment
   */
  List<Assignment> findByAssignTo(User assignTo);

  /**
   * Get total historical assignment of an asset
   *
   * @param assetId the asset id
   * @return int value total historical assignment
   */
  @Query(value = "SELECT COUNT(*) FROM Assignment a WHERE a.asset.id = :assetId")
  int getTotalHistoricalAssigmentOfAnAsset(@Param("assetId") Integer assetId);

  /**
   * Get recent assignment assign to user
   *
   * @param username current username
   * @return list of recent assignment
   */
  @Query(
      value =
          "FROM Assignment a WHERE a.assignTo.username = :username")
  List<Assignment> findRecentAssignmentsByUser(@Param("username") String username);

  /**
   * Get all assignments by asset location
   *
   * @param location current admin location
   * @return {@link List<Assignment>}
   */
  List<Assignment> findAllByAssetLocation(Location location);
}
