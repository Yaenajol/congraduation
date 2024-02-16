package com.ssafy.backend.controller;

import com.ssafy.backend.jwt.JwtService;
import com.ssafy.backend.model.request.AlbumUpdateGraduationDateRequestDto;
import com.ssafy.backend.model.request.AlbumUpdateRequestDto;
import com.ssafy.backend.model.response.AlbumMemoryResponseDto;
import com.ssafy.backend.model.response.AlbumResponseDto;
import com.ssafy.backend.service.AlbumService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Controller
@RequestMapping("albums")
@RequiredArgsConstructor
public class AlbumController {

  private final AlbumService albumService;
  private final JwtService jwtService;

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
  public ResponseEntity<Object> updateAlbum(@PathVariable String albumPk,
      @RequestBody AlbumUpdateRequestDto albumUpdateRequest,
      @RequestHeader(value = "accessToken",required = false) String accessToken){
    log.debug("updateAlbum"+ albumPk);
    albumService.updateAlbumByPk(albumPk,albumUpdateRequest,jwtService.parseJwtToken(accessToken));
    return ResponseEntity.ok().body("success");
  }

  @PutMapping("/{albumPk}/coverImage")
  public ResponseEntity<Object> updateAlbum(@PathVariable String albumPk,
      @RequestPart MultipartFile image,
      @RequestHeader(value = "accessToken",required = false) String accessToken){
    log.debug("updateAlbum coverImage"+ image.getSize());

    return ResponseEntity.ok().body(albumService.updateAlbumCoverImageByPk(albumPk,image,jwtService.parseJwtToken(accessToken)));
  }

  @PutMapping("/{albumPk}/graduationDate")
  public ResponseEntity<Object> updateAlbumGraduationDate(
      @PathVariable String albumPk,
      @RequestBody AlbumUpdateGraduationDateRequestDto albumUpdateGraduationDateRequest,
      @RequestHeader(value = "accessToken",required = false) String accessToken){
    System.out.println(albumUpdateGraduationDateRequest.getGraduationDate());
    albumService.updateAlbumGraduationDateByPk(albumPk,albumUpdateGraduationDateRequest,jwtService.parseJwtToken(accessToken));

    return ResponseEntity.ok().body("success");
  }
}
