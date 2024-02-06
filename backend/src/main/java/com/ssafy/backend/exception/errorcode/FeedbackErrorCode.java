package com.ssafy.backend.exception.errorcode;

import javax.management.loading.MLetContent;
import lombok.Getter;

@Getter
public enum FeedbackErrorCode {

  NotToEmptyContent(400, "채팅 내용이 빈칸으로 작성되고 있습니다. 내용을 작성해주세요"),
  NotMatchToken(400, "outgoing Token 값이 일치하지 않습니다."),
  ;

  private int code;
  private String description;
  private FeedbackErrorCode(int code, String description){
    this.code = code;
    this.description = description;
  }
}
