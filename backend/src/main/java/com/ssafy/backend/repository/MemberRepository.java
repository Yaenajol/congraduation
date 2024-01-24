package com.ssafy.backend.repository;

import com.ssafy.backend.domain.Member;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, UUID> {

  @Query(nativeQuery = true, value = "select * from Member m where m.member_pk = :memberPk ")
  Member findMemberByPk(@Param("memberPk") String memberPk);
}
