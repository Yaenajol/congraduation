package com.ssafy.backend.model.response;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberDto {
  @NotNull
  private String id;
  @NotNull
  private String nickname;
  private String accessToken;
  private String albumPk;
  private boolean authority;

}