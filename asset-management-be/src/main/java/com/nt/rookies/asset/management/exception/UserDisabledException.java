package com.nt.rookies.asset.management.exception;

public class UserDisabledException extends BusinessException {

  public UserDisabledException() {
  }

  public UserDisabledException(String msg) {
    super(msg);
  }

  public UserDisabledException(String msg, Throwable e) {
    super(msg, e);
  }

  public UserDisabledException(String errorCode, String msg) {
    super(errorCode, msg);
  }

  public UserDisabledException(String errorCode, String msg, Throwable e) {
    super(errorCode, msg, e);
  }
}
