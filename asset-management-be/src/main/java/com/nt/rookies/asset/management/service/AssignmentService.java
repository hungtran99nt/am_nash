package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.exception.ResourceNotFoundException;

import java.sql.SQLException;
import java.util.List;

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

}
