package com.ssafy.backend.model.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyAlbumResponseDto {
  private String albumPk;
  private String nickname;
  private String graduationPlace;
  private String title;
  private String coverUrl;
  private LocalDateTime openAt;
}
