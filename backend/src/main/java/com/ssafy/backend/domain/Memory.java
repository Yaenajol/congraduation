package com.ssafy.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Memory {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "memory_pk")
  @Size(max=100)
  private String pk;

  @Column(name = "nickname",nullable = false)
  @Size(max=100)
  private String nickname;

  @Column(name = "content",nullable = false)
  @Size(max=100)
  private String content;

  @Column(name = "image_name",nullable = false)
  @Size(max=100)
  private String imageName;

  @Column(name = "thumbnail_image_name",nullable = false)
  @Size(max=100)
  private String thumbnailImageName;

  @Column(name = "thumbnail_blur_image_name",nullable = false)
  @Size(max=100)
  private String thumbnailBlurImageName;

  @Column(name = "created_at",nullable=false, updatable = false,insertable = false, columnDefinition = "DATETIME(6) DEFAULT NOW(6)")
  private LocalDateTime createdAt;

  @ManyToOne
  @JoinColumn(name = "member_pk",nullable = false, updatable = false,columnDefinition="varchar(100)")
  private Member member;

  //eager
  @ManyToOne
  @JoinColumn(name = "album_pk",nullable = false, updatable = false,columnDefinition="varchar(100)")
  private Album album;
}
