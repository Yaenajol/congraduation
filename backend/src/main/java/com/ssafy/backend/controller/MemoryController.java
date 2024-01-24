package com.ssafy.backend.controller;

import com.ssafy.backend.domain.Memory;
import com.ssafy.backend.model.request.MemoryRequestDto;
import com.ssafy.backend.model.response.MemoryResponseDto;
import com.ssafy.backend.service.MemoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/memories")
public class MemoryController {

  private final MemoryService memoryService;

  @GetMapping("/{memoryPk}")
  public ResponseEntity<MemoryResponseDto> getMemoryDetail(@PathVariable String memoryPk) {
    return ResponseEntity.ok().body(memoryService.getMemory(memoryPk));
  }

  @PostMapping
  public ResponseEntity<Memory> writeMemory(MemoryRequestDto memoryRequestDto) {
    // sequerity 토큰해석 개선 필요

    Memory resultMemory = memoryService.writeMemory(memoryRequestDto);

    // 파일 경로? 암호화

    return ResponseEntity.ok().body(resultMemory);
  }


}