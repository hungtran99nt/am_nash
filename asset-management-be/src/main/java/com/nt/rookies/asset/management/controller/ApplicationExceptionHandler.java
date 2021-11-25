package com.nt.rookies.asset.management.controller;

import com.nt.rookies.asset.management.exception.AccountNotAllowedException;
import com.nt.rookies.asset.management.exception.BusinessException;
import com.nt.rookies.asset.management.exception.ErrorResponse;
import com.nt.rookies.asset.management.exception.ResourceAlreadyExistsException;
import com.nt.rookies.asset.management.exception.ResourceNotFoundException;
import com.nt.rookies.asset.management.exception.UserDisabledException;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApplicationExceptionHandler {
  Logger logger = LoggerFactory.getLogger(ApplicationExceptionHandler.class);

  @ExceptionHandler(value = BusinessException.class)
  public ResponseEntity<ErrorResponse> handleException(
      BusinessException ex, HttpServletRequest request) {
    logger.info("Business exception: " + ex.getClass().getName());
    ex.printStackTrace();

    HttpStatus httpStatus;
    if (ex instanceof ResourceNotFoundException) {
      httpStatus = HttpStatus.NOT_FOUND;
    } else if (ex instanceof ResourceAlreadyExistsException) {
      httpStatus = HttpStatus.CONFLICT;
    } else if (ex instanceof AccountNotAllowedException) {
      httpStatus = HttpStatus.METHOD_NOT_ALLOWED;
    } else if (ex instanceof UserDisabledException) {
      httpStatus = HttpStatus.NOT_ACCEPTABLE;
    } else {
      httpStatus = HttpStatus.BAD_REQUEST;
    }
    ErrorResponse error =
        new ErrorResponse(request.getRequestURI(), httpStatus.value(), ex.getMessage());
    return new ResponseEntity<>(error, httpStatus);
  }

  //  @ExceptionHandler(value = IllegalArgumentException.class)
  //  public ResponseEntity<ErrorResponse> handleAssertError(
  //      AssertionError ex, HttpServletRequest request) {
  //    logger.info("Illegal argument: " + ex.getClass().getName());
  //    ex.printStackTrace();
  //
  //    HttpStatus httpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
  //    ErrorResponse error =
  //        new ErrorResponse(
  //            request.getRequestURI(), httpStatus.value(), httpStatus.getReasonPhrase());
  //    return new ResponseEntity<>(error, httpStatus);
  //  }

  @ExceptionHandler(value = Exception.class)
  public ResponseEntity<ErrorResponse> handleException(Exception ex, HttpServletRequest request) {
    logger.info("Exception: " + ex.getClass().getName());
    ex.printStackTrace();

    HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    ErrorResponse error =
        new ErrorResponse(
            request.getRequestURI(), httpStatus.value(), httpStatus.getReasonPhrase());
    return new ResponseEntity<>(error, httpStatus);
  }
}
