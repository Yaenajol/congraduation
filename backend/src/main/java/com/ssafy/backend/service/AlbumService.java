package com.ssafy.backend.service;

import com.ssafy.backend.domain.Album;
import com.ssafy.backend.domain.Member;
import com.ssafy.backend.domain.Memory;
import com.ssafy.backend.exception.CustomException;
import com.ssafy.backend.exception.errorcode.AlbumErrorCode;
import com.ssafy.backend.exception.errorcode.ImageErrorCode;
import com.ssafy.backend.model.request.AlbumUpdateGraduationDateRequestDto;
import com.ssafy.backend.model.request.AlbumUpdateRequestDto;
import com.ssafy.backend.model.response.AlbumMemoryResponseDto;
import com.ssafy.backend.model.response.AlbumResponseDto;
import com.ssafy.backend.repository.AlbumRepository;
import com.ssafy.backend.repository.MemberRepository;
import com.ssafy.backend.util.ImageUtil;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AlbumService {
  private final AlbumRepository albumRepository;
  private final MemberRepository memberRepository;
  private final ImageUtil imageUtil;
  private final ImageService imageService;

  public AlbumResponseDto getAlbumByPk(String albumPk){
    Optional<Album> optAlbum= albumRepository.findById(albumPk);

    if(optAlbum.isEmpty()) {//앨범이 존재하는가?
      throw new CustomException(AlbumErrorCode.NotFoundAlbum.getCode(),
          AlbumErrorCode.NotFoundAlbum.getDescription());
    }

    Album album= optAlbum.get();

    String coverUrl=null;
    if(album.getCoverImageName()!=null){//현재 저장된 이미지가 존재할 경우는 presignedUrl을 발급 후 저장
      coverUrl=imageService.getPresingendURL(album.getCoverImageName());
    }

    return AlbumResponseDto.builder().nickname(album.getMember().getNickname())
        .title(album.getTitle())
        .coverUrl(coverUrl)
        .openAt(album.getOpenAt())
        .graduationPlace(album.getGraduationPlace())
        .build();
  }

  public List<AlbumMemoryResponseDto> getAlbumMemoryListByPk(String albumPk) {
    Optional<Album> optAlbum= albumRepository.findById(albumPk);
    if(optAlbum.isEmpty()){//앨범이 존재하는가?
      throw new CustomException(AlbumErrorCode.NotFoundAlbum.getCode(), AlbumErrorCode.NotFoundAlbum.getDescription());
    }

    Album album=optAlbum.get();

    List<Memory> memoryList=album.getMemoryList();

    List<AlbumMemoryResponseDto> albumMemoryList=new ArrayList<>();


    LocalDateTime albumOpenAt = album.getOpenAt();
    LocalDateTime now = LocalDateTime.now();
    if(albumOpenAt==null || now.isBefore(albumOpenAt)){//공개일이 설정되지 않았거나 공개일 이전일 경우 블러썸네일 이미지로
      for(Memory memory:memoryList ){
        albumMemoryList.add(AlbumMemoryResponseDto.builder()
            .memoryPk(memory.getPk())
            .imageUrl(imageService.getPresingendURL(memory.getThumbnailBlurImageName()))
            .nickName(memory.getNickname())
            .build());
      }
    }else{
      for(Memory memory:memoryList ){//공개일 이후일 경우에는 썸네일 이미지로
        albumMemoryList.add(AlbumMemoryResponseDto.builder()
            .memoryPk(memory.getPk())
            .imageUrl(imageService.getPresingendURL(memory.getThumbnailImageName()))
            .nickName(memory.getNickname())
            .build());
      }
    }

    return albumMemoryList;
  }

  @Transactional
  public void updateAlbumByPk(String albumPk, AlbumUpdateRequestDto albumUpdateRequest,String memberPk) {
    Optional<Album> optAlbum= albumRepository.findById(albumPk);
    if(optAlbum.isEmpty()){//앨범이 실제로 존재하는가?
      throw new CustomException(AlbumErrorCode.NotFoundAlbum.getCode(), AlbumErrorCode.NotFoundAlbum.getDescription());
    }
    Album album=optAlbum.get();
    if(!album.getMember().getPk().equals(memberPk)){//해당 멤버가 앨범의 소유주인가?
      throw new CustomException(AlbumErrorCode.NotMatchMember.getCode(),AlbumErrorCode.NotMatchMember.getDescription());
    }

    album.setGraduationPlace(albumUpdateRequest.getGraduationPlace());
    album.setTitle(albumUpdateRequest.getTitle());

    albumRepository.saveAndFlush(album);

    Member member=album.getMember();
    member.setNickname(albumUpdateRequest.getNickname());
    memberRepository.saveAndFlush(member);
  }

  @Transactional
  public String updateAlbumCoverImageByPk(String albumPk, MultipartFile image, String memberPk) {
    Optional<Album> optAlbum= albumRepository.findById(albumPk);
    if(optAlbum.isEmpty()){//앨범이 실제로 존재하는가?
      throw new CustomException(AlbumErrorCode.NotFoundAlbum.getCode(), AlbumErrorCode.NotFoundAlbum.getDescription());
    }

    Album album=optAlbum.get();
    if(!album.getMember().getPk().equals(memberPk)){//해당 멤버가 앨범의 소유주인가?
      throw new CustomException(AlbumErrorCode.NotMatchMember.getCode(),AlbumErrorCode.NotMatchMember.getDescription());
    }

    if (image.isEmpty()) {//업로드하는 이미지가 존재하는가?
      throw new CustomException(ImageErrorCode.NotFoundImage.getCode(), ImageErrorCode.NotFoundImage.getDescription());
    }

    try{
      String imageName = imageService.uploadImage(imageUtil.makeResize(image));
      album.setCoverImageName(imageName);
      albumRepository.saveAndFlush(album);

      return imageService.getPresingendURL(album.getCoverImageName());
    } catch (IOException ie) {
    throw new CustomException(ImageErrorCode.UploadImageFail.getCode(), ImageErrorCode.UploadImageFail.getDescription());
    }
  }

  @Transactional
  public void updateAlbumGraduationDateByPk(String albumPk, AlbumUpdateGraduationDateRequestDto albumUpdateGraduationDateRequest, String memberPk) {
    Optional<Album> optAlbum= albumRepository.findById(albumPk);
    if(optAlbum.isEmpty()){//앨범이 실제로 존재하는가?
      throw new CustomException(AlbumErrorCode.NotFoundAlbum.getCode(), AlbumErrorCode.NotFoundAlbum.getDescription());
    }

    Album album=optAlbum.get();
    if(!album.getMember().getPk().equals(memberPk)){//해당 멤버가 앨범의 소유주인가?
      throw new CustomException(AlbumErrorCode.NotMatchMember.getCode(),AlbumErrorCode.NotMatchMember.getDescription());
    }

    if(album.getOpenAt()!=null){//이미 졸업일이 설정되어있는가?
      throw new CustomException(AlbumErrorCode.NotSettableGraduationDate.getCode(),AlbumErrorCode.NotSettableGraduationDate.getDescription());
    }

    LocalDate graduationDate=albumUpdateGraduationDateRequest.getGraduationDate();

    album.setGraduationDate(graduationDate.atStartOfDay());
    album.setOpenAt(graduationDate.plusDays(1).atStartOfDay());
    album.setExpiredAt(graduationDate.plusDays(2).atStartOfDay());

    albumRepository.saveAndFlush(album);
  }
}
