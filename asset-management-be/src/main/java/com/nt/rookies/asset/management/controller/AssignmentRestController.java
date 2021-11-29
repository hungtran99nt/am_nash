package com.nt.rookies.asset.management.controller;

import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1.0/assignments")
public class AssignmentRestController {
    public final AssignmentService assignmentService;

    @Autowired
    public AssignmentRestController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @PostMapping()
    public AssignmentDTO createAssignment (@RequestBody AssignmentDTO assignmentDTO){
        return assignmentService.createAssignment(assignmentDTO);
    }
}
