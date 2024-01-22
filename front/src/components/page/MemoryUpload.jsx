// 메모리 업로드 페이지 ("/memories")

import React, { useState } from 'react';


//내부 경로
import Frames from "../frames/Frame"
import MemoryMessage from '../text/MemoryMessage';

function ImageUpload() {
    const [images, setImages] = useState([]);
    const [mergedImage, setMergedImage] = useState(null);

    const handleImageChange = (e) => {
        // 파일을 읽어서 images 상태에 추가
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImages([...images, reader.result]);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 800; // 적절한 크기 설정
      canvas.height = 800;
  
      const imgElements = await Promise.all(
          images.map(src => {
              return new Promise((resolve) => {
                  const img = new Image();
                  img.onload = () => resolve(img);
                  img.src = src;
              });
          })
      );
  
      imgElements.forEach((img, index) => {
          const xOffset = (index % 2) * 400;           // 가로 위치
          const yOffset = Math.floor(index / 2) * 400; // 세로 위치
          ctx.drawImage(img, xOffset, yOffset, 400, 400);
      });
  
      const mergedImageDataURL = canvas.toDataURL('image/png');
      setMergedImage(mergedImageDataURL);
      // 합쳐진 이미지를 백엔드로 전송하는 코드 
      // try {
      //   const response = await fetch(백엔드주소, {
      //       method: 'POST',
      //       body: JSON.stringify({ image: mergedImage }),
      //       headers: {
      //           'Content-Type': 'application/json'
      //       }
      //   });

      //   if (response.ok) {
      //       console.log('이미지 전송 성공');
      //       // 여기서 메인 페이지로 리디렉션
      //   } else {
      //       console.error('서버 에러 발생');
      //   }
      // } catch (error) {
      //     console.error('전송 중 에러 발생:', error);
      // }
  };
  

    return (
        <div>
            <Frames/>
            {images.length < 4 && (
                <input type='file' onChange={handleImageChange} />
            )}
            {images.map((image, index) => (
                <img key={index} src={image} alt={`uploaded-img-${index}`} />
            ))}
            {images.length === 4 && (
                <button onClick={handleSubmit}>사진 전송</button>
            )}

            <MemoryMessage />
            {/* 아래 코드는 프론트에서 결과 확인용, 백엔드 요청이 성공하면 필요없음 (미리보기 기능 구현시 필요할수도) */}
            {mergedImage && (
              <div>
                <h2>합성 이미지</h2>
                <img src={mergedImage} alt="Merged" style={{ maxWidth: '100%'}}/>
              </div>
            )}
        </div>
    );
}

export default ImageUpload;
