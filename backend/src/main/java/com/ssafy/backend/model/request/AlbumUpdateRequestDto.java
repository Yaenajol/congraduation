package com.ssafy.backend.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
public class AlbumUpdateRequestDto {
  private String nickname;
  private String graduationPlace;
  private String title;
  private String coverUrl;
  private String graduationDate;
}
