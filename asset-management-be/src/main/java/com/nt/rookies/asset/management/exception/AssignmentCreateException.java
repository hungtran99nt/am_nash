package com.nt.rookies.asset.management.exception;

public class AssignmentCreateException extends BusinessException{
  public AssignmentCreateException() {
  }

  public AssignmentCreateException(String msg) {
    super(msg);
  }

  public AssignmentCreateException(String msg, Throwable e) {
    super(msg, e);
  }

  public AssignmentCreateException(String errorCode, String msg) {
    super(errorCode, msg);
  }

  public AssignmentCreateException(String errorCode, String msg, Throwable e) {
    super(errorCode, msg, e);
  }
}
