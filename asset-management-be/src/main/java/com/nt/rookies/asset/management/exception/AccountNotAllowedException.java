package com.nt.rookies.asset.management.exception;

public class AccountNotAllowedException extends BusinessException{

  public AccountNotAllowedException() {
  }

  public AccountNotAllowedException(String msg) {
    super(msg);
  }

  public AccountNotAllowedException(String msg, Throwable e) {
    super(msg, e);
  }

  public AccountNotAllowedException(String errorCode, String msg) {
    super(errorCode, msg);
  }

  public AccountNotAllowedException(String errorCode, String msg, Throwable e) {
    super(errorCode, msg, e);
  }
}
