package com.ssafy.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
  private String pk;

  private String nickname;
  private String content;
  private String imageUrl;

  @CreatedDate
  private LocalDateTime createdAt;

  @ManyToOne
  @JoinColumn(name = "member_pk")
  private Member member;

  @ManyToOne
  @JoinColumn(name = "album_pk")
  private Album album;

}
