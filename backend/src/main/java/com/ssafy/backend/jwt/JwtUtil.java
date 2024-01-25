package com.ssafy.backend.jwt;


import com.ssafy.backend.model.response.KakaoTokenDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {
  @Value("${jwt.secret}") // application.properties 등에 보관한다.
  private String secretKey;

  private final UserDetailsService userDetailsService;

  // 객체 초기화, secretKey를 Base64로 인코딩
  @PostConstruct
  protected void init() {
    secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
  }

  // 토큰 생성
  public String createToken(String userPk) {
    Claims claims = Jwts.claims().setSubject(userPk); // JWT payload 에 저장되는 정보단위
    Date now = new Date();
    return Jwts.builder()
        .setClaims(claims) // 정보 저장
        .setIssuedAt(now) // 토큰 발행 시간 정보
        .setExpiration(new Date(now.getTime() + (30 * 60 * 1000L))) // 토큰 유효시각 설정 (30분)
        .signWith(SignatureAlgorithm.HS256, secretKey)  // 암호화 알고리즘과, secret 값
        .compact();
  }

  // 인증 정보 조회
  public Authentication getAuthentication(String token) {
    UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
    return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
  }

  // 토큰에서 회원 정보 추출
  public String getUserPk(String token) {
    return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
  }

  // 토큰 유효성, 만료일자 확인
  public boolean validateToken(String jwtToken) {
    try {
      Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
      return !claims.getBody().getExpiration().before(new Date());
    } catch (Exception e) {
      return false;
    }
  }

  // Request의 Header에서 token 값 가져오기
  public String resolveToken(HttpServletRequest request) {
    return request.getHeader("X-AUTH-TOKEN");
  }
//  private final SecretKey key;
//
//  public JwtUtil(String secretKey) {
//    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//    this.key = Keys.hmacShaKeyFor(keyBytes);
//  }
//
//
//  // 유저 정보를 가지고 AccessToken, RefreshToken 을 생성하는 메서드
//  public KakaoTokenDto generateToken(Authentication authentication) {
//    // 권한 가져오기
//    String authorities = authentication.getAuthorities().stream()
//        .map(GrantedAuthority::getAuthority)
//        .collect(Collectors.joining(","));
//
//    long now = (new Date()).getTime();
//    // Access Token 생성
//    Date accessTokenExpiresIn = new Date(now + 86400000);
//    String accessToken = Jwts.builder()
//        .setSubject(authentication.getName())
//        .claim("auth", authorities)
//        .setExpiration(accessTokenExpiresIn)
//        .signWith(key, SignatureAlgorithm.HS256)
//        .compact();
//
//    // Refresh Token 생성
//    String refreshToken = Jwts.builder()
//        .setExpiration(new Date(now + 86400000))
//        .signWith(key, SignatureAlgorithm.HS256)
//        .compact();
//
//    return KakaoTokenDto.builder()
//        .tokenType("Bearer")
//        .accessToken(accessToken)
//        .refreshToken(refreshToken)
//        .build();
//  }
//
//  // JWT 토큰을 복호화하여 토큰에 들어있는 정보를 꺼내는 메서드
//  public Authentication getAuthentication(String accessToken) {
//    // 토큰 복호화
//    Claims claims = parseClaims(accessToken);
//
//    if (claims.get("auth") == null) {
//      throw new RuntimeException("권한 정보가 없는 토큰입니다.");
//    }
//
//    // 클레임에서 권한 정보 가져오기
//    Collection<? extends GrantedAuthority> authorities =
//        Arrays.stream(claims.get("auth").toString().split(","))
//            .map(SimpleGrantedAuthority::new)
//            .collect(Collectors.toList());
//
//    // UserDetails 객체를 만들어서 Authentication 리턴
//    UserDetails principal = new User(claims.getSubject(), "", authorities);
//    return new UsernamePasswordAuthenticationToken(principal, "", authorities);
//  }
//
//  // 토큰 정보를 검증하는 메서드
//  public boolean validateToken(String token) {
//    try {
//      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
//      return true;
//    } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
//      log.info("Invalid JWT Token", e);
//    } catch (ExpiredJwtException e) {
//      log.info("Expired JWT Token", e);
//    } catch (UnsupportedJwtException e) {
//      log.info("Unsupported JWT Token", e);
//    } catch (IllegalArgumentException e) {
//      log.info("JWT claims string is empty.", e);
//    }
//    return false;
//  }
//
//  private Claims parseClaims(String accessToken) {
//    try {
//      return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
//    } catch (ExpiredJwtException e) {
//      return e.getClaims();
//    }
//  }

}
