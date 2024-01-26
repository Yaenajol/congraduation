package com.ssafy.backend.controller;

import com.ssafy.backend.jwt.JwtProvider;
import com.ssafy.backend.model.response.JwtTokenDto;
import com.ssafy.backend.model.response.LoginResponseDto;
import com.ssafy.backend.repository.AlbumRepository;
import com.ssafy.backend.repository.MemberRepository;
import com.ssafy.backend.service.MemberService;
import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class MemberController {

  @Autowired
  private MemberService memberService;

  @Autowired
  private MemberRepository memberRepository;

  @Autowired
  private AlbumRepository albumRepository;

  @Autowired
  private JwtProvider provider;


  /** 로그인 **/
  @GetMapping("/kakao/callback") // 나 혼자 해볼라고 uri로 넘어오는 쿼리스트링 때문에 getmapping함
  public ResponseEntity<LoginResponseDto> kakaoLogin(@RequestParam("code") String code) {
    // accessToken, albumPk 반환
    LoginResponseDto loginResponseDto = memberService.kakaoSignUp(code);

    return new ResponseEntity<LoginResponseDto>(loginResponseDto, HttpStatus.OK);
  }

  /** JWT 토큰 발급 **/
//  public ResponseEntity<String> getJwtToken(String idToken) {
//   String jwtToken = provider.createJwtToken(subject);
//    System.out.println(jwtToken);
//    return new ResponseEntity<>(jwtToken, HttpStatus.OK);
//  }

  /** JWT 토큰 인증 **/
//  @GetMapping(value = "/checkToken")
//  public ResponseEntity<JwtTokenDto> checkToken(@RequestHeader(value = "Authorization") String token) throws Exception {
//    Claims claims = provider.parseJwtToken(token);
//
//    JwtTokenDto jwtTokenDto = new JwtTokenDto("200", "success");
//    return new ResponseEntity<JwtTokenDto>;
//  }

  /** JWT 토큰 갱신 **/
//  public ResponseEntity<String> updateJwtToken(@PathVariable String id) {
//    String result = "";
//    try {
//      // jwt에서 id 추출
//      String idByJwt =
//    }
//  }

  /** 앨범 권한 조회 **/
//  @GetMapping("/users/authority")
//  public ResponseEntity<Boolean> authorityAlbum(String id, @RequestParam("albumPk") String albumPk) {
  @GetMapping("/users/authority/album={albumPk}")
  public ResponseEntity<Boolean> authorityAlbum(String id, @PathVariable String albumPk) {
    return new ResponseEntity<>(memberService.checkAuthorizationToAlbum(id, albumPk), HttpStatus.OK);
  }
}
