package com.nt.rookies.asset.management.service;


import java.util.List;
import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.exception.ResourceDeleteException;
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

  /**
   * Check removable assignment
   * 
   * @param id
   * @return {@link boolean} true if able to delete, and vice versa
   */
  boolean isAssignmentValidtoDelete(Integer id);


  /**
   * Delete assignment
   * 
   * @param id
   * @return void
   * @exception ResourceDeleteException if can not delete assignment
   */
  void deleteAssignment(Integer id);

}
