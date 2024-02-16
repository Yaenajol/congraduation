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
public class Feedback {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "feedback_pk")
  @Size(max=100)
  private String pk;

  @Column(name = "content",nullable = false)
  @Size(max=1000)
  private String content;

  @Column(name = "created_at",nullable=false, updatable = false,insertable = false, columnDefinition = "DATETIME(6) DEFAULT NOW(6)")
  private LocalDateTime createdAt;

  @ManyToOne
  @JoinColumn(name = "member_pk",nullable = false, updatable = false,columnDefinition="varchar(100)")
  private Member writer;
}
