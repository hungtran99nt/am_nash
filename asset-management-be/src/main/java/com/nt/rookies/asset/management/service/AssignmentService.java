package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.exception.ResourceNotFoundException;
import java.sql.SQLException;
import java.util.List;

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
   * @throws ResourceNotFoundException if assignment not found
   */
  AssignmentDTO getAssignmentById(Integer id);

  /**
   * Edit an assignment.
   *
   * @param assignmentDTO edit asset
   * @return edited {@link AssignmentDTO} object
   */
  AssignmentDTO updateAssignment(Integer id, AssignmentDTO assignmentDTO);

  /**
   * Create new Assignment
   *
   * @param assignmentDTO
   * @return
   */
  AssignmentDTO createAssignment(AssignmentDTO assignmentDTO) throws SQLException;
}
