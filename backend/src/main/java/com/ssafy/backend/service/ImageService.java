package com.ssafy.backend.service;

import io.awspring.cloud.s3.ObjectMetadata;
import io.awspring.cloud.s3.S3Resource;
import io.awspring.cloud.s3.S3Template;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.time.Duration;
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

  @Value("${image.output_format}")
  private String imageOutputFormat;

  @Value("${spring.cloud.aws.presigned_exp}")
  private int awsPresignedExp;


  // 참고 깃허브 + 블로그 내용 혼합 사용
  // 블로그가 최신이라 블로그 기준으로 작성하며, 필요한 부분을 깃허브를 참고해서 반영하며 작성하였다.
  // 블로그 : https://techpedia.tistory.com/18
  // 깃허브 : https://github.com/Nliker/sijo/blob/master/src/main/java/com/backend/s3/service/S3ServiceImpl.java

  public String getPresingendURL(String fileName) {
    Duration duration1 = Duration.ofMinutes(awsPresignedExp);
    URL getSignedURL = s3Template.createSignedGetURL(bucketName, fileName, duration1);
    return getSignedURL.toString();
  }

  public String uploadImage(InputStream inputStream) throws IOException{
    String saveFileName = UUID.randomUUID().toString() +"."+ imageOutputFormat;
    s3Template.upload(bucketName, saveFileName, inputStream, ObjectMetadata.builder().contentType("image/"+imageOutputFormat).build());
    return saveFileName;
  }



}
