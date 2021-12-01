package com.nt.rookies.asset.management.repository;

import com.nt.rookies.asset.management.entity.Assignment;
import com.nt.rookies.asset.management.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {
  @Query("SELECT count(*) FROM Assignment a WHERE a.assignTo = :id")
  int getTotalCountByAssigneeId(@Param("id") int id);

  List<Assignment> findByAssignTo(User assignTo);

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
          "FROM Assignment a WHERE a.assignTo.username = :username AND a.assignedDate <= current_date")
  List<Assignment> findRecentAssignmentsByUser(@Param("username") String username);
}
