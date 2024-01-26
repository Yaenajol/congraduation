package com.ssafy.backend.model.response;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class KakaoInfoDto {
  /** 사용자 정보 dto **/
  @NotNull
  private String id;
  @NotNull
  private String nickname;
  private String accessToken;
  private String refreshToken;
  private String albumPk;
  private boolean authority;

}