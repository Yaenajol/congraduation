package com.ssafy.backend.service;

import io.awspring.cloud.s3.ObjectMetadata;
import io.awspring.cloud.s3.S3Resource;
import io.awspring.cloud.s3.S3Template;
import java.io.IOException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ImageService {
  private final S3Template s3Template;

  @Value("${spring.cloud.aws.s3.bucket}")
  private String bucketName;

  // 참고 깃허브 + 블로그 내용 혼합 사용
  // 블로그가 최신이라 블로그 기준으로 작성하며, 필요한 부분을 깃허브를 참고해서 반영하며 작성하였다.
  // 블로그 : https://techpedia.tistory.com/18
  // 깃허브 : https://github.com/Nliker/sijo/blob/master/src/main/java/com/backend/s3/service/S3ServiceImpl.java
  @Transactional
  public String uploadThumbnailAndReturnUrl(MultipartFile multipartFile, String memberPk) throws IOException {
    String originalFileName = multipartFile.getOriginalFilename(); // 클라이언트가 전송한 파일 이름

    // 파일 이름 중복 방지 ::  파일 고유 uuid + "-" + 작성한memberPk
    String saveFileName = UUID.randomUUID().toString() + "-" + memberPk ;

    // S3에 파일 업로드
    S3Resource s3Resource = s3Template.upload(bucketName, saveFileName, multipartFile.getInputStream(), ObjectMetadata.builder().contentType(multipartFile.getContentType()).build());

    // 업로드 된 썸네일 Url을 리턴 : 엔티티 필드에 삽입
    return s3Resource.getURL().toString();
  }

}
