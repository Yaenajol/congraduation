package com.ssafy.backend.exception.errorcode;

import lombok.Getter;

@Getter
public enum MemberErrorCode {
  NotFoundMember(404,"해당 유저는 존재하지 않습니다."),
  NotGettableMemoryList(403,"공개일을 넘기지 못했기에 메모리들을 조회할 수 없습니다.");

  private int code;
  private String description;
  private MemberErrorCode(int code,String description){
    this.code=code;
    this.description=description;
  }
}
