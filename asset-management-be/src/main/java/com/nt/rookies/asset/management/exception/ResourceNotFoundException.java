package com.nt.rookies.asset.management.exception;

public class ResourceNotFoundException extends BusinessException{
  @Override
  public String getMessage() {
    return "Resource not found";
  }
}
