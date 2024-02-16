package com.ssafy.backend.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemoryResponseDto {
  private String nickname;
  private String ImageUrl;
  private String content;

}
