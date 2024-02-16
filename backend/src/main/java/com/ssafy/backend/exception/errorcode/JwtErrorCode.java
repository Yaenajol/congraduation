package com.ssafy.backend.exception.errorcode;

import lombok.Getter;

@Getter
public enum JwtErrorCode {
  InvaldJwtSignature(401,"jwt token was broken"),
  ExpiredJwt(401,"jwt was expired"),
  UnsupportedJwt(401,"this jwt is not supported"),
  IllegalArgumentException(401,"jwt claim is empty"),
  JwtReqired(401,"jwt is required"),
  NotFoundRequiredJwtProperty(401,"jwt has no required property");


  private int code;
  private String description;

  private JwtErrorCode(int code, String description) {
    this.code = code;
    this.description = description;
  }
}
