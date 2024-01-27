package com.ssafy.backend.repository;

import com.ssafy.backend.domain.Album;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepository extends JpaRepository<Album, String> {

  @Query(nativeQuery = true, value = "select * from album a where a.album_pk = :albumPk")
  Album findAlbumByPk(@Param("albumPk") String albumPk);

  @Query(nativeQuery = true, value = "select * from album a where a.member_pk = :memberPk")
  Album findAlbumByMemberPk(@Param("memberPk") String memberPk);

  Album findByMemberPk(String memberPk);
}
