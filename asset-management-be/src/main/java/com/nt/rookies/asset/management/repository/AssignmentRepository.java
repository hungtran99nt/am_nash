package com.nt.rookies.asset.management.repository;

import java.util.List;
import java.util.Optional;

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
  
  Optional<Assignment> getStateById(int id);

  List<Assignment> findByAssignTo(User assignTo);

  @Query(value = "SELECT COUNT(*) FROM Assignment a WHERE a.asset.id = :assetId")
  int getTotalHistoricalAssigmentOfAnAsset(@Param("assetId") Integer assetId);
}
