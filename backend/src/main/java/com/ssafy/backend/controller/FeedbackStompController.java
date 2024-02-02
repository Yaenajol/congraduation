package com.ssafy.backend.controller;


import com.ssafy.backend.model.FeedbackDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class FeedbackStompController {

  private final SimpMessageSendingOperations sendingOperations;

  @MessageMapping("/feedback")
  public void enterandfeedback(FeedbackDto feedbackDto) {
    if (FeedbackDto.MessageType.ENTER.equals(feedbackDto.getMessageType())) {
      feedbackDto.setContent(feedbackDto.getSenderPk()+"님이 feedback을 보내셨습니다.");
    }
    log.info("getChatRoomId = {}", feedbackDto.getChatRoomId());
    sendingOperations.convertAndSend("/sub/feedback/" + feedbackDto.getChatRoomId(), feedbackDto);
  }



}