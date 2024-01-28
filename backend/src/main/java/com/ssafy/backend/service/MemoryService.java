package com.ssafy.backend.service;

import com.ssafy.backend.domain.Album;
import com.ssafy.backend.domain.Member;
import com.ssafy.backend.domain.Memory;
import com.ssafy.backend.exception.CustomException;
import com.ssafy.backend.exception.errorcode.AlbumErrorCode;
import com.ssafy.backend.exception.errorcode.ImageErrorCode;
import com.ssafy.backend.exception.errorcode.MemberErrorCode;
import com.ssafy.backend.exception.errorcode.MemoryErrorCode;
import com.ssafy.backend.model.request.MemoryRequestDto;
import com.ssafy.backend.model.response.MemoryResponseDto;
import com.ssafy.backend.repository.AlbumRepository;
import com.ssafy.backend.repository.MemberRepository;
import com.ssafy.backend.repository.MemoryRepository;
import com.ssafy.backend.util.ImageUtil;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemoryService {

  private final MemoryRepository memoryRepository;
  private final MemberRepository memberRepository;
  private final AlbumRepository albumRepository;
  private final ImageService imageService;
  private final ImageUtil imageUtil;


  public MemoryResponseDto getMemory(String memoryPk,String memberPk) {
    Optional<Memory> optMemory = memoryRepository.findById(memoryPk);
    if(optMemory.isEmpty()){//해당 메모리가 존재하는가?
      throw new CustomException(MemoryErrorCode.NotFoundMemory.getCode(),MemoryErrorCode.NotFoundMemory.getDescription());
    }

    Memory memory=optMemory.get();
    Album album=memory.getAlbum();

    if(!album.getMember().getPk().equals(memberPk)){//해당 메모리의 유저와 현재 로그인된 유저가 일치하는가?
      throw new CustomException(MemoryErrorCode.NotMatchMember.getCode(),MemoryErrorCode.NotMatchMember.getDescription());
    }

    if(album.getOpenAt() == null){//해당 앨범의 공개날짜가 설정이 되어 있는가?
      throw new CustomException(AlbumErrorCode.NotSettingOpenAt.getCode(),AlbumErrorCode.NotSettingOpenAt.getDescription());
    }

    LocalDateTime albumOpenAt = album.getOpenAt();
    LocalDateTime now = LocalDateTime.now();
    if(now.isBefore(albumOpenAt)){//조회하는 시점이 해당 앨범의 공개일 전인가?
      throw new CustomException(AlbumErrorCode.NotOpened.getCode(), AlbumErrorCode.NotOpened.getDescription());
    }
    String imageUrl= imageService.getPresingendURL(memory.getImageName());

    return MemoryResponseDto.builder()
        .nickname(memory.getNickname())
        .content(memory.getContent())
        .ImageUrl(imageUrl).build();
  }

  /** 메모리 작성 **/
  @Transactional
  public String writeMemory(MultipartFile image, MemoryRequestDto memoryRequestDto, String memberPk) {
    //확장자만 따로 추출해서 유동적으로 받을 수 있도록 하는 로직 추가
    //    String ext = Files.getFileExtension(path);
    //    System.out.println(ext);

    Optional<Member> optMember = memberRepository.findById(memberPk);    // 메모리 작성자 가져오기

    if (optMember.isEmpty()) { //해당 멤버가 존재하는가?
      throw new CustomException(MemberErrorCode.NotFoundMember.getCode(), MemberErrorCode.NotFoundMember.getDescription());
    }
    Member member=optMember.get();

    Optional<Album> optAlbum = albumRepository.findById(memoryRequestDto.getAlbumPk());
    if (optAlbum.isEmpty()) {//해당 앨범이 존재하는가?
      throw new CustomException(AlbumErrorCode.NotFoundAlbum.getCode(), AlbumErrorCode.NotFoundAlbum.getDescription()) ;
    }

    Album album=optAlbum.get();

    if(member.getPk().equals(album.getMember().getPk())){
      throw new CustomException(MemoryErrorCode.NotWritableInYourAlbum.getCode(),MemoryErrorCode.NotWritableInYourAlbum.getDescription());
    }
    if(album.getOpenAt() == null){//해당 앨범의 공개날짜가 설정이 되어 있는가?
      throw new CustomException(AlbumErrorCode.NotSettingOpenAt.getCode(),AlbumErrorCode.NotSettingOpenAt.getDescription());
    }

    LocalDateTime albumOpenAt = album.getOpenAt();
    LocalDateTime now = LocalDateTime.now();
    if(now.isAfter(albumOpenAt)){//작성하는 시점이 해당 앨범의 공개일을 넘겼는가?
      throw new CustomException(AlbumErrorCode.NotWritable.getCode(), AlbumErrorCode.NotWritable.getDescription());
    }

    if (image.isEmpty()) {//업로드하는 이미지가 존재하는가?
      throw new CustomException(ImageErrorCode.NotFoundImage.getCode(), ImageErrorCode.NotFoundImage.getDescription());
    }

    // 이미지 업로드
    try {
      String imageName = imageService.uploadImage(imageUtil.makeResize(image));
      String thumbnailImageName = imageService.uploadImage(imageUtil.makeThumbnaill(image));
      String thumbnailBlurImageName =  imageService.uploadImage(imageUtil.makeThumbnailBlur(image));
      // 메모리 생성 : pk uuid로 설정
      Memory memory = Memory.builder()
          .member(optMember.get())
          .album(album)
          .nickname(memoryRequestDto.getNickname())
          .content(memoryRequestDto.getContent())
          .imageName(imageName)
          .thumbnailImageName(thumbnailImageName)
          .thumbnailBlurImageName(thumbnailBlurImageName)
          .build();
      // 메모리 저장
      memoryRepository.save(memory);

    } catch (IOException ie) {
      throw new CustomException(ImageErrorCode.UploadImageFail.getCode(), ImageErrorCode.UploadImageFail.getDescription());
    }

    return "success";
  }


}
