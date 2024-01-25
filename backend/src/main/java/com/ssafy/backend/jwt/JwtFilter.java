package com.ssafy.backend.jwt;


import com.ssafy.backend.domain.Member;
import com.ssafy.backend.exception.CustomException;
import com.ssafy.backend.exception.ErrorCode;
import com.ssafy.backend.repository.MemberRepository;
import com.ssafy.backend.service.MemberService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {
  public static final String AUTHORIZATION_HEADER = "Authorization";
  private final JwtTokenService jwtTokenService;
  private final MemberService memberService;
  private MemberRepository memberRepository;

  // 요 Filter 에서 액세스토큰이 유효한지 확인 후 SecurityContext에 계정정보 저장
  @Override
  public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
      FilterChain filterChain) throws IOException, ServletException {
    HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
    logger.info("[JwtFilter] : " + httpServletRequest.getRequestURL().toString());
    // 1. Request헤더에서 JWT 토큰 추출
    String jwt = resolveToken(httpServletRequest);

    // 2. 토큰 유효성 검사
//    Object ErrorCode;
    if (StringUtils.hasText(jwt) && jwtTokenService.validateToken(jwt)) {
      String memberPk = String.valueOf(jwtTokenService.getPayload(jwt)); // 토큰 Payload에 있는 memberPk 가져오기
      Member member = memberRepository.findMemberByPk(memberPk); // memberPk로
      if (member == null) {
        throw new CustomException(ErrorCode.NOT_EXIST_USER);
      }

      UserDetails userDetails = UserPrincipal.create(member);
      UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
          userDetails, null, userDetails.getAuthorities());
      SecurityContextHolder.getContext().setAuthentication(authentication);
    } else {
      throw new CustomException(ErrorCode.INVALID_ACCESS_TOKEN);
    }

    filterChain.doFilter(servletRequest, servletResponse);
  }


  // Header에서 Access Token 가져오기
  private String resolveToken(HttpServletRequest request) {
    String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }

    return null;
  }
}
