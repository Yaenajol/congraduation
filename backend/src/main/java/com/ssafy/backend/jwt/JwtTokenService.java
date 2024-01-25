package com.ssafy.backend.jwt;

import com.ssafy.backend.exception.CustomException;
import com.ssafy.backend.exception.ErrorCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Random;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtTokenService implements InitializingBean {

  private long accessTokenExpirationInSeconds;
  private long refreshTokenExpirationInSeconds;
  private final String secretKey;
  private Key key;

  public JwtTokenService(
      @Value("${jwt.access.token.expiration.seconds}") long accessTokenExpirationInSeconds,
      @Value("${jwt.refresh.token.expiration.seconds}") long refreshTokenExpirationInSeconds,
      @Value("${jwt.token.secret-key}") String secretKey) {
    this.accessTokenExpirationInSeconds = accessTokenExpirationInSeconds * 1000;
    this.refreshTokenExpirationInSeconds = refreshTokenExpirationInSeconds * 1000;
    this.secretKey = secretKey;
  }

  // 빈 주입받은 후 실행되는 메서드
  @Override
  public void afterPropertiesSet() throws Exception {
    this.key = getKeyFromBase64EncodedKey(encodeBase64SecretKey(secretKey));
  }

  public String createAccessToken(String payload) {
    return createToken(payload, accessTokenExpirationInSeconds);
  }

  public String createRefreshToken() {
    byte[] array = new byte[7];
    new Random().nextBytes(array);
    String generatedString = new String(array, StandardCharsets.UTF_8);
    return createToken(generatedString, refreshTokenExpirationInSeconds);
  }

  public String createToken(String payload, long expireLength) {
    Claims claims = Jwts.claims().setSubject(payload);
    Date now = new Date();
    Date validity = new Date(now.getTime() + expireLength);
    return Jwts.builder()
        .setClaims(claims)
        .setIssuedAt(now)
        .setExpiration(validity)
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }

  public String getPayload(String token) {
    try {
      return Jwts.parserBuilder()
          .setSigningKey(key)
          .build()
          .parseClaimsJws(token)
          .getBody()
          .getSubject();
    } catch (ExpiredJwtException e) {
      return e.getClaims().getSubject();
    } catch (JwtException e) {
      throw new CustomException(ErrorCode.UNAUTHORIZED);
    }
  }

  public boolean validateToken(String token) {
    try {
      Jws<Claims> claimsJws = Jwts.parserBuilder()
          .setSigningKey(key)
          .build()
          .parseClaimsJws(token);
      return !claimsJws.getBody().getExpiration().before(new Date());
    } catch (JwtException | IllegalArgumentException exception) {
      return false;
    }
  }

  private String encodeBase64SecretKey(String secretKey) {
    return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
  }

  private Key getKeyFromBase64EncodedKey(String base64EncodeSecretKey) {
    byte[] keyBytes = Decoders.BASE64.decode(base64EncodeSecretKey);
    Key key = Keys.hmacShaKeyFor(keyBytes);
    return key;
  }

  // 클라이언트 쿠키에 리프레시토큰 저장시켜주는 메소드
  public void addRefreshTokenToCookie(String refreshToken, HttpServletResponse response) {
    Long age = refreshTokenExpirationInSeconds;
    Cookie cookie = new Cookie("refresh_token", refreshToken);
    cookie.setPath("/");
    cookie.setMaxAge(age.intValue());
    cookie.setHttpOnly(true);
    response.addCookie(cookie);
  }
}
