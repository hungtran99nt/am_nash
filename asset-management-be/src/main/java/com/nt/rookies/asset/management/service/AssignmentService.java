package com.nt.rookies.asset.management.service;


import java.util.List;
import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.exception.ResourceNotFoundException;

/** Service interface for Assignment. */
public interface AssignmentService {

  /**
   * Get all assignments.
   *
   * @return {@link List<AssignmentDTO>}
   */
  List<AssignmentDTO> getAllAssignments();

  /**
   * Get assignment by id.
   *
   * @param id assignment id
   * @return {@link AssignmentDTO} object if found
   * @exception ResourceNotFoundException if assignment not found
   */
  AssignmentDTO getAssignmentById(Integer id);

  boolean isAssignmentValidtoDelete(Integer id);

  void deleteAssignment(Integer id);

}
