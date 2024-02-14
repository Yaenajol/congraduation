package com.ssafy.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafy.backend.domain.Album;
import com.ssafy.backend.domain.Member;
import com.ssafy.backend.domain.Memory;
import com.ssafy.backend.exception.CustomException;
import com.ssafy.backend.exception.errorcode.AlbumErrorCode;
import com.ssafy.backend.exception.errorcode.MemberErrorCode;
import com.ssafy.backend.jwt.JwtService;
import com.ssafy.backend.model.response.AlbumMemoryResponseDto;
import com.ssafy.backend.model.response.KakaoTokenDto;
import com.ssafy.backend.model.response.KakaoInfoDto;
import com.ssafy.backend.model.response.LoginResponseDto;
import com.ssafy.backend.model.response.MyAlbumResponseDto;
import com.ssafy.backend.model.response.MyMemoryResponseDto;
import com.ssafy.backend.repository.AlbumRepository;
import com.ssafy.backend.repository.MemberRepository;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpHeaders;

@Service
public class MemberService {

  @Value("${oauth.kakao.client_id}")
  private String oauthKakaoClientId;

  @Value("${oauth.kakao.redirect_uri}")
  private String oauthKakaoRedirectUri;

  @Value("${oauth.kakao.unlink_redirect_uri}")
  private String oauthKakaoUnlinkRedirectUri;


  @Autowired
  private MemberRepository memberRepository;
  @Autowired
  private AlbumRepository albumRepository;
  @Autowired
  private ImageService imageService;
  @Autowired
  private JwtService jwtService;

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
      sb.append("&redirect_uri=" + oauthKakaoRedirectUri);
      sb.append("&client_id=" + oauthKakaoClientId);
      sb.append("&code=" + code);

      bw.write(sb.toString());
      bw.flush();

