package com.ssafy.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class MattermostOutgoingDto {
  private String token ;
  private String team_id;
  private String team_domain;

  private String channel_id;
  private String channel_name;

  private String timestamp ;

  private String user_id ;
  private String user_name ;

  private String post_id;
  private String text ;

  private String trigger_word ;
}
