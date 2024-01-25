package com.ssafy.backend.controller;

import com.ssafy.backend.model.request.AlbumUpdateRequestDto;
import com.ssafy.backend.model.response.AlbumMemoryResponseDto;
import com.ssafy.backend.model.response.AlbumResponseDto;
import com.ssafy.backend.service.AlbumService;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Controller
@RequestMapping("albums")
@RequiredArgsConstructor
public class AlbumController {

  private final AlbumService albumService;

  @GetMapping("/{albumPk}")
  public ResponseEntity<AlbumResponseDto> getAlbumList(@PathVariable String albumPk){
    log.debug("getAlbumList");
    return ResponseEntity.ok().body(albumService.getAlbumByPk(albumPk));
  }

  @GetMapping("/{albumPk}/memories")
  public ResponseEntity<List<AlbumMemoryResponseDto>> getAlbumMemoryList(@PathVariable String albumPk){
    log.debug("getAlbumMemoryList" + albumPk);
    return ResponseEntity.ok().body(albumService.getAlbumMemoryListByPk(albumPk));
  }

  @PutMapping("/{albumPk}")
  public ResponseEntity<Object> updateAlbum(@PathVariable String albumPk,@RequestBody AlbumUpdateRequestDto albumUpdateRequest){
    log.debug("updateAlbum"+ albumPk);
    albumService.updateAlbumByPk(albumPk,albumUpdateRequest);
    return ResponseEntity.ok().body("update success");
  }

//  @PostMapping("/imageBlur")
//  public ResponseEntity<Resource> imageBlur(@RequestParam(value="file",required=false) MultipartFile file)
//      throws IOException {
//    Resource image=albumService.sendMediaImage(file);
//    HttpHeaders headers = new HttpHeaders();
//    headers.setContentDisposition(
//        ContentDisposition.builder("attachment")
//            .filename("blur.jpg")
//            .build());
//
//    headers.add(HttpHeaders.CONTENT_TYPE, "image/jpeg");
//    return ResponseEntity
//        .ok()
//        .headers(headers)
//        .body(image);
//  }
}
