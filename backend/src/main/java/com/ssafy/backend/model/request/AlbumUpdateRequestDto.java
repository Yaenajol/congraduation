package com.ssafy.backend.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AlbumUpdateRequestDto {
  private String nickname;
  private String graduationPlace;
  private String title;
}
