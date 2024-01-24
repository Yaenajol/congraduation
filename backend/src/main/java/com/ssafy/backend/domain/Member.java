package com.ssafy.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
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
public class Member {

  @Id
  @Column(name = "member_pk")
  private String pk;
  private String nickname;

  @CreatedDate
  private LocalDateTime createdAt;
  private LocalDateTime deletedAt;

  @OneToMany(mappedBy = "writer")
  private List<Feedback> feedbackList = new ArrayList<>();

  @OneToOne(mappedBy = "member")
  private Album album;

  @OneToMany(mappedBy = "member")
  private List<Memory> memoryList = new ArrayList<>();

}
