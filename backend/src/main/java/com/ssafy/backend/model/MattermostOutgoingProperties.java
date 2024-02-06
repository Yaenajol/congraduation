package com.ssafy.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ConfigurationProperties("notification.mattermost-outgoing")
@Primary
public class MattermostOutgoingProperties {
  private String channel_id;
  private String channel_name;
  private String team_domain;
  private String team_id;
  private String post_id;
  private String text= "";
  private String timestamp;
  private String token;
  private String trigger_word;
  private String user_id;
  private String user_name;
}
