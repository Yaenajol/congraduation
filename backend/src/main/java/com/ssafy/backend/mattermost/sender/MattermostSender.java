package com.ssafy.backend.mattermost.sender;

import com.google.gson.Gson;
import com.ssafy.backend.model.FeedbackDto;
import com.ssafy.backend.model.MattermostIncomingDto.Attachment;
import com.ssafy.backend.model.MattermostIncomingDto.Attachments;
import com.ssafy.backend.model.MattermostIncomingProperties;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class MattermostSender {
  private Logger log = LoggerFactory.getLogger(MattermostSender.class);
  @Value("${notification.mattermost.enabled}")
  private boolean mmEnabled;
  @Value("${notification.mattermost.webhook-url}")
  private String webhookUrl;

  private final RestTemplate restTemplate;
  private final MattermostIncomingProperties mmProperties;

  public void sendMessage(FeedbackDto feedbackDto) {
    if (!mmEnabled) {
      return;
    }
    try {
      Attachment attachment = Attachment.builder()
          .channel(mmProperties.getChannel())
          .authorIcon(mmProperties.getAuthorIcon())
          .authorName(mmProperties.getAuthorName())
          .color(mmProperties.getColor())
          .pretext(mmProperties.getPretext())
          .title(mmProperties.getTitle())
          .text(mmProperties.getText())
          .footer(mmProperties.getFooter())
          .build();

      attachment.addFeedbackInfo(feedbackDto);
      Attachments attachments = new Attachments(attachment);
      String payload = new Gson().toJson(attachments);

      HttpHeaders headers = new HttpHeaders();
      headers.set("Content-type", MediaType.APPLICATION_JSON_VALUE);

      HttpEntity<String> entity = new HttpEntity<>(payload, headers);
      restTemplate.postForEntity(webhookUrl, entity, String.class);
    } catch (Exception e) {
      log.error("#### ERROR!! Notification Manager : {}", e.getMessage());
    }

  }

}
