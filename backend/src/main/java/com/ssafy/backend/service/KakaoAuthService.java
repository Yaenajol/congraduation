package com.ssafy.backend.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class KakaoAuthService {
  private final KakaoUserInfo kakaoUserInfo;
  private final UserRepository userRepository;

  @Transactional
  public String isSignedUp(String token) {
    KakaoUserInfoResponse userInfo = kakaoUserInfo.getUserInfo(token);
    User user = userRepository.findByKeyCode(userInfo.getId().toString()).orElseThrow(() -> new UserException(ResponseCode.USER_NOT_FOUND));
    return user.getId();
  }
}
