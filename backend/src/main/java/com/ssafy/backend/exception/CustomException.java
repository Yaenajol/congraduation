package com.ssafy.backend.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CustomException  extends RuntimeException{
  private final int code;
  private final String msg;
}

