package com.ssafy.backend.exception.errorcode;

import lombok.Getter;

@Getter
public enum ImageErrorCode {

  NotFoundImage(404,"이미지 파일이 존재하지 않습니다."),
  UploadImageFail(424, "이미지 업로드가 실패했습니다");


  private int code;
  private String description;
  private ImageErrorCode(int code,String description){
    this.code=code;
    this.description=description;
  }
}
