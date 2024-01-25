package com.ssafy.backend.repository;

import com.ssafy.backend.domain.Memory;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemoryRepository extends JpaRepository<Memory, String> {

  @Query(nativeQuery = true, value = "select * from Memory m where m.memory_pk = :memoryPk ")
  Memory findMemoryByPk(@Param("memoryPk") String memoryPk);

  @Query(nativeQuery = true, value = "select * from Memory m where m.album_pk = :albumPk ")
  List<Memory> findAllMemoryInAlbumByAlbumPk(@Param("albumPk") String albumPk);

  List<Memory> findByAlbumPk(String albumPk);
}
