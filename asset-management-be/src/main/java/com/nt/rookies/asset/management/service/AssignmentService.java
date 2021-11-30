package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.exception.ResourceNotFoundException;
import java.util.List;

/** Service interface for Assignment. */
public interface AssignmentService {

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
}
