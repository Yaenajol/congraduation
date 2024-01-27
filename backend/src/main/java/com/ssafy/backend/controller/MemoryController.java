package com.ssafy.backend.controller;

import com.ssafy.backend.domain.Memory;
import com.ssafy.backend.jwt.JwtService;
import com.ssafy.backend.model.request.MemoryRequestDto;
import com.ssafy.backend.model.response.MemoryResponseDto;
import com.ssafy.backend.service.MemoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequiredArgsConstructor
@RequestMapping("/memories")
public class MemoryController {
  private final MemoryService memoryService;
  private final JwtService jwtService;

  @GetMapping("/{memoryPk}")
  public ResponseEntity<MemoryResponseDto> getMemoryDetail(@PathVariable String memoryPk,@RequestHeader(value = "accessToken",required = false) String accessToken) {
    return ResponseEntity.ok().body(memoryService.getMemory(memoryPk,jwtService.parseJwtToken(accessToken));
  }

  @PostMapping
  public ResponseEntity<String> writeMemory(
      @RequestPart MultipartFile image,
      @RequestHeader(value = "accessToken",required = false) String accessToken,
      @RequestPart(value = "data") MemoryRequestDto memoryRequestDto
      ) {

    // 파일 경로? 암호화
    return ResponseEntity.ok().body(memoryService.writeMemory(image, memoryRequestDto, jwtService.parseJwtToken(accessToken)));
  }


}