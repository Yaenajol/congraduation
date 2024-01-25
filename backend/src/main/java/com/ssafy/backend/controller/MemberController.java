package com.ssafy.backend.controller;

import com.ssafy.backend.domain.Album;
import com.ssafy.backend.domain.Member;
import com.ssafy.backend.model.response.KakaoInfoDto;
import com.ssafy.backend.model.response.MemberResponseDto;
import com.ssafy.backend.repository.AlbumRepository;
import com.ssafy.backend.repository.MemberRepository;
import com.ssafy.backend.service.MemberService;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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


  /** 로그인 **/
  @GetMapping("/kakao/callback") // 나 혼자 해볼라고 uri로 넘어오는 쿼리스트링 때문에 getmapping함
  public ResponseEntity<MemberResponseDto> kakaoLogin(@RequestParam("code") String code) {
    // accessToken, albumPk 반환
    MemberResponseDto memberResponseDto = memberService.kakaoSignUp(code);

    return new ResponseEntity<MemberResponseDto>(memberResponseDto, HttpStatus.OK);
  }

  /** 앨범 권한 조회 **/
//  @GetMapping("/users/authority")
//  public ResponseEntity<Boolean> authorityAlbum(String id, @RequestParam("albumPk") String albumPk) {
  @GetMapping("/users/authority/album={albumPk}")
  public ResponseEntity<Boolean> authorityAlbum(String id, @PathVariable String albumPk) {
    return new ResponseEntity<>(memberService.checkAuthorizationToAlbum(id, albumPk), HttpStatus.OK);
  }
}
