package com.ssafy.backend.domain;

import com.ssafy.backend.model.request.AlbumUpdateRequestDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Size;
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
  @Size(max=100)
  private String pk;

  @Column(name = "title")
  @Size(max=50)
  private String title;

  @Column(name = "cover_url")
  @Size(max=2048)
  private String coverUrl;

  @Column(name = "graduation_place")
  @Size(max=50)
  private String graduationPlace;

  @Column(name = "created_at",nullable=false, updatable = false,insertable = false, columnDefinition = "DATETIME(6) DEFAULT NOW(6)")
  private LocalDateTime createdAt;

  // graduationDate 가 update로 설정되어야 나머지 openAt과 expiredAt을 자동으로 배정한다.
  @Column(name = "graduation_date")
  private LocalDateTime graduationDate;

  @Column(name = "open_at")
  private LocalDateTime openAt;

  @Column(name = "expired_at")
  private LocalDateTime expiredAt;

  @OneToOne
  @JoinColumn(name = "member_pk",nullable = false, updatable = false,columnDefinition="varchar(100)")
  private Member member;

  @OneToMany(mappedBy = "album")
  private List<Memory> MemoryList = new ArrayList<>();
}
