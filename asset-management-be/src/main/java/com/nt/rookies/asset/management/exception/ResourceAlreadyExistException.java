package com.nt.rookies.asset.management.exception;

public class ResourceAlreadyExistException extends BusinessException{
  @Override
  public String getMessage() {
    return "Resource already existed";
  }
}
