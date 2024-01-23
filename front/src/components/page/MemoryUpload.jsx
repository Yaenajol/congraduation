// 메모리 업로드 페이지 ("/memories")

import React, { useRef, useState } from 'react';
import GridLayout from "react-grid-layout"

import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

//내부 경로

import MemoryMessage from '../text/MemoryMessage';
import "./MemoryUpload.css"

function ImageUpload() {
    const [images, setImages] = useState({ a: null, b: null, c: null, d: null});
    const fileInputRef = useRef(null)
    const [selectedGridItem, setSelectedGridItem] = useState(null)
    const [mergedImage, setMergedImage] = useState(null)
    const [nickname, setNickname] = useState("")
    const [message, setMessage] = useState("")
    const isReadyToSubmit = Object.values(images).every(img => img !== null) && nickname && message;

    const layout = [
        { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
        { i: "b", x: 0, y: 1, w: 1, h: 2, static: true },
        { i: "c", x: 1, y: 0, w: 1, h: 2, static: true},
        { i: "d", x: 1, y: 1, w: 1, h: 2, static: true},
    ];

    const handleGridItemClick = (itemKey) => {
        setSelectedGridItem(itemKey)
        fileInputRef.current.click()
    }
    
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        console.log(e.target.files)
        if (file && selectedGridItem) {
            const reader = new FileReader()
            console.log(reader)
            reader.onloadend = () => {
                setImages({
                    ...images,
                    [selectedGridItem]: reader.result
                })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 1600;      // 적절한 크기 설정
      canvas.height = 1600;     // 숫자를 키워야 사진이 더 작아짐
      
      const imageSize = 400;    // 이미지 크기
      const borderSize = 10;    // 테두리의 두께
      const spacing = 20;       // 이미지 사이의 간격

      // 이미지를 그릴 위치 설정
      const positions = [
          { x: spacing, y: spacing },                                             // 첫 번째 이미지 위치
          { x: spacing, y: imageSize + spacing * 2 },                             // 두 번째 이미지 위치
          { x: imageSize + spacing * 2, y: spacing },                             // 세 번째 이미지 위치
          { x: imageSize + spacing * 2, y: imageSize + spacing * 2 },             // 네 번째 이미지 위치
      ];
      
      const imgElements = await Promise.all(
          Object.values(images).map(src => {
            return new Promise((resolve) => {
                const img = new Image()
                img.onload = () => resolve(img)
                img.src = src
            })
        })
      );
    

      imgElements.forEach((img, index) => {
          const pos = positions[index];

          // 이미지 그리기
          ctx.drawImage(img, pos.x, pos.y, imageSize, imageSize);

          // 프레임 그리기
          ctx.strokeStyle = 'white'; // 테두리 색상 설정
          ctx.lineWidth = borderSize; // 테두리 두께 설정
          ctx.strokeRect(pos.x - borderSize / 2, pos.y - borderSize / 2, imageSize + borderSize, imageSize + borderSize);
      });
  
      const mergedImageDataURL = canvas.toDataURL('image/png');
      setMergedImage(mergedImageDataURL);
      // 합쳐진 이미지를 백엔드로 전송하는 코드 
    //   if (isReadyToSubmit) {
    //     try {
    //         const payload = {
    //             image : mergedImageDataURL,
    //             nickname,
    //             message,
    //         }

    //         const response = await fetch("백주소 ", {
    //             method: 'POST',
    //             body: JSON.stringify(payload),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })

    //         if (response.ok) {
    //             console.log('성공')
    //             // 앨범페이지로 다시 리다이렉션
    //         } else {
    //             console.log('실패')
    //         }
    //     } catch (error) {
    //         console.log('전송 중 실패', error)
    //     }
    //   }
      
    };
  

    return (
        <div>
            <GridLayout   
                className="layout, location"
                layout={layout}
                cols={12}
                rowHeight={50}
                width={1500}
            >
                {['a', 'b', 'c', 'd'].map((key) => (
                    <div className="test" key={key} onClick={() => handleGridItemClick(key)}>
                        {images[key] ? null : '+'}
                        {images[key] && <img src={images[key]} alt={`${key}-img`} style={{ maxWidth: '100%' }} />}
                    </div>
                ))}
            </GridLayout>
            
            {/* 사진 추가 하는 기능  */}
            <input
                type="file"
                style={{ display: 'none' }}
                onChange={handleImageChange}
                ref={fileInputRef}
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="별명을 입력하세요"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
            />
            <textarea
                placeholder="문구를 입력하세요"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />

            {isReadyToSubmit && (
                <button onClick={handleSubmit}>사진 전송</button>
            )}
            

            {/* {Object.values(images).filter(Boolean).length === 4 && (
                <button onClick={handleSubmit}>사진 전송</button>
            )} */}


            
            {/* 아래 코드는 프론트에서 결과 확인용, 백엔드 요청이 성공하면 필요없음 (미리보기 기능 구현시 필요할수도) */}
            {mergedImage && message && nickname &&(
              <div>
                <h2>합성 이미지</h2>
                <p>별명 : {nickname}</p>
                <p>메시지: {message}</p>
                <img src={mergedImage} alt="Merged" style={{ maxWidth: '100%'}}/>

              </div>
            )}
        </div>
    );
}

export default ImageUpload;
