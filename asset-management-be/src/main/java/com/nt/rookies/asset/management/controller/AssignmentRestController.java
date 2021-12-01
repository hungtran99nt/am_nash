package com.nt.rookies.asset.management.controller;

import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

/**
 * REST controller for Assignment.
 */
@RestController
@RequestMapping("/api/v1.0/assignments")
public class AssignmentRestController {
    private final AssignmentService assignmentService;

    @Autowired
    public AssignmentRestController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    /**
     * API Get all assignment <br>
     * Link: <code>/api/v1.0/assignments</code> <br>
     * Method: GET
     *
     * @return {@link List<AssignmentDTO>}
     */
    @GetMapping()
    public List<AssignmentDTO> getAllAssignments() {
        return assignmentService.getAllAssignments();
    }

    /**
     * API Get assignment by id. <br>
     * Link: <code>/api/v1.0/assignments/{id}</code> <br>
     * Method: GET
     *
     * @param id assignment id
     * @return {@link AssignmentDTO} object if found
     */
    @GetMapping("/{id}")
    public AssignmentDTO getAssignmentById(@PathVariable("id") Integer id) {
        return assignmentService.getAssignmentById(id);
    }

  /**
   * API Create assignment
   * @param assignmentDTO
   * @return
   * @throws SQLException
   */
    @PostMapping()
    public AssignmentDTO createAssignment(@RequestBody AssignmentDTO assignmentDTO) throws Exception {
        return assignmentService.createAssignment(assignmentDTO);
    }
}
