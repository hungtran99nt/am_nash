package com.nt.rookies.asset.management.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.service.AssignmentService;

/** REST controller for Assignment. */
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
   * API check valid assignment to delete. <br>
   * Link: <code>/{id}/validAssignment</code> <br>
   * Method: GET
   * 
   * @param id assignment id
   * @return
   */
  @GetMapping("/{id}/valid")
  public ResponseEntity<Boolean> isAssignmentValidtoDelete(@PathVariable(name = "id") Integer id) {
    return new ResponseEntity<>(assignmentService.isAssignmentValidtoDelete(id), HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public void deleteAssignment(@PathVariable(name = "id") Integer id) {
    assignmentService.deleteAssignment(id);
  }
}
