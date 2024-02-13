package com.ssafy.backend.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyMemoryResponseDto {
  private int id;
  private String nickname;
  private String content;
  private String image;
}
