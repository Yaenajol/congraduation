package com.ssafy.backend.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.ssafy.backend.domain.Album;
import com.ssafy.backend.model.response.MemberDto;
import com.ssafy.backend.repository.MemberRepository;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

  @Autowired
  private MemberRepository memberRepository;

  /** 인가코드로 토큰 받아오기 **/
  // accessToken 암호화? 필요함!!!!!!!!!!!!!!!!!!!!! 일단 일반 accessToken으로 보내느중
  public String getKakaoAccessToken(String code) {
    String accessToken = "";
    String refreshToken = "";
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
      sb.append("&redirect_uri=http://localhost:8080/kakao/redirect");
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

      accessToken = element.getAsJsonObject().get("access_token").getAsString();
      refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();

      System.out.println("accesstoken: " + accessToken);
      System.out.println("refreshtoken: " + refreshToken);

    } catch (IOException e) {
      e.getStackTrace();
    }

    return accessToken;

    /**
     * <webclient 방법>
     *
     * // 요청 param(body)
     *     MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
     *     params.add("grant_type", "authorization_code");
     *     params.add("redirect_uri", "http://localhost:8080/kakao/redirect");
     *     params.add("client_id", "89c1b2b891249d40bdead7fa2acbedae");
     *     params.add("code", code);
     *
     *     // request
     *     String accessUrl = "https://kauth.kakao.com/oauth/token";
     *     WebClient wc = WebClient.builder()
     *         .baseUrl(accessUrl)
     *         .build();
     *     JsonObject response = wc.post()
     *         .body(BodyInserters.fromFormData(params))
     *         .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8") // 헤더에 들어가야 하는 정보
     *         .retrieve()
     *         .bodyToMono(JsonObject.class)
     *         .block();
     *
     *     System.out.println("response: " + response);
     *
     *     //json형태로 변환
     * //    ObjectMapper objectMapper = new ObjectMapper();
     * //    String accessToken = "";
     *
     *     String accessToken = response.get("access_token").getAsString();
     *
     *     return accessToken;
     */

  }

  /** 토큰을 통해 카카오api로 사용자 정보 받아오기 **/
  public MemberDto getKakaoMemberInfo(String token) {
    String id = "";
    String nickname = "";
    String albumPk = "";
    String reqUrl = "https://kapi.kakao.com/v2/user/me";

    try {
      URL url = new URL(reqUrl);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();

      // POST 요청을 위해 기본값이 false인 setDoOutput을 true로
      conn.setRequestMethod("POST");
      conn.setDoOutput(true);
      conn.setRequestProperty("Authorization", "Bearer " + token); // 전송할 헤더에 accessToken 담아 전송

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

      id = element.getAsJsonObject().get("id").getAsString();
      nickname = profile.getAsJsonObject().get("nickname").getAsString();
      albumPk = UUID.randomUUID().toString();
      Album album = new Album();
      album.setPk(albumPk);
    } catch (IOException e) {
      e.getStackTrace();
    }
    return new MemberDto(id, nickname, token, albumPk, false);

    /**
     * <webclient 방법>
     *  // 카카오에 요청 보내기 및 응답 받기
     *     String infoUrl = "https://kapi.kakao.com/v2/user/me";
     *     WebClient wc = WebClient.create(infoUrl);
     *     String response = wc.post()
     *         .uri(infoUrl)
     *         .header("Authorization", "Bearer " + token)
     *         .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
     *         .retrieve()
     *         .bodyToMono(String.class)
     *         .block();
     *
     *     // json 파싱
     *     MemberDTO memberDTO = null;
     *     ObjectMapper objectMapper = new ObjectMapper();
     *     try {
     *       memberDTO = objectMapper.readValue(response, MemberDTO.class);
     *     } catch (JsonProcessingException e) {
     *       e.printStackTrace();
     *     }
     *     return memberDTO;
     */
  }

  /** 앨범 권한 조회 **/
//  public MemberDTO AuthorizationToAlbum() {
//    MemberDTO memberInfo =
//  }

}
