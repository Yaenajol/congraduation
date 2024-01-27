package com.ssafy.backend.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtTokenDto {
  /** JWT 토큰의 값 = idToken에서 나옴 **/
  private String id;
//  private String nickname;
//  private String createdAt;
//  private String expiredAt;
  // 얘네가 되는건지 id가 되는건지... 일단 위에 네개만 보내겠다
//  private String accessToken;
//  private String refreshToken;

}
