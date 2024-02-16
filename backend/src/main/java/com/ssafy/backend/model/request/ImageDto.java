package com.ssafy.backend.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ImageDto {
  private String originalFileName;
  private String saveFileName;
}
