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
    BufferedImage image=ImageIO.read(file.getInputStream());
    int width = image.getWidth();
    int height = image.getHeight();
    BufferedImage resizImage=null;
    if(width <= 300 && height <=300){
      System.out.println("1");
      resizImage=image;
    }
    if(width >= height && width >300){
      System.out.println("2");
      double rate=((double)height)/width;
      width=300;
      height=(int) (width*rate);
      resizImage=resizeImage(image,width,height);
    }else if(width < height && height > 300){
      System.out.println("3");
      double rate=((double)width)/height;
      height=300;
      width=(int) (height*rate);
      resizImage=resizeImage(image,width,height);
    }
    ByteArrayOutputStream os = new ByteArrayOutputStream();
    ImageIO.write(resizImage, "jpeg", os);
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
    BufferedImage image=ImageIO.read(file.getInputStream());
    int width = image.getWidth();
    int height = image.getHeight();
    BufferedImage resizImage=null;
    if(width <= 100 && height <=100){
      System.out.println("1");
      resizImage=image;
    }
    if(width >= height && width >100){
      System.out.println("2");
      double rate=((double)height)/width;
      width=100;
      height=(int) (width*rate);
      resizImage=resizeImage(image,width,height);
    }else if(width < height && height > 100){
      System.out.println("3");
      double rate=((double)width)/height;
      height=100;
      width=(int) (height*rate);
      resizImage=resizeImage(image,width,height);
    }
    ByteArrayOutputStream os = new ByteArrayOutputStream();
    ImageIO.write(resizImage, "jpeg", os);
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
    BufferedImage image=ImageIO.read(file.getInputStream());
    int width = image.getWidth();
    int height = image.getHeight();
    BufferedImage resizImage=null;
    if(width <= 100 && height <=100){
      System.out.println("1");
      resizImage=image;
    }
    if(width >= height && width >100){
      System.out.println("2");
      double rate=((double)height)/width;
      width=100;
      height=(int) (width*rate);
      resizImage=resizeImage(image,width,height);
    }else if(width < height && height > 100){
      System.out.println("3");
      double rate=((double)width)/height;
      height=100;
      width=(int) (height*rate);
      resizImage=resizeImage(image,width,height);
    }
    ByteArrayOutputStream os = new ByteArrayOutputStream();

    BufferedImage resizeBlurImage=blurImage(resizImage);
    ImageIO.write(resizeBlurImage, "jpeg", os);
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
    int radius = 5;
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
