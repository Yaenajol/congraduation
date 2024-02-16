package com.ssafy.backend.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OrderBy;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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

  @Column(name = "cover_image_name")
  @Size(max=100)
  private String coverImageName;

  @Column(name = "graduation_place")
  @Size(max=50)
  private String graduationPlace;

  @Column(name = "created_at",nullable=false, updatable = false,insertable = false, columnDefinition = "DATETIME(6) DEFAULT NOW(6)")
  private LocalDateTime createdAt;

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
  @OrderBy("created_at desc")
  private List<Memory> MemoryList = new ArrayList<>();
}
