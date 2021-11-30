package com.nt.rookies.asset.management.service;


import java.sql.SQLException;
import java.util.List;
import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.exception.ResourceDeleteException;
import com.nt.rookies.asset.management.exception.ResourceNotFoundException;

/**
 * Service interface for Assignment.
 */
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
   * Create new Assignment
   *
   * @param assignmentDTO
   * @return
   */
  AssignmentDTO createAssignment(AssignmentDTO assignmentDTO) throws SQLException;

  /**
   * Check removable assignment
   * 
   * @param id
   * @return {@link boolean} true if able to delete, and vice versa
   */
  boolean isAssignmentValidToDelete(Integer id);


  /**
   * Delete assignment
   * 
   * @param id
   * @return void
   * @exception ResourceDeleteException if can not delete assignment
   */
  void deleteAssignment(Integer id);

}
