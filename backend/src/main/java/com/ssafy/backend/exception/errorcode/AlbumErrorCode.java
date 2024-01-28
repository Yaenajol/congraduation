package com.ssafy.backend.exception.errorcode;

import lombok.Getter;

@Getter
public enum AlbumErrorCode {
  NotFoundAlbum(404,"해당 앨범은 존재하지 않습니다."),
  NotSettingOpenAt(403,"메모리 앨범의 공개일이 설정되지 않았습니다."),
  NotOpened(403,"아직 앨범의 공개일이 되지 않았습니다."),
  NotWritable(403,"앨범의 공개일 이후에는 메모리를 작성할 수 없습니다."),
  NotMatchMember(403,"앨범의 소유자가 아닙니다."),
  NotSettableGraduationDate(403,"앨범의 공개일이 이미 설정되었습니다."),
  ;

  private int code;
  private String description;
  private AlbumErrorCode(int code,String description){
    this.code=code;
    this.description=description;
  }
}
