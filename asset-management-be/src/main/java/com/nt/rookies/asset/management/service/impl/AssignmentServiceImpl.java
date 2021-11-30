package com.nt.rookies.asset.management.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nt.rookies.asset.management.entity.Assignment;
import com.nt.rookies.asset.management.repository.AssignmentRepository;
import com.nt.rookies.asset.management.service.AssignmentService;

@Service
public class AssignmentServiceImpl implements AssignmentService {


  private final AssignmentRepository assignmentRepository;


  @Autowired
  public AssignmentServiceImpl(AssignmentRepository assignmentRepository) {
    this.assignmentRepository = assignmentRepository;

  }

  @Override
  public boolean isAssignmentValidtoDelete(Integer id) {
    List<Assignment> assignList = assignmentRepository.getUserStateByAssignmentId(id);
    if (assignList.isEmpty()) {
      return true;
    } else
      return false;
  }

  @Override
  public void deleteAssignment(Integer id) {
    assignmentRepository.findById(id);
    assignmentRepository.deleteById(id);
  }


}
