package com.ssafy.backend.exception.errorcode;

import lombok.Getter;

@Getter
public enum MemoryErrorCode {
  NotFoundMemory(404,"해당 메모리가 존재하지 않습니다.");

  private int code;
  private String description;
  private MemoryErrorCode(int code,String description){
    this.code=code;
    this.description=description;
  }
}
