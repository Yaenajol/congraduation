package com.ssafy.backend.model.response;

import jakarta.validation.constraints.NotNull;
import java.nio.file.attribute.UserPrincipal;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@AllArgsConstructor
public class KakaoInfoDto implements UserDetails {
  @NotNull
  private String id;
  @NotNull
  private String nickname;
  private String accessToken;
  private String refreshToken;
  private String albumPk;
  private boolean authority;

  private Collection<? extends GrantedAuthority> getAuthorities;

  public static UserPrincipal crate(KakaoInfoDto kakaoInfo) {
    List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority())
  }
  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return null;
  }

  @Override
  public String getPassword() {
    return null;
  }

  @Override
  public String getUsername() {
    return null;
  }

  @Override
  public boolean isAccountNonExpired() {
    return false;
  }

  @Override
  public boolean isAccountNonLocked() {
    return false;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return false;
  }

  @Override
  public boolean isEnabled() {
    return false;
  }
}