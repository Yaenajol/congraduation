package com.ssafy.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.backend.jwt.JwtProvider;
import com.ssafy.backend.model.response.LoginResponseDto;
import com.ssafy.backend.service.MemberService;
import io.jsonwebtoken.Claims;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {

  private final MemberService memberService;
  private final JwtProvider provider;


  /**
   * 로그인
   **/
//  @PostMapping("/kakao/callback?code={code}") // 나 혼자 해볼라고 uri로 넘어오는 쿼리스트링 때문에 getmapping함
//  public ResponseEntity<LoginResponseDto> kakaoLogin(@PathVariable String code) {
  @GetMapping("/kakao/callback") // 나 혼자 해볼라고 uri로 넘어오는 쿼리스트링 때문에 getmapping함
  public ResponseEntity<LoginResponseDto> kakaoLogin(@RequestParam("code") String code)
      throws JsonProcessingException {
    // jwtToken(id 담겨있음), albumPk 반환
    LoginResponseDto loginResponseDto = memberService.kakaoSignUp(code);

    return new ResponseEntity<LoginResponseDto>(loginResponseDto, HttpStatus.OK);
  }

  /**
   * 앨범 권한 조회
   **/
  @GetMapping("/users/authority")
  public ResponseEntity<Boolean> authorityAlbum(@RequestParam("albumPk") String albumPk)
      throws JsonProcessingException {
    return new ResponseEntity<Boolean>(memberService.checkAuthorizationToAlbum(albumPk),
        HttpStatus.OK);
  }

  /**
   * jwt토큰 엔드포인트
   **/
  @GetMapping("/some/protected/endpoint")
  public ResponseEntity<?> protectedEndpoint(@RequestHeader("Authorization") String token) {
    try {
      // 헤더에서 토큰을 추출하여 유효성 검사
      Claims claims = provider.parseJwtToken(token);
      Date now = new Date();
//      if (now.before(claims.getExpiration())) // 이게 있을 필요가업나
      return new ResponseEntity<>("Authenticated", HttpStatus.OK);
    } catch (Exception e) {
      // 토큰이 유효하지 않은 경우
      return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
  }
}
