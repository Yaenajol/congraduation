package com.ssafy.backend.exception.errorcode;

import lombok.Getter;

@Getter
public enum MemoryErrorCode {
  NotFoundMemory(404,"해당 메모리가 존재하지 않습니다."),
  NotMatchMember(403,"메모리의 소유자가 아닙니다."),
  NotWritableInYourAlbum(403,"본인 소유의 앨범에는 메모리를 작성할 수 없습니다.");

  private int code;
  private String description;
  private MemoryErrorCode(int code,String description){
    this.code=code;
    this.description=description;
  }
}
