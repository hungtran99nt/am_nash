package com.nt.rookies.asset.management.exception;

public class IllegalAssignmentException extends BusinessException{
  public IllegalAssignmentException() {
  }

  public IllegalAssignmentException(String msg) {
    super(msg);
  }

  public IllegalAssignmentException(String msg, Throwable e) {
    super(msg, e);
  }

  public IllegalAssignmentException(String errorCode, String msg) {
    super(errorCode, msg);
  }

  public IllegalAssignmentException(String errorCode, String msg, Throwable e) {
    super(errorCode, msg, e);
  }
}
