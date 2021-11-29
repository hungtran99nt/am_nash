package com.nt.rookies.asset.management.controller;

import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1.0/assignments")
public class AssignmentRestController {

  private final AssignmentService assignmentService;

  @Autowired
  public AssignmentRestController(AssignmentService assignmentService) {
    this.assignmentService = assignmentService;
  }

  @GetMapping()
  public List<AssignmentDTO> getAllAssignments() {
    return assignmentService.getAllAssignments();
  }
}
