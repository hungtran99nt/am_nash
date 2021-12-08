package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.exception.IllegalAssignmentException;
import com.nt.rookies.asset.management.exception.ResourceDeleteException;
import com.nt.rookies.asset.management.exception.ResourceNotFoundException;
import java.util.List;

/** Service interface for Assignment. */
public interface AssignmentService {

  /**
   * Get all in-progress assignments by current admin location.
   *
   * @return {@link List<AssignmentDTO>}
   */
  List<AssignmentDTO> getAllAssignmentsByLocation();

  /**
   * Get assignment by id.
   *
   * @param id assignment id
   * @return {@link AssignmentDTO} object if found
   * @exception ResourceNotFoundException if assignment not found
   */
  AssignmentDTO getAssignmentById(Integer id);

  /**
   * Get recent assignment of user
   *
   * @return {@link List <AssignmentDTO>} list of assignments
   */
  List<AssignmentDTO> getRecentAssignmentsByUser();

  /**
   * Edit an assignment.
   *
   * @param assignmentDTO edit asset
   * @return edited {@link AssignmentDTO} object
   * @exception ResourceNotFoundException if user not found
   */
  AssignmentDTO updateAssignment(Integer id, AssignmentDTO assignmentDTO);

  /**
   * Create new Assignment
   *
   * @param assignmentDTO
   * @return
   * @exception ResourceNotFoundException if user not found
   */
  AssignmentDTO createAssignment(AssignmentDTO assignmentDTO);

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

  /**
   * User can accept assignment which in state "Waiting for Acceptance"
   * @param assignmentID
   * @exception ResourceNotFoundException if user not found
   */
  AssignmentDTO acceptAssignment(Integer assignmentID);

  /**
   * User can accept assignment which in state "Waiting for Acceptance"
   * @param assignmentID
   */
  void declineAssignment(Integer assignmentID);

  /**
   * Get all request for returning.
   *
   * @return {@link List<AssignmentDTO>} the returning request list
   */
  List<AssignmentDTO> getAllRequestForReturning();

  /**
   * Create request of returning for assignment
   *
   * @param id assignment id
   * @return {@link AssignmentDTO} object
   * @exception ResourceNotFoundException if assignment not found
   * @exception  IllegalAssignmentException if assignment is not in state "Accepted"
   */
  AssignmentDTO createRequestReturning(Integer id);

  /**
   * Complete request of returning for assignment
   *
   * @param id assignment id
   * @return {@link AssignmentDTO} object
   * @exception ResourceNotFoundException if assignment not found or asset not found
   * @exception  IllegalAssignmentException if assignment is not in state "Waiting for returning"
   */
  AssignmentDTO completeRequestReturning(Integer id);
}
