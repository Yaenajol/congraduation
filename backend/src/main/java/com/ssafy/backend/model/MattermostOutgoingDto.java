package com.ssafy.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MattermostOutgoingDto {

  private String channel_id;
  private String channel_name;
  private String team_domain;
  private String team_id;
  private String post_id;
  private String text ;
  private String timestamp ;
  private String token ;
  private String trigger_word ;
  private String user_id ;
  private String user_name ;
}
