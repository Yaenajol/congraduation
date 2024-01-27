package com.ssafy.backend.exception.errorcode;

import lombok.Getter;

@Getter
public enum JwtErrorCode {
  InvaldJwtSignature(400,"jwt token was broken"),
  ExpiredJwt(400,"jwt was expired"),
  UnsupportedJwt(400,"this jwt is not supported"),
  IllegalArgumentException(400,"jwt claim is empty"),
  JwtReqired(400,"jwt is required"),
  NotFoundRequiredJwtProperty(400,"jwt has no required property")
  ;


  private int code;
  private String description;

  private JwtErrorCode(int code, String description) {
    this.code = code;
    this.description = description;
  }
}