      // 요청을 통해 얻은 Response 메세지 읽어오기
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
          .scope(scope)
          .expiresIn(expiresIn)
          .build();

    } catch (Exception e) {
      e.printStackTrace();
    }
    return kakaoTokenDto;
  }

  /**
   * 토큰을 통해 카카오api로 사용자 정보 받아오기
   **/
  public KakaoInfoDto getKakaoMemberInfo(String accessToken) {
    KakaoInfoDto kakaoInfoDto = null;
    String reqUrl = "https://kapi.kakao.com/v2/user/me";

    try {
      URL url = new URL(reqUrl);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();

      // POST 요청을 위해 기본값이 false인 setDoOutput을 true로
      conn.setRequestMethod("POST");
      conn.setDoOutput(true);

      conn.setRequestProperty("Authorization",
          "Bearer " + accessToken); // 전송할 헤더에 accessToken 담아 전송
      // 요청 보내기
      conn.connect();

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

      kakaoInfoDto = KakaoInfoDto.builder()
          .id(element.getAsJsonObject().get("id").getAsString())
          .nickname(profile.getAsJsonObject().get("nickname").getAsString())
          .build();

    } catch (IOException e) {
      e.getStackTrace();
    }
    return kakaoInfoDto;
  }

  /**
   * 회원가입
   **/
  public LoginResponseDto kakaoSignUp(String code) {
    // 1. 인가코드 통해서 토큰 받기
    KakaoTokenDto kakaoTokenDto = getKakaoAccessToken(code);
    String accessToken = kakaoTokenDto.getAccessToken();

    // 2. 토큰으로 사용자 정보 받기
    KakaoInfoDto kakaoInfo = getKakaoMemberInfo(accessToken);
    Optional<Member> optMember = memberRepository.findById(kakaoInfo.getId());

    // 3. 얻어온 사용자 정보가 null이라면 회원가입 및 앨범 생성
    if (optMember.isEmpty()) {
      Member member = Member.builder()
          .pk(kakaoInfo.getId())
          .nickname(kakaoInfo.getNickname())
          .build();
      memberRepository.save(member);

      Album album = Album.builder()
          .member(member)
          .build();
      System.out.println("album1=======================" + album);
      albumRepository.save(album);
    } else { // null이 아니라면 deletedAt null로 바꾸기
      Member member = optMember.get();
      member.setDeletedAt(null);
      memberRepository.saveAndFlush(member);
    }

    String jwtToken = jwtService.createJwtToken(kakaoInfo.getId());
    return LoginResponseDto.builder()
        .accessToken(jwtToken)
        .albumPk(albumRepository.findByMemberPk(kakaoInfo.getId()).getPk())
        .build();
  }

  /**
   * 앨범 권한 조회
   **/
  public Boolean checkAuthorizationToAlbum(String albumPk, String memberPk) {
    Optional<Album> optAlbum = albumRepository.findById(albumPk);
    if (optAlbum.isEmpty()) {
      throw new CustomException(AlbumErrorCode.NotFoundAlbum.getCode(),
          AlbumErrorCode.NotFoundAlbum.getDescription());
    }
    Album album = optAlbum.get();
    if (album.getMember().getPk().equals(memberPk)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 회원 탈퇴를 위한 토큰 받아오기
   **/
  public String getAccessTokenForDelete(String code) {
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
      sb.append("&redirect_uri=" + oauthKakaoUnlinkRedirectUri);
      sb.append("&client_id=" + oauthKakaoClientId);
      sb.append("&code=" + code);

      bw.write(sb.toString());
      bw.flush();

      // 요청을 통해 얻은 Response 메세지 읽어오기
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
          .scope(scope)
          .expiresIn(expiresIn)
          .build();

    } catch (Exception e) {
      e.printStackTrace();
    }
    return kakaoTokenDto.getAccessToken();
  }

  /**
   * 연결 끊기 = 회원탈퇴
   **/
  public String kakaoUnlink(String code) {
    String accessToken = getAccessTokenForDelete(code);
    String result = "";
    String reqUrl = "https://kapi.kakao.com/v1/user/unlink";

    try {
      URL url = new URL(reqUrl);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();

      conn.setRequestMethod("POST");
      conn.setDoOutput(true);
      conn.setRequestProperty("Authorization", "Bearer " + accessToken);

      int responseCode = conn.getResponseCode();

      BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      String line;
      if ((line = br.readLine()) != null) {
        result = line;
      }
      br.close();

      JsonParser parser = new JsonParser();
      JsonElement element = parser.parse(result);
      String memberPk  = element.getAsJsonObject().get("id").getAsString();
      Optional<Member> optMember = memberRepository.findById(memberPk);
      if (!optMember.isEmpty()) {
        Member member = optMember.get();
        member.setDeletedAt(LocalDateTime.now());
        memberRepository.saveAndFlush(member);
      }

      return memberPk;
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  public MyAlbumResponseDto getMyAlbumByPk(String memberPk) {
    Album album = albumRepository.findByMemberPk(memberPk);

    String coverUrl=null;
    if(album.getCoverImageName()!=null){//현재 저장된 이미지가 존재할 경우는 presignedUrl을 발급 후 저장
      coverUrl=imageService.getPresingendURL(album.getCoverImageName());
    }
    return MyAlbumResponseDto.builder()
        .albumPk(album.getPk()).
        nickname(album.getMember().getNickname())
        .title(album.getTitle())
        .graduationPlace(album.getGraduationPlace())
        .coverUrl(coverUrl)
        .openAt(album.getOpenAt()).build();
  }

  public List<MyMemoryResponseDto> getMyMemoriesByPk(String memberPk) {
    Album album = albumRepository.findByMemberPk(memberPk);
    //아직 앨범의 공개일이 설정이 되지 않았거나 지나지 않았으면 에러
    if(album.getOpenAt() == null){//해당 앨범의 공개날짜가 설정이 되어 있는가?
      throw new CustomException(AlbumErrorCode.NotSettingOpenAt.getCode(),AlbumErrorCode.NotSettingOpenAt.getDescription());
    }
    LocalDateTime albumOpenAt = album.getOpenAt();
    LocalDateTime now = LocalDateTime.now();
    if(!now.isAfter(albumOpenAt)){//작성하는 시점이 해당 앨범의 공개일을 넘겼는가?
      throw new CustomException(MemberErrorCode.NotGettableMemoryList.getCode(), MemberErrorCode.NotGettableMemoryList.getDescription());
    }
    List<Memory> memoryList=album.getMemoryList();
    List<MyMemoryResponseDto> myMemoryList=new ArrayList<>();

    int index=0;
    for(Memory memory:memoryList){
      myMemoryList.add(MyMemoryResponseDto.builder()
          .id(index++)
          .content(memory.getContent())
          .nickname(memory.getNickname())
          .image(imageService.getPresingendURL(memory.getImageName()))
          .build());
    }
    return myMemoryList;
  }
}
