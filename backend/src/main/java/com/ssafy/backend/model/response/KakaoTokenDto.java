package com.ssafy.backend.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KakaoTokenDto {
  /** 카카오 토큰 응답**/
  private String idToken;
  private String accessToken;
  private String refreshToken;
  private String tokenType;
  private Integer expiresIn; // accessToken의 유효시간. idToken의 유효시간과 동일
  private Integer refreshTokenExpiresin;
  private String scope;
}
