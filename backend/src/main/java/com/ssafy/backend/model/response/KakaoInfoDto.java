package com.ssafy.backend.model.response;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KakaoInfoDto {

  @NotNull
  private String id;
  @NotNull
  private String nickname;
  private String accessToken;
  private String refreshToken;
  private String albumPk;
  private boolean authority;

}