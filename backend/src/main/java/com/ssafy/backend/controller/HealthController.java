package com.ssafy.backend.controller;

import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Slf4j
@RestController
@RequestMapping("health")
@RequiredArgsConstructor
public class HealthController {
  @GetMapping("/ping")
  public ResponseEntity<Map<String,String>> ping(){
    Map<String,String> result=new HashMap<>();
    result.put("result","pong !!!!!!!!!");
    return ResponseEntity.ok().body(result);
  }
}