package com.ssafy.backend.domain;

import com.ssafy.backend.model.request.AlbumUpdateRequestDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Album {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "album_pk")
  private String pk;
  private String title;
  private String coverUrl;
  private String sharedUrl;
  private String graduationPlace;

  @CreatedDate
  private LocalDateTime createdAt;

  // graduationDate 가 update로 설정되어야 나머지 openAt과 expiredAt을 자동으로 배정한다.
  private LocalDateTime graduationDate;
  private LocalDateTime openAt;
  private LocalDateTime expiredAt;

  @OneToOne
  @JoinColumn(name = "member_pk")
  private Member member;

  @OneToMany(mappedBy = "album")
  private List<Memory> MemoryList = new ArrayList<>();

}
