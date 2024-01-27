package com.ssafy.backend.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Base64;
@Component
@RequiredArgsConstructor
public class JwtProvider {
  @Value("${jwt.secret_key}")
  private static String secretKey;

  @Value("${jwt.access.token.expiration.seconds}")
  private static String jwtAccessTokenExpirationSeconds;


  /** JWT 토큰 생성 **/
  // accessToken만 보내는지 idToken 내용도 담아 보내는지 궁금하다
  public String createJwtToken(String id) {
    Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    System.out.println(id);
    Date now = new Date();
    return Jwts.builder()
        .setHeaderParam("typ", "JWT")
        .claim("id", id)
        .setIssuedAt(now)
        .setExpiration(new Date(System.currentTimeMillis()+ 1*1000*60*60)) // 1시간
        .signWith(SignatureAlgorithm.HS256, key)
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
  public String BearerRemove(String token) {
    return token.substring("Bearer ".length());
  }

  /** JWT 토큰 복호화 **/
  public Jws<Claims> getClaims(String jwtToken) {
    return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
  }
}
