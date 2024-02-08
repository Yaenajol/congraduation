package com.ssafy.backend.mattermost;

import com.ssafy.backend.mattermost.sender.MattermostSender;
import com.ssafy.backend.model.FeedbackDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;


@Component
@RequiredArgsConstructor
public class MMFeedbackManager {
  private Logger log = LoggerFactory.getLogger(MattermostSender.class);

  private final MattermostSender mmSender;

  public void sendNotification(FeedbackDto feedbackDto) {
    log.info("#### SEND MM Feedback " + feedbackDto.toString());
    mmSender.sendMessage(feedbackDto);
  }
}
