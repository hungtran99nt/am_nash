package com.nt.rookies.asset.management.repository;

import java.util.List;

import com.nt.rookies.asset.management.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.nt.rookies.asset.management.entity.Assignment;
import com.nt.rookies.asset.management.entity.User;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {
  @Query("SELECT count(*) FROM Assignment a WHERE a.assignTo = :id")
  int getTotalCountByAssigneeId(@Param("id") int id);

  @Query("SELECT state FROM Assignent a WHERE a.id = :id and a.state = 'Waiting For returning' or a.state='Accepted'")
  List<Assignment> getUserStateByAssignmentId(@Param("id") int id);

  List<Assignment> findByAssignTo(User assignTo);

  @Query(value = "SELECT COUNT(*) FROM Assignment a WHERE a.asset.id = :assetId")
  int getTotalHistoricalAssigmentOfAnAsset(@Param("assetId") Integer assetId);
}
