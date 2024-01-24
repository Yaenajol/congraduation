package com.ssafy.backend.controller;

import com.ssafy.backend.model.request.AlbumRequestDto;
import com.ssafy.backend.model.response.AlbumResponseDto;
import com.ssafy.backend.service.AlbumService;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
@Slf4j
@Controller
@RequestMapping("albums")
@RequiredArgsConstructor
public class AlbumController {

  private final AlbumService albumService;

  @GetMapping("/{albumPk}")
  public ResponseEntity<Map<String, AlbumResponseDto>> getAlbumList(@PathVariable String albumPk){
    log.debug("getAlbumList");
    Map<String,AlbumResponseDto> result=new HashMap<>();
    return ResponseEntity.ok().body(result);
  }
}
