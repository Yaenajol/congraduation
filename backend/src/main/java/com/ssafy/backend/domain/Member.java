package com.ssafy.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class Member {

  @Id
  @Column(name = "member_pk")
  @Size(max=100)
  private String pk;

  @Column(name="nickname",nullable = false)
  @Size(max=50)
  private String nickname;

  @Column(name = "created_at",nullable=false, updatable = false,insertable = false, columnDefinition = "DATETIME(6) DEFAULT NOW(6)")
  private LocalDateTime createdAt;

  @Column(name="deleted_at")
  private LocalDateTime deletedAt;

  @OneToMany(mappedBy = "writer")
  private List<Feedback> feedbackList = new ArrayList<>();

  @OneToOne(mappedBy = "member")
  private Album album;

  @OneToMany(mappedBy = "member")
  private List<Memory> memoryList = new ArrayList<>();

}
