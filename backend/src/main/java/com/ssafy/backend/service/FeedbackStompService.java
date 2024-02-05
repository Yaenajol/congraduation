package com.ssafy.backend.service;

import com.google.gson.Gson;
import com.ssafy.backend.exception.CustomException;
import com.ssafy.backend.exception.errorcode.FeedbackErrorCode;
import com.ssafy.backend.mattermost.MMFeedbackManager;
import com.ssafy.backend.model.FeedbackDto;
import com.ssafy.backend.model.MattermostOutgoingProperties;
import com.ssafy.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FeedbackStompService {

  private final SimpMessageSendingOperations sendingOperations;
  @Autowired
  private final MMFeedbackManager mmFeedbackManager;
  private final MemberRepository memberRepository;

  public FeedbackDto sendFeedbackAndMM(FeedbackDto feedbackDto) {

//    // 피드백 작성자 존재 여부
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

  public FeedbackDto outgoingFromMM(Gson gson) {

    // 토큰 일치 여부 판단하기yml 토큰 값이랑 현재 들어온 토큰값 비교해서 판단 다르면 예외처리
//    MattermostOutgoingProperties

    FeedbackDto feedbackDto = new FeedbackDto();

    sendingOperations.convertAndSend("/sub/feedback/" + feedbackDto.getChatRoomId(), feedbackDto);
    return feedbackDto;
  }


}
