package com.nt.rookies.asset.management.service.impl;

import com.nt.rookies.asset.management.dto.AssignmentDTO;
import com.nt.rookies.asset.management.entity.Assignment;
import com.nt.rookies.asset.management.exception.ResourceNotFoundException;
import com.nt.rookies.asset.management.repository.AssignmentRepository;
import com.nt.rookies.asset.management.service.AssignmentService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/** Implementation of <code>AssignmentService</code>. */
@Service
public class AssignmentServiceImpl implements AssignmentService {
  private final Logger logger = LoggerFactory.getLogger(AssetServiceImpl.class);
  private final AssignmentRepository repository;
  private final ModelMapper modelMapper;

  @Autowired
  public AssignmentServiceImpl(AssignmentRepository repository, ModelMapper modelMapper) {
    this.repository = repository;
    this.modelMapper = modelMapper;
  }

  @Override
  public AssignmentDTO getAssignmentById(Integer id) {
    logger.info("Inside getAssignmentById() method");
    Assignment assignment =
        repository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Not found assignment"));
    return modelMapper.map(assignment, AssignmentDTO.class);
  }
}
