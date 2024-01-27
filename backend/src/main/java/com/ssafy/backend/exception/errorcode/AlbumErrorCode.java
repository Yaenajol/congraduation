package com.ssafy.backend.exception.errorcode;

import lombok.Getter;

@Getter
public enum AlbumErrorCode {
  NotFoundAlbum(404,"해당 앨범은 존재하지 않습니다.");

  private int code;
  private String description;
  private AlbumErrorCode(int code,String description){
    this.code=code;
    this.description=description;
  }
}
