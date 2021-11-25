package com.nt.rookies.asset.management.exception;

public class ResourceAlreadyExistsException extends BusinessException {

  public ResourceAlreadyExistsException() {}

  public ResourceAlreadyExistsException(String msg) {
    super(msg);
  }

  public ResourceAlreadyExistsException(String msg, Throwable e) {
    super(msg, e);
  }

  public ResourceAlreadyExistsException(String errorCode, String msg) {
    super(errorCode, msg);
  }

  public ResourceAlreadyExistsException(String errorCode, String msg, Throwable e) {
    super(errorCode, msg, e);
  }
}
