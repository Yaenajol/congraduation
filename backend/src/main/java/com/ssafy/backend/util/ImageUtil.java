package com.ssafy.backend.util;

import java.awt.image.BufferedImage;
import java.awt.image.ConvolveOp;
import java.awt.image.Kernel;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import javax.imageio.ImageIO;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.stereotype.Component;

@Component
public class ImageUtil {
  public InputStream makeResize(MultipartFile file) throws IOException {
    System.out.println("makeResize start=======================");
    BufferedImage image=ImageIO.read(file.getInputStream());
    int width = image.getWidth();
    int height = image.getHeight();

    double rate=((double)height)/width;

    int resizeWidth=(int) width/5;
    int resizeHeight=(int) height/5;

    if(resizeWidth<=300){
      resizeWidth=300;
      resizeHeight=(int) (resizeWidth*rate);
    }
    System.out.println(resizeWidth+" " +resizeHeight);

    ByteArrayOutputStream os = new ByteArrayOutputStream();
    ImageIO.write(resizeImage(image,resizeWidth,resizeHeight), "jpeg", os);
    try{
      InputStream is = new ByteArrayInputStream(os.toByteArray());
      System.out.println("Resize end=======================");
      try{
        return is;
      }finally {
        is.close();
        System.out.println("is close!");
      }
    }finally {
      os.close();
      System.out.println("os close!");
    }
  }

  public InputStream makeThumbnaill (MultipartFile file) throws IOException {
    System.out.println("makeThumbnaill start=======================");
    BufferedImage image=ImageIO.read(file.getInputStream());

    int width = image.getWidth();
    int height = image.getHeight();

    double rate=((double)height)/width;

    int resizeWidth=200;
    int resizeHeight=(int)(resizeWidth*rate);

    ByteArrayOutputStream os = new ByteArrayOutputStream();
    ImageIO.write(resizeImage(image,resizeWidth,resizeHeight), "jpeg", os);

    try{
      InputStream is = new ByteArrayInputStream(os.toByteArray());
      System.out.println("Resize end=======================");
      try{
        return is;
      }finally {
        is.close();
        System.out.println("is close!");
      }
    }finally {
      os.close();
      System.out.println("os close!");
    }
  }

  public InputStream makeThumbnailBlur(MultipartFile file) throws IOException {
    System.out.println("makeThumbnaill start=======================");
    BufferedImage image=ImageIO.read(file.getInputStream());

    int width = image.getWidth();
    int height = image.getHeight();

    double rate=((double)height)/width;

    int resizeWidth=200;
    int resizeHeight=(int)(resizeWidth*rate);

    ByteArrayOutputStream os = new ByteArrayOutputStream();
    BufferedImage resiezedImage=resizeImage(image,resizeWidth,resizeHeight);
    BufferedImage resizedBufferedImage=blurImage(resiezedImage);
    ImageIO.write(resizedBufferedImage, "jpeg", os);
    try{
      InputStream is = new ByteArrayInputStream(os.toByteArray());
      System.out.println("Resize end=======================");
      try{
        return is;
      }finally {
        is.close();
        System.out.println("is close!");
      }
    }finally {
      os.close();
      System.out.println("os close!");
    }
  }

  private BufferedImage blurImage(BufferedImage target) throws IOException {
    int radius = 10;
    int size = radius * 2 + 1;

    float[] data = new float[size * size];

    float sigma = radius / 3.0f;
    float twoSigmaSquare = 2.0f * sigma * sigma;
    float sigmaRoot = (float) Math.sqrt(twoSigmaSquare * Math.PI);
    float total = 0.0f;

    for (int i = -radius; i <= radius; i++) {
      float distance = i * i;
      int index = i + radius;
      data[index] = (float) Math.exp(-distance / twoSigmaSquare) / sigmaRoot;
      total += data[index];
    }

    for (int i = 0; i < data.length; i++) {
      data[i] /= total;
    }
    Kernel kernel = new Kernel(1, size, data);

    ConvolveOp convolveOp = new ConvolveOp(kernel,ConvolveOp.EDGE_NO_OP,null);

    target = convolveOp.filter(target, null);

    kernel = new Kernel(size, 1, data);

    convolveOp = new ConvolveOp(kernel,ConvolveOp.EDGE_NO_OP,null);

    target = convolveOp.filter(target, null);
    return target;
  }

  private BufferedImage resizeImage(BufferedImage image,int resizeWidth,int resizeHeight) throws IOException {
    return Thumbnails.of(image)
        .size(resizeWidth, resizeHeight)
        .outputFormat("jpeg")
        .asBufferedImage();
  }
}
