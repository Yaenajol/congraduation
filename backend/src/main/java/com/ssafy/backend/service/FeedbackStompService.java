package com.ssafy.backend.service;

import com.ssafy.backend.exception.CustomException;
import com.ssafy.backend.exception.errorcode.FeedbackErrorCode;
import com.ssafy.backend.mattermost.MMFeedbackManager;
import com.ssafy.backend.model.FeedbackDto;
import com.ssafy.backend.model.FeedbackDto.MessageType;
import com.ssafy.backend.model.MattermostOutgoingDto;
import com.ssafy.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedbackStompService {

  private final SimpMessageSendingOperations sendingOperations;

  private final MMFeedbackManager mmFeedbackManager;

  private final MemberRepository memberRepository;

  @Value("${notification.mattermost-outgoing.token}")
  private String outgoingToken;

  @Value("${notification.mattermost-outgoing.user_id}")
  private String feedManagerId;

  public FeedbackDto sendFeedbackAndMM(FeedbackDto feedbackDto) {

//    // 피드백 작성자 존재 여부 && 에다가 채팅방 번호 확인이기도 하다 ( senderPk == chatRoomId )
//    Optional<Member> optMember = memberRepository.findById(feedbackDto.getSenderPk());    // 메모리 작성자 가져오기
//    if (optMember.isEmpty()) { //해당 멤버가 존재하는가?
//      throw new CustomException(MemberErrorCode.NotFoundMember.getCode(), MemberErrorCode.NotFoundMember.getDescription());
//    }

    // 피드백 채팅 내용 공백인 경우 처리
    if (feedbackDto.getContent().trim().isEmpty()) {
      throw new CustomException(FeedbackErrorCode.NotToEmptyContent.getCode(), FeedbackErrorCode.NotToEmptyContent.getDescription());
    }
    
    // ENTER 입장의 경우 내용은 feedback 보낸 형태 처리 : 수정 필요
    if (FeedbackDto.MessageType.ENTER.equals(feedbackDto.getMessageType())) {
      feedbackDto.setContent(feedbackDto.getSenderPk()+"님이 feedback 을 보내셨습니다.");
    }

    sendingOperations.convertAndSend("/sub/feedback/" + feedbackDto.getChatRoomId(), feedbackDto);
    mmFeedbackManager.sendNotification(feedbackDto);

    return feedbackDto;
  }

  public FeedbackDto outgoingFromMM(MattermostOutgoingDto mattermostOutgoingDto) {

    // 토큰 일치 여부 판단하기 yml 토큰 값이랑 현재 들어온 토큰값 비교해서 판단 다르면 예외처리
    if (mattermostOutgoingDto.getToken().equals(outgoingToken)) {
      throw new CustomException(FeedbackErrorCode.NotMatchToken.getCode(), FeedbackErrorCode.NotMatchToken.getDescription());
    }

    // GET TEXT 가공해서 전달해야한다.
    // 1. content에서 memberPK 와 피드백내용(content) 과 에러처리
    if (mattermostOutgoingDto.getText().isEmpty()) {
      throw new CustomException(FeedbackErrorCode.NotToEmptyContent.getCode(), FeedbackErrorCode.NotToEmptyContent.getDescription());
    }
    // Mattermost 응답형식 ==> FEEDBACK:# memberPk# 1:1문의내용작성테스트작성테스트작성테스트 1:1문의내용작성테스트작성테스트작성테스트 1:1문의내용작성테스트작성테스트작성테스트
    String[] textArray = mattermostOutgoingDto.getText().split("#");

    // 응답 내용이 위와 같은 응답형식이 아닌경우 에러 처리
    if (textArray.length <= 2) {
      throw new CustomException(FeedbackErrorCode.NotToEmptyContent.getCode(), FeedbackErrorCode.NotToEmptyContent.getDescription());
    }

    // 2. FeedbackDto에 할당하기 : 가공 완료 후 Dto에 담기
    FeedbackDto feedbackDto = FeedbackDto.builder()
        .messageType(MessageType.TALK)
        .chatRoomId(textArray[1])
        .senderPk(feedManagerId) // 보낸 사람이 Outgoing properties에 설정된 userId는 관리자 관리자인 것을 알려주는 PK
        .content(textArray[2])
        .build();

    System.out.println("FEEDBACK TO MATTERMOST Feedback answer TEST \n ==>" + feedbackDto.toString());

    sendingOperations.convertAndSend("/sub/feedback/" + feedbackDto.getChatRoomId(), feedbackDto);
    mmFeedbackManager.sendNotification(feedbackDto);  // 다시 mm 으로 보내서 확인하기... // 로직은 다시 고민하기.
    return feedbackDto;
  }


}
