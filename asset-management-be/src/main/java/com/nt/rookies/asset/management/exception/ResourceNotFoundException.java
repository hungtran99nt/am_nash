package com.nt.rookies.asset.management.exception;

public class ResourceNotFoundException extends BusinessException {

  public ResourceNotFoundException() {}

  public ResourceNotFoundException(String msg) {
    super(msg);
  }

  public ResourceNotFoundException(String msg, Throwable e) {
    super(msg, e);
  }

  public ResourceNotFoundException(String errorCode, String msg) {
    super(errorCode, msg);
  }

  public ResourceNotFoundException(String errorCode, String msg, Throwable e) {
    super(errorCode, msg, e);
  }
}
