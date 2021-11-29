package com.nt.rookies.asset.management.service;

import com.nt.rookies.asset.management.dto.AssignmentDTO;

import java.util.List;

public interface AssignmentService {
    /**
     * Create new Assignment
     * @param assignmentDTO
     * @return
     */
    AssignmentDTO createAssignment(AssignmentDTO assignmentDTO);

    boolean isValidToCreate(String assignToUsername, String assetCode);
    /**
     * Get all user's assignments by username
     * @return
     */
    List<AssignmentDTO> findAllByUsername();
}
