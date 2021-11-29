package com.nt.rookies.asset.management.service.impl;

import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.entity.Assignment;
import com.nt.rookies.asset.management.repository.AssignmentRepository;
import com.nt.rookies.asset.management.service.AssignmentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssignmentServiceImpl implements AssignmentService {

  private final AssignmentRepository assignmentRepository;
  private final ModelMapper modelMapper;

  @Autowired
  public AssignmentServiceImpl(AssignmentRepository assignmentRepository, ModelMapper modelMapper) {
    this.assignmentRepository = assignmentRepository;
    this.modelMapper = modelMapper;
  }

  @Override
  public List<AssignmentDTO> getAllAssignments() {
    List<Assignment> assignments = assignmentRepository.findAll();
    return assignments.stream()
        .map(assignment -> modelMapper.map(assignment, AssignmentDTO.class))
        .collect(Collectors.toList());
  }
}
