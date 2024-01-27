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
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemoryService {
  @Value("${image.input_format}")
  private String imageInputFormat;

  private final MemoryRepository memoryRepository;
  private final MemberRepository memberRepository;
  private final AlbumRepository albumRepository;
  private final ImageService imageService;
  private final ImageUtil imageUtil;


  public MemoryResponseDto getMemory(String memoryPk,String memberPk) {
    Optional<Memory> memory = memoryRepository.findById(memoryPk);
    if(memory.isEmpty()){
      throw new CustomException(MemoryErrorCode)
    }
    return MemoryResponseDto.builder()
        .nickname(memory.getNickname())
        .content(memory.getContent())
        .ImageUrl(memory.getImageName()).build();
  }

  /** albumPk로 메모리 리스트 가져오기 **/
  public List<Memory> getAllMemoryInAlbum(String albumPk) {
    return memoryRepository.findAllMemoryInAlbumByAlbumPk(albumPk);
  }

  /** 메모리 작성 **/
  @Transactional
  public String writeMemory(MultipartFile image, MemoryRequestDto memoryRequestDto, String memberPk) {
    // 엔티티 조회
    //일치하지 않은 input format 은보 내버리기
//    String ext = Files.getFileExtension(path);
//    System.out.println(ext);

    Optional<Member> optMember = memberRepository.findById(memberPk);    // 메모리 작성자 가져오기

    if (optMember.isEmpty()) {
      throw new CustomException(MemberErrorCode.NotFoundMember.getCode(), MemberErrorCode.NotFoundMember.getDescription());
    }
    Optional<Album> optAlbum = albumRepository.findById(memoryRequestDto.getAlbumPk());       // 메모리 작성되는 앨범 가져오기

    if (optAlbum.isEmpty()) {
      throw new CustomException(AlbumErrorCode.NotFoundAlbum.getCode(), AlbumErrorCode.NotFoundAlbum.getDescription()) ;
    }
    // Exception File(Image)
    if (image.isEmpty()) {
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
          .album(optAlbum.get())
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
