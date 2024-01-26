package com.ssafy.backend.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class LoginResponseDto {
  /** 로그인 후 응답 **/
  private String jwtToken;
  private String albumPk;

}
