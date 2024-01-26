package com.ssafy.backend.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafy.backend.domain.Album;
import com.ssafy.backend.domain.Member;
import com.ssafy.backend.jwt.JwtProvider;
import com.ssafy.backend.model.response.KakaoTokenDto;
import com.ssafy.backend.model.response.KakaoInfoDto;
import com.ssafy.backend.model.response.LoginResponseDto;
import com.ssafy.backend.repository.AlbumRepository;
import com.ssafy.backend.repository.MemberRepository;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

  @Autowired
  private MemberRepository memberRepository;
  @Autowired
  private AlbumRepository albumRepository;
  @Autowired
  private JwtProvider provider;

  /**
   * 인가코드로 토큰 받아오기. 시간 되면 restTemplate로 리팩토링하기!!
   **/
  public KakaoTokenDto getKakaoAccessToken(String code) {
    KakaoTokenDto kakaoTokenDto = null;
    String reqUrl = "https://kauth.kakao.com/oauth/token";

    // 1. connection 생성, 2. POST로 보낼 Body 작성, 3. 받아온 결과를 json 파싱
    try {
      URL url = new URL(reqUrl);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();

      // POST 요청을 위해 기본값이 false인 setDoOutput을 true로
      conn.setRequestMethod("POST");
      conn.setDoOutput(true);

      // POST 요청에 필요로 하는 파라미터를 출력스트림을 통해 전송
      BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
      StringBuilder sb = new StringBuilder();
      sb.append("grant_type=authorization_code");
      sb.append("&redirect_uri=http://localhost:8080/kakao/callback");
      sb.append("&client_id=89c1b2b891249d40bdead7fa2acbedae");
      sb.append("&code=" + code);

      bw.write(sb.toString());
      bw.flush();
      conn.disconnect();

      // 결과 코드가 200이라면 성공
      int responseCode = conn.getResponseCode();

      // 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
      BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      String line = "";
      String result = "";
      while ((line = br.readLine()) != null) {
        result += line;
      }

      // Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성 (자바에서 쉽게 다뤄주기 위함)
      JsonParser parser = new JsonParser();
      JsonElement element = parser.parse(result);

      String accessToken = element.getAsJsonObject().get("access_token").getAsString();
      String refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();
      String tokenType = element.getAsJsonObject().get("token_type").getAsString();
      int expiresIn = element.getAsJsonObject().get("expires_in").getAsInt();
      String idToken = element.getAsJsonObject().get("id_token").getAsString();
      String scope = element.getAsJsonObject().get("scope").getAsString();
      int refreshTokenExpiresIn = element.getAsJsonObject().get("refresh_token_expires_in")
          .getAsInt();

      kakaoTokenDto = KakaoTokenDto.builder()
          .idToken((idToken))
          .accessToken(accessToken)
          .refreshToken(refreshToken)
          .refreshTokenExpiresin(refreshTokenExpiresIn)
          .tokenType(tokenType)
          .scope(scope)
          .expiresIn(expiresIn)
          .build();

      System.out.println("1단계 " + kakaoTokenDto);
    } catch (IOException e) {
      e.getStackTrace();
    }

    return kakaoTokenDto;
  }

  /**
   * 토큰을 통해 카카오api로 사용자 정보 받아오기
   **/
  public KakaoInfoDto getKakaoMemberInfo(String accessToken, String refreshToken) {
    KakaoInfoDto kakaoInfoDto = null;
    String reqUrl = "https://kapi.kakao.com/v2/user/me";

    try {
      URL url = new URL(reqUrl);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();

      // POST 요청을 위해 기본값이 false인 setDoOutput을 true로
      conn.setRequestMethod("POST");
      conn.setDoOutput(true);
//      conn.setRequestProperty("Authorization", "Bearer " + accessToken); // 전송할 헤더에 accessToken 담아 전송

      // 결과 코드가 200이라면 성공
      int responseCode = conn.getResponseCode();

      // 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
      BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
      String line = "";
      String result = "";
      while ((line = br.readLine()) != null) {
        result += line;
      }

      // Gson 라이브러리로 json 파싱하기
      JsonParser parser = new JsonParser();
      JsonElement element = parser.parse(result);
      JsonElement kakaoAccount = element.getAsJsonObject().get("kakao_account");
      JsonElement profile = kakaoAccount.getAsJsonObject().get("profile");

      String id = element.getAsJsonObject().get("id").getAsString();
      String nickname = profile.getAsJsonObject().get("nickname").getAsString();
      String albumPk = UUID.randomUUID().toString();

      kakaoInfoDto = KakaoInfoDto.builder()
          .id(id)
          .nickname(nickname)
          .albumPk(albumPk)
          .accessToken(accessToken)
          .refreshToken(refreshToken)
          .authority(false)
          .build();

      System.out.println("2단계 " + kakaoInfoDto);
    } catch (IOException e) {
      e.getStackTrace();
    }

    return kakaoInfoDto;
  }

  /**
   * 회원가입
   **/
  public LoginResponseDto kakaoSignUp(String code) {
    // 1. 인가코드 통해서 카카오토큰 받기
    KakaoTokenDto kakaoTokenDto = getKakaoAccessToken(code);
    String accessToken = kakaoTokenDto.getAccessToken();
    String refreshToken = kakaoTokenDto.getRefreshToken();
    String idToken = kakaoTokenDto.getIdToken();

    JsonParser parser = new JsonParser();
    JsonElement element = parser.parse(idToken);
    String id = element.getAsJsonObject().get("id").getAsString();
//    String nickname = element.getAsJsonObject().get("nickname").getAsString();
//    String cAt = element.getAsJsonObject().get("createdAt").getAsString();
//    String eAt = element.getAsJsonObject().get("expiredAt").getAsString();
    System.out.println(id);

    // 2. 토큰 통해서 사용자 정보 받기
    KakaoInfoDto kakaoInfo = getKakaoMemberInfo(accessToken, refreshToken);

    // 3. 얻어온 사용자 정보가 null이라면 회원가입 및 앨범 생성
    if (memberRepository.findMemberByPk(kakaoInfo.getId()) == null) {
      Member member = Member.builder()
          .pk(kakaoInfo.getId())
          .nickname(kakaoInfo.getNickname())
          .createdAt(LocalDateTime.now()).build();
      memberRepository.save(member);

      Album album = Album.builder()
          .pk(kakaoInfo.getAlbumPk())
          .member(member)
          .createdAt(LocalDateTime.now()).build();
      albumRepository.save(album);
    }

    // 4. 유저 정보에 따라 JWT 토큰(idToken의 id, nickname, cAt, eAt, accessToken 담김) 생성
    // 일단 accessToken만 담기도록 해놓음
    String jwtToken = provider.createJwtToken(id);
    System.out.println(jwtToken);

    // jwtToken과 albumPk 반환
    return LoginResponseDto.builder()
        .jwtToken(jwtToken)
        .albumPk(kakaoInfo.getAlbumPk())
        .build();
  }

  /**
   * 앨범 권한 조회
   **/
  public Boolean checkAuthorizationToAlbum(String id, String albumPk) {
    Album album = albumRepository.findAlbumByPk(albumPk);
    if (id.equals(album.getMember())) {
      return true;
    } else {
      return false;
    }
  }

}
