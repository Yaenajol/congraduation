package com.ssafy.backend.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class KakaoTokenDto {
  private String accessToken;
  private String refreshToken;
  private String tokenType;
  private Integer expiresIn;
  private Integer refreshTokenExpiresin;
  private String scope;

}
