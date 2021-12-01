package com.nt.rookies.asset.management.exception;

public class AssignmentNotFound extends BusinessException {

  public AssignmentNotFound() {
  }

  public AssignmentNotFound(String msg) {
    super(msg);
  }

  public AssignmentNotFound(String msg, Throwable e) {
    super(msg, e);
  }

  public AssignmentNotFound(String errorCode, String msg) {
    super(errorCode, msg);
  }

  public AssignmentNotFound(String errorCode, String msg, Throwable e) {
    super(errorCode, msg, e);
  }
}
