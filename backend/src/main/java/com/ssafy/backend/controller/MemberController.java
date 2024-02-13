package com.ssafy.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.backend.jwt.JwtService;
import com.ssafy.backend.model.response.LoginResponseDto;
import com.ssafy.backend.model.response.MyAlbumResponseDto;
import com.ssafy.backend.service.MemberService;
import io.jsonwebtoken.Claims;
import jakarta.transaction.Transactional;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;


@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {

  private final MemberService memberService;
  private final JwtService jwtService;
  @Value("${oauth.kakao.login_uri}")
  private String oauthKakaoLoginUrl;

  @Value("${oauth.kakao.unlink_login_uri}")
  private String oauthKakaoUnlinkLoginUri;


  @GetMapping("/kakao/redirect")
  public RedirectView redirect() {
    RedirectView redirectView = new RedirectView();
    redirectView.setUrl(oauthKakaoLoginUrl);
    return redirectView;
  }

  @GetMapping("/kakao/unlinkRedirect")
  public RedirectView unlinkRedirect() {
    RedirectView redirectView = new RedirectView();
    redirectView.setUrl(oauthKakaoUnlinkLoginUri);
    return redirectView;
  }

  /**
   * 로그인
   **/
  @PostMapping("/kakao/callback") // 나 혼자 해볼라고 uri로 넘어오는 쿼리스트링 때문에 getmapping함
  public ResponseEntity<LoginResponseDto> kakaoLogin(@RequestParam("code") String code) {
    return ResponseEntity.ok().body(memberService.kakaoSignUp(code));
  }


  /**
   * 앨범 권한 조회
   **/
  @GetMapping("/members/authority")
  public ResponseEntity<Boolean> authorityAlbum(@RequestParam("albumPk") String albumPk,@RequestHeader(value = "accessToken",required = false) String accessToken) {
    String memberPk=jwtService.parseJwtToken(accessToken);
    return new ResponseEntity<Boolean>(memberService.checkAuthorizationToAlbum(albumPk,memberPk),
        HttpStatus.OK);
  }

  /**
   * 회원탈퇴 = 연결끊기
   **/
  @PostMapping("/kakao/unlinkCallback")
  public ResponseEntity<String> kakaoUnlink(@RequestParam("code") String code) {
    return ResponseEntity.ok().body(memberService.kakaoUnlink(code));
  }

  @GetMapping("/members/myAlbum")
  public ResponseEntity<MyAlbumResponseDto> myAlbum(@RequestHeader(value = "accessToken",required = false) String accessToken) {
    String memberPk=jwtService.parseJwtToken(accessToken);
    return new ResponseEntity<MyAlbumResponseDto>(memberService.getMyAlbumByPk(memberPk),HttpStatus.OK);
  }

}
