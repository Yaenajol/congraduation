package com.ssafy.backend.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlbumMemoryResponseDto {
  private String memoryPk;
  private String imageUrl;
  private String nickName;
}
