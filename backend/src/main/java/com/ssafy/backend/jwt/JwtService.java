package com.ssafy.backend.jwt;

import com.ssafy.backend.exception.CustomException;
import com.ssafy.backend.exception.errorcode.JwtErrorCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Base64;
@Component
@RequiredArgsConstructor
public class JwtService {
  @Value("${jwt.secret_key}")
  private String secretKey;

  @Value("${jwt.access.token.expiration.miliseconds}")
  private int jwtAccessTokenExpirationmiliseconds;


  /** JWT 토큰 생성 **/
  // accessToken만 보내는지 idToken 내용도 담아 보내는지 궁금하다
  public String createJwtToken(String id) {
    Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    Date now = new Date();
    return Jwts.builder()
        .setHeaderParam("typ", "JWT")
        .claim("memberPk", id)
        .setIssuedAt(now)
        .setExpiration(new Date(System.currentTimeMillis()+ jwtAccessTokenExpirationmiliseconds)) // 1시간
        .signWith(SignatureAlgorithm.HS256, key)
        .compact();
  }

  /** JWT 토큰의 유효성 체크 메소드 **/
  public String parseJwtToken(String token) {
    validate(token);

    return (String)(Jwts.parser()
        .setSigningKey(Base64.getEncoder().encodeToString(secretKey.getBytes()))
        .parseClaimsJws(token)
        .getBody().get("memberPk"));
  }

  private void validate(String token){
    System.out.println(token);
    if (token==null || "".equals(token) ) {
      throw new CustomException(JwtErrorCode.JwtReqired.getCode(),JwtErrorCode.JwtReqired.getDescription());
    }
    try {
      Jwts.parser().setSigningKey(Base64.getEncoder().encodeToString(secretKey.getBytes())).parseClaimsJws(token).getBody();
    }catch(SecurityException | SignatureException | MalformedJwtException e) {//secret 일치 제대로 만들어진건가
      throw new CustomException(JwtErrorCode.InvaldJwtSignature.getCode(),JwtErrorCode.InvaldJwtSignature.getDescription());
    }catch(ExpiredJwtException e) {// 만료 기간 끝났나?
      throw new CustomException(JwtErrorCode.ExpiredJwt.getCode(),JwtErrorCode.ExpiredJwt.getDescription());
    }catch(UnsupportedJwtException e) {//알고리즘이 일치하는가?
      throw new CustomException(JwtErrorCode.UnsupportedJwt.getCode(),JwtErrorCode.UnsupportedJwt.getDescription());
    }catch(IllegalArgumentException e) {//형태가 올바른가?
      throw new CustomException(JwtErrorCode.IllegalArgumentException.getCode(),JwtErrorCode.IllegalArgumentException.getDescription());
    }
  }


  /** JWT 토큰 복호화 **/
  public Jws<Claims> getClaims(String jwtToken) {
    return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
  }
}
