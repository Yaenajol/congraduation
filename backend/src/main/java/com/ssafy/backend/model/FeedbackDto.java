package com.ssafy.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDto {

  // 메시지  타입 : 입장, 채팅
  public enum MessageType{
    ENTER, TALK, QUESTION, ANSWER
  }
  private MessageType messageType; // 메시지 타입
  private String accessToken;  // 보낸사람pk를 accessToken으로 말한다. 따라서 accesstoken 을 파싱해서 알아내기로 간다.
  private String senderPk;  // 보낸사람 pk : pk가 작성자이자 고유의 채팅방 구분자가 된다
  private String albumPk; // 고유 방 구분자 == String AlbumPk;chatRoomId 대신 사용할것
  private String content; // 피드백 내용
  //  private String chatRoomId; // 방 번호 == String senderPk;

}
