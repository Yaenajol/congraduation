package com.ssafy.backend.controller;

import com.ssafy.backend.domain.Member;
import com.ssafy.backend.model.response.MemberDto;
import com.ssafy.backend.repository.AlbumRepository;
import com.ssafy.backend.repository.MemberRepository;
import com.ssafy.backend.service.MemberService;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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

  /**
   * 로그인
   **/
  @GetMapping("/kakao/redirect")
  public ResponseEntity<MemberDto> kakaoLogin(@RequestParam("code") String code) {
    // 1. 인가코드 통해서 토큰 받기
    String accessToken = memberService.getKakaoAccessToken(code);

    // 2. 사용자 정보 받기
    MemberDto memberInfo = memberService.getKakaoMemberInfo(accessToken);

    // 3. 회원가입과 동시에 앨범이 생성되어야 함
    // 이건 또 뭘로 확인하노....
//    albumRepository.


    return new ResponseEntity<MemberDto>(memberInfo, HttpStatus.OK);
  }

  /**
   * 앨범 권한 조회
   **/
  @GetMapping("/users/authority/album={albumPk}")
  public ResponseEntity<MemberDto> authorityAlbum(@RequestParam("albumPk") String albumPk,
      @RequestHeader("access_token") String token) {
    // 현재 로그인 중인 유저의 id/토큰과 accessToken으로 얻어온 사용자의 id/토큰이 일치하면 권한 있음
    // 로그인 중인 유저 어케 가져오더라?????????? 돌겟네
    MemberDto memberInfo = memberService.getKakaoMemberInfo(token); // 토큰으로 얻어온 사용자 정보
    if (memberInfo.getAccessToken() == token) memberInfo.setAuthority(true);
    return new ResponseEntity<>(memberInfo, HttpStatus.OK);
  }
}
