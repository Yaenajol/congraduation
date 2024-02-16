package com.ssafy.backend.service;

import com.ssafy.backend.domain.Album;
import com.ssafy.backend.exception.CustomException;
import com.ssafy.backend.exception.errorcode.FeedbackErrorCode;
import com.ssafy.backend.jwt.JwtService;
import com.ssafy.backend.mattermost.MMFeedbackManager;
import com.ssafy.backend.model.FeedbackDto;
import com.ssafy.backend.model.FeedbackDto.MessageType;
import com.ssafy.backend.model.MattermostOutgoingDto;
import com.ssafy.backend.repository.AlbumRepository;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedbackStompService {

  private final SimpMessageSendingOperations sendingOperations;
  private final MMFeedbackManager mmFeedbackManager;
  private final AlbumRepository albumRepository;
  private final JwtService jwtService;

  @Value("${notification.mattermost-outgoing.token}")
  private String outgoingToken;

  public FeedbackDto sendFeedbackAndMM(FeedbackDto feedbackDto) {

//    log.info("feedback chating data : " + feedbackDto.toString());
    /* 토큰 유효성 검사 + accessToken 으로 senderPk 추출하고 설정 */
    feedbackDto.setSenderPk(jwtService.parseJwtToken(feedbackDto.getAccessToken()));

     /* 디비 접근 과부하 이슈로 현재 보류 */
//    // 피드백 작성자 존재 여부 && 채팅방 번호 확인 ( senderPk == chatRoomId )
//    Optional<Member> optMember = memberRepository.findById(feedbackDto.getSenderPk());    // 메모리 작성자 가져오기
//    if (optMember.isEmpty()) { //해당 멤버가 존재하는가?
//      throw new CustomException(MemberErrorCode.NotFoundMember.getCode(), MemberErrorCode.NotFoundMember.getDescription());
//    }

    // 피드백 채팅 내용 공백인 경우 처리
    if (feedbackDto.getContent().trim().isEmpty()) {
      throw new CustomException(FeedbackErrorCode.NotToEmptyContent.getCode(), FeedbackErrorCode.NotToEmptyContent.getDescription());
    }

    // ENTER 입장의 경우 내용은 feedback 보낸 형태 처리 : 수정 필요
//    if (FeedbackDto.MessageType.ENTER.equals(feedbackDto.getMessageType())) {
//      feedbackDto.setContent( "SenderPk : " + feedbackDto.getSenderPk() + "님이 feedback 을 보내셨습니다.");
//    }

    feedbackDto.setMessageType(MessageType.QUESTION); // 채팅 내용 응답 세팅
    sendingOperations.convertAndSend("/sub/feedback/" + feedbackDto.getAlbumPk(), feedbackDto);
    mmFeedbackManager.sendNotification(feedbackDto);

    return feedbackDto;
  }

  public String outgoingFromMM(MattermostOutgoingDto mattermostOutgoingDto) {

    if (!mattermostOutgoingDto.getToken().equals(outgoingToken)) {
      throw new CustomException(FeedbackErrorCode.NotMatchToken.getCode(), FeedbackErrorCode.NotMatchToken.getDescription());
    }
    // GET TEXT 가공해서 전달
    // 1. content 에서 memberPK 와 피드백내용(content) 과 에러처리
    if (mattermostOutgoingDto.getText().isEmpty()) {
      throw new CustomException(FeedbackErrorCode.NotToEmptyContent.getCode(), FeedbackErrorCode.NotToEmptyContent.getDescription());
    }
    // Mattermost 응답형식 ==> FEEDBACK:# sendPk# 1:1문의내용작성테스트작성테스트작성테스트 1:1문의내용작성테스트작성테스트작성테스트 1:1문의내용작성테스트작성테스트작성테스트
    String[] textArray = mattermostOutgoingDto.getText().split("#");
    // 응답 내용이 위와 같은 응답형식이 아닌경우 에러 처리
    if (textArray.length <= 2) {
      throw new CustomException(FeedbackErrorCode.NotToEmptyContent.getCode(), FeedbackErrorCode.NotToEmptyContent.getDescription());
    }

    // 관리자가 보낸 응답에 포함되어있는 memberPk로 앨범pk 전달 : 전달시 앨범pk전달할건지 맴버pk 전달할건지 고민필요
//    String memberPk = textArray[1].trim();
     String albumPk = textArray[1].trim();
//    Album album = albumRepository.findByMemberPk(albumPk);
    String content = textArray[2];


    // 2. FeedbackDto에 할당하기 : 가공 완료 후 Dto에 담기
    FeedbackDto feedbackDto = FeedbackDto.builder()
        .messageType(MessageType.ANSWER)
        .albumPk(albumPk)
        .senderPk("feedManager")
        .accessToken("feedManager") // 보낸 사람이 Outgoing properties에 설정된 userId는 관리자 관리자인 것을 알려주는 PK
        .content(content)
        .build();

    sendingOperations.convertAndSend("/sub/feedback/" + feedbackDto.getAlbumPk(), feedbackDto);
    mmFeedbackManager.sendNotification(feedbackDto);  // 다시 mm 으로 보내서 확인하기... // 로직은 다시 고민하기.
    return "success";
  }


}