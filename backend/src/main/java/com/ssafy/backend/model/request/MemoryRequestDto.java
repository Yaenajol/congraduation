package com.ssafy.backend.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemoryRequestDto {

  private String albumPk;
  private String memberPk;
  private String nickname;
  private String imageUrl;
  private String content;

}