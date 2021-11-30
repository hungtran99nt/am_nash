package com.nt.rookies.asset.management.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.entity.Assignment;
import com.nt.rookies.asset.management.exception.ResourceDeleteException;
import com.nt.rookies.asset.management.exception.ResourceNotFoundException;
import com.nt.rookies.asset.management.repository.AssignmentRepository;
import com.nt.rookies.asset.management.service.AssignmentService;

/** Implementation of <code>AssignmentService</code>. */
@Service
public class AssignmentServiceImpl implements AssignmentService {
  private final Logger logger = LoggerFactory.getLogger(AssetServiceImpl.class);
  private final AssignmentRepository assignmentRepository;
  private final ModelMapper modelMapper;

  @Autowired
  public AssignmentServiceImpl(AssignmentRepository assignmentRepository, ModelMapper modelMapper) {
    this.assignmentRepository = assignmentRepository;
    this.modelMapper = modelMapper;
  }

  @Override
  public List<AssignmentDTO> getAllAssignments() {
    logger.info("Get all assignments");
    List<Assignment> assignments = assignmentRepository.findAll();
    return assignments.stream().map(assignment -> modelMapper.map(assignment, AssignmentDTO.class)).collect(Collectors.toList());
  }

  public AssignmentDTO getAssignmentById(Integer id) {
    logger.info("Inside getAssignmentById() method");
    Assignment assignment = assignmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Not found assignment"));
    return modelMapper.map(assignment, AssignmentDTO.class);
  }

  @Override
  public boolean isAssignmentValidtoDelete(Integer id) {
    String state = assignmentRepository.getUserStateByAssignmentId(id);
    return !(state.equalsIgnoreCase("Accepted") || state.equalsIgnoreCase("Waiting for returning"));
  }

  @Override
  public void deleteAssignment(Integer id) {
    if (isAssignmentValidtoDelete(id)) {
      Assignment assignment = assignmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Assignment not found"));
      logger.info("assignment la:" + assignment);
      assignmentRepository.delete(assignment);
    } else {
      throw new ResourceDeleteException("Cannot delete this assignment");
    }
  }
}


