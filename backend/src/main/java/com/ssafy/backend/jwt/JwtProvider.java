package com.ssafy.backend.jwt;

import com.ssafy.backend.model.response.KakaoTokenDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Base64;

@Component
@RequiredArgsConstructor
public class JwtProvider {
  @Value("${jwt.secret-key")
  private String secretKey = "auth";

  /** JWT 토큰 생성 **/
  // accessToken만 보내는지 idToken 내용도 담아 보내는지 궁금하다
  public String createJwtToken(String id) {
    Claims claims = Jwts.claims();
    claims.put("id", id);
    return Jwts.builder()
        .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
        .setClaims(claims)
        .setIssuedAt(new Date()) // 발급시간
        .setExpiration(new Date(System.currentTimeMillis()+1000*100*60)) // 만료시간 얘기 합쉬다!!!!!!!!!!
        .signWith(SignatureAlgorithm.HS256, secretKey) // 알고리즘, 시크릿키
        .compact();
  }

  /** JWT 토큰의 유효성 체크 메소드 **/
  public Claims parseJwtToken(String token) {
    token = BearerRemove(token); // Bearer 제거
    return Jwts.parser()
        .setSigningKey(Base64.getEncoder().encodeToString(secretKey.getBytes()))
        .parseClaimsJws(token)
        .getBody();
  }

  /** 토큰 앞 부분('Bearer') 제거 메소드 **/
  private String BearerRemove(String token) {
    return token.substring("Bearer ".length());
  }

}
