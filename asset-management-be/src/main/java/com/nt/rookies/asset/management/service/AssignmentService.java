package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.dto.AssignmentDTO;

import java.util.List;

/** Service interface for Assignment. */
public interface AssignmentService {

  /**
   * Get all assignments.
   *
   * @return {@link List<AssignmentDTO>}
   */
  List<AssignmentDTO> getAllAssignments();
}
