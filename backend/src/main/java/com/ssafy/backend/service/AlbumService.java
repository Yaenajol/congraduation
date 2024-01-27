package com.ssafy.backend.service;

import com.ssafy.backend.domain.Album;
import com.ssafy.backend.domain.Member;
import com.ssafy.backend.domain.Memory;
import com.ssafy.backend.exception.CustomException;
import com.ssafy.backend.exception.errorcode.AlbumErrorCode;
import com.ssafy.backend.model.request.AlbumUpdateRequestDto;
import com.ssafy.backend.model.response.AlbumMemoryResponseDto;
import com.ssafy.backend.model.response.AlbumResponseDto;
import com.ssafy.backend.repository.AlbumRepository;
import com.ssafy.backend.repository.MemberRepository;
import com.ssafy.backend.repository.MemoryRepository;
import com.ssafy.backend.util.ImageUtil;
import java.awt.image.BufferedImage;
import java.awt.image.ConvolveOp;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.imageio.ImageIO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.awt.image.Kernel;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlbumService {
  private final AlbumRepository albumRepository;
  private final MemoryRepository memoryRepository;
  private final MemberRepository memberRepository;
  private final ImageUtil imageUtil;
  public AlbumResponseDto getAlbumByPk(String albumPk){
    Optional<Album> optAlbum= albumRepository.findById(albumPk);
    if(optAlbum.isEmpty()) {
      throw new CustomException(AlbumErrorCode.NotFoundAlbum.getCode(),
          AlbumErrorCode.NotFoundAlbum.getDescription());
    }

    Album album= optAlbum.get();

    return AlbumResponseDto.builder().nickname(album.getMember().getNickname())
        .title(album.getTitle())
        .coverUrl(album.getTitle())
        .openAt(album.getOpenAt())
        .graduationPlace(album.getGraduationPlace())
        .build();
  }

  public List<AlbumMemoryResponseDto> getAlbumMemoryListByPk(String albumPk) {
    Optional<Album> optAlbum= albumRepository.findById(albumPk);
    if(optAlbum.isEmpty()){
      throw new CustomException(AlbumErrorCode.NotFoundAlbum.getCode(), AlbumErrorCode.NotFoundAlbum.getDescription());
    }
    List<Memory> memoryList=memoryRepository.findByAlbumPk(albumPk);
    List<AlbumMemoryResponseDto> albumMemoryList=new ArrayList<>();
    for(Memory memory:memoryList ){
      albumMemoryList.add(AlbumMemoryResponseDto.builder()
          .memoryPk(memory.getPk())
          .imageUrl(memory.getImageName())
          .build());
    }
    return albumMemoryList;
  }

  public void updateAlbumByPk(String albumPk, AlbumUpdateRequestDto albumUpdateRequest) {
    Optional<Album> optAlbum= albumRepository.findById(albumPk);
    if(optAlbum.isEmpty()){
      throw new CustomException(AlbumErrorCode.NotFoundAlbum.getCode(), AlbumErrorCode.NotFoundAlbum.getDescription());
    }

    //토큰이 앨범의 주인과 일치하는가?
    Album album = optAlbum.get();
    System.out.println(album.getMember().getPk());
    album.setCoverUrl(albumUpdateRequest.getCoverUrl());
    album.setGraduationPlace(albumUpdateRequest.getGraduationPlace());
    album.setTitle(albumUpdateRequest.getTitle());

    //이미 졸업일이 설정되어 있다면 생략
    if(album.getGraduationDate()==null){
      album.setGraduationDate(albumUpdateRequest.getGraduationDate().atStartOfDay());
      album.setOpenAt(albumUpdateRequest.getGraduationDate().plusDays(1).atStartOfDay());
      album.setExpiredAt(albumUpdateRequest.getGraduationDate().plusDays(2).atStartOfDay());
    }
    albumRepository.saveAndFlush(album);

    Member member=album.getMember();
    member.setNickname(albumUpdateRequest.getNickname());
    memberRepository.saveAndFlush(member);
  }
  public Resource sendMediaImage(MultipartFile file) throws IOException {
    InputStream is=imageUtil.makeResize(file);
    try{
      return new ByteArrayResource(is.readAllBytes());
    }finally {
      System.out.println("is close!");
      is.close();
    }
  }
}
