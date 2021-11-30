package com.nt.rookies.asset.management.service;

public interface AssignmentService {
  boolean isAssignmentValidtoDelete(Integer id);

  void deleteAssignment(Integer id);
}
