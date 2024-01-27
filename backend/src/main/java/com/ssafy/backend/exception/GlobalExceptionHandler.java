package com.ssafy.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(Exception.class)
  public ResponseEntity<Exception> handleException(Exception e) {
    e.printStackTrace();

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
  }
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<Object> handleUserNotFoundException(CustomException ce){
      return ResponseEntity.status(ce.getCode()).body(ce.getMsg());
    }
}
