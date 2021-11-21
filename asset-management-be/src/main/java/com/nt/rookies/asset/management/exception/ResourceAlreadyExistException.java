package com.nt.rookies.asset.management.exception;

public class ResourceAlreadyExistException extends BusinessException {

  public ResourceAlreadyExistException() {}

  public ResourceAlreadyExistException(String msg) {
    super(msg);
  }

  public ResourceAlreadyExistException(String msg, Throwable e) {
    super(msg, e);
  }

  public ResourceAlreadyExistException(String errorCode, String msg) {
    super(errorCode, msg);
  }

  public ResourceAlreadyExistException(String errorCode, String msg, Throwable e) {
    super(errorCode, msg, e);
  }
}
