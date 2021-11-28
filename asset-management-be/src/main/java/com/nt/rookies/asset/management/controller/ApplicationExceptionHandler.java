package com.nt.rookies.asset.management.controller;

import com.nt.rookies.asset.management.exception.AccountNotAllowedException;
import com.nt.rookies.asset.management.exception.BusinessException;
import com.nt.rookies.asset.management.exception.ErrorResponse;
import com.nt.rookies.asset.management.exception.ResourceAlreadyExistsException;
import com.nt.rookies.asset.management.exception.ResourceNotFoundException;
import com.nt.rookies.asset.management.exception.UserDisabledException;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

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

  @ExceptionHandler(value = MethodArgumentTypeMismatchException.class)
  public ResponseEntity<ErrorResponse> handleMethodArgumentTypeMismatchException(
      MethodArgumentTypeMismatchException ex, HttpServletRequest request) {
    logger.info("Illegal API parameter: " + ex.getClass().getName());
    ex.printStackTrace();

    HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
    ErrorResponse error =
        new ErrorResponse(
            request.getRequestURI(), httpStatus.value(), httpStatus.getReasonPhrase());
    return new ResponseEntity<>(error, httpStatus);
  }

  @ExceptionHandler(value = MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleMethodArgumentTypeMismatchException(
      MethodArgumentNotValidException ex, HttpServletRequest request) {
    logger.info("Invalid API argument: " + ex.getClass().getName());
    ex.printStackTrace();
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult()
        .getAllErrors()
        .forEach(
            (error) -> {
              String fieldName = ((FieldError) error).getField();
              String errorMessage = error.getDefaultMessage();
              errors.put(fieldName, errorMessage);
            });
    String errorMsg =
        "Server side validation failed: \n"
            + errors.keySet().stream()
                .reduce("", (result, element) -> result + errors.get(element) + "\n");
    HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
    ErrorResponse error = new ErrorResponse(request.getRequestURI(), httpStatus.value(), errorMsg);
    return new ResponseEntity<>(error, httpStatus);
  }

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
