package com.ssafy.backend.controller;

import com.ssafy.backend.model.FeedbackDto;
import com.ssafy.backend.model.MattermostOutgoingDto;
import com.ssafy.backend.service.FeedbackStompService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class FeedbackStompController {
  private final FeedbackStompService feedbackStompService;

  @MessageMapping("/feedback")
  public ResponseEntity<FeedbackDto> sendFeedbackAndMM(@Payload FeedbackDto feedbackDto) {
    System.out.println(feedbackDto.toString());
    return ResponseEntity.ok().body(feedbackStompService.sendFeedbackAndMM(feedbackDto));
  }

//  @PostMapping("/feedbackFromMM")
//  public ResponseEntity<String> outgoingFromMM(@RequestBody MattermostOutgoingDto mattermostOutgoingDto) {
//    System.out.println(mattermostOutgoingDto.toString());
//
//    return ResponseEntity.ok().body(feedbackStompService.outgoingFromMM(mattermostOutgoingDto));
////    return ResponseEntity.ok().body(mattermostOutgoingDto);
//  }

}