package com.ssafy.backend.service;

import com.ssafy.backend.domain.Album;
import com.ssafy.backend.domain.Member;
import com.ssafy.backend.domain.Memory;
import com.ssafy.backend.model.request.MemoryRequestDto;
import com.ssafy.backend.model.response.MemoryResponseDto;
import com.ssafy.backend.repository.AlbumRepository;
import com.ssafy.backend.repository.MemberRepository;
import com.ssafy.backend.repository.MemoryRepository;
import com.ssafy.backend.util.ImageUtil;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemoryService {

  private final MemoryRepository memoryRepository;
  private final MemberRepository memberRepository;
  private final AlbumRepository albumRepository;
  private final ImageUtil imageUtil;
  public MemoryResponseDto getMemory(String memoryPk) {
    Memory memory = memoryRepository.findMemoryByPk(memoryPk);

    return MemoryResponseDto.builder()
        .nickname(memory.getNickname())
        .content(memory.getContent())
        .ImageUrl(memory.getImageUrl()).build();
  }

  /** albumPk로 메모리 리스트 가져오기 **/
  public List<Memory> getAllMemoryInAlbum(String albumPk) {
    return memoryRepository.findAllMemoryInAlbumByAlbumPk(albumPk);
  }

  /** 메모리 작성 **/
  @Transactional
  public Memory writeMemory(MemoryRequestDto memoryRequestDto) {
    // 엔티티 조회
    Member writer = memberRepository.findMemberByPk(memoryRequestDto.getMemberPk());    // 메모리 작성자 가져오기
    Album album = albumRepository.findAlbumByPk(memoryRequestDto.getAlbumPk());       // 메모리 작성되는 앨범 가져오기

    // 메모리 생성 : pk uuid로 설정
    Memory memory = Memory.builder()
        .member(writer)
        .album(album)
        .nickname(memoryRequestDto.getNickname())
        .content(memoryRequestDto.getContent())
        .imageUrl(memoryRequestDto.getImageUrl()).build();

    // 메모리 저장
    memoryRepository.save(memory);

    return memory;
  }


}
