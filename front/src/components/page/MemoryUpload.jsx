import React, { useRef, useState } from "react";
import "./style.css"; // 이 CSS 파일에는 아래에 제공된 스타일이 포함될 것입니다.
import GridLayout from "react-grid-layout";
import CropOriginal from "@mui/icons-material/CropOriginal";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import myImg from "./myImg.png";
import { useNavigate } from "react-router-dom";
import {Dialog} from "@mui/material";
import DragPage from "../page/DragPage";

const MemoryUpload = () => {
  const [images, setImages] = useState({ a: null, b: null, c: null, d: null });
  const fileInputRef = useRef(null);
  const [selectedGridItem, setSelectedGridItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mergedImage, setMergedImage] = useState(null);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const isReadyToSubmit =
    Object.values(images).every((img) => img !== null) && nickname && message;
  const navigate = useNavigate()

  //모달
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
    // setSelectedImageIndex(null);
  };

  const handleGridItemClick = (key) => {
    setSelectedGridItem(key);
    fileInputRef.current.click();
    setSelectedImage(null)
    setOpenModal(true)
    // navigate('/albums/drag')

  };
  const updateImage = (imageData) => {
    setImages((prevImages) => ({
      ...prevImages,
      [selectedGridItem]: imageData, // 선택된 그리드 아이템에 이미지 데이터 업데이트
    }));
    setOpenModal(false); // 모달 닫기
  };

  const handleImageChange = (e) => {
    const MAX_HEIGHT = 100;
    const file = e.target.files[0];
    if (file && selectedGridItem) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          // 이미지의 너비와 높이를 확인하고 조정
          const aspectRatio = img.width / img.height;
          let newWidth;
          let newHeight;
          if (img.height > MAX_HEIGHT) {
            newHeight = MAX_HEIGHT;
            newWidth = MAX_HEIGHT * aspectRatio;
          } else {
            newWidth = img.width;
            newHeight = img.height;
          }
          // 여기에 캔버스를 사용하여 이미지 크기 조정 로직 추가
          // ...
          setImages((prevImages) => ({
            ...prevImages,
            [selectedGridItem]: reader.result, // 또는 조정된 이미지 데이터
          }));
          setSelectedImage(reader.result)
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const imageSize = 300; // 이미지 크기
  const spacing = 30; // 이미지 사이의 간격

  const positions = [
    { x: spacing, y: spacing }, // 'a' 위치
    { x: imageSize + spacing * 2, y: spacing }, // 'b' 위치
    { x: spacing, y: imageSize + spacing * 2 }, // 'c' 위치
    { x: imageSize + spacing * 2, y: imageSize + spacing * 2 }, // 'd' 위치
  ];

  const handleSubmit = async () => {
    const canvasWidth = imageSize * 2 + spacing * 3;
    const canvasHeight = imageSize * 2 + spacing * 3;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = canvasWidth; // 적절한 크기 설정
    canvas.height = canvasHeight; // 숫자를 키워야 사진이 더 작아짐

    const imgElements = await Promise.all(
      ["a", "b", "c", "d"]
        .map((key) => images[key])
        .map((src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = src;
          });
        })
    );

    imgElements.forEach((img, index) => {
      const pos = positions[index];
      const frameColor = "black";
      const frameThickness = 10;

      // 이미지 그리기
      ctx.drawImage(img, pos.x, pos.y, imageSize, imageSize);

      // 프레임 그리기
      ctx.strokeStyle = frameColor; // 테두리 색상 설정
      ctx.lineWidth = frameThickness; // 테두리 두께 설정
      ctx.strokeRect(
        pos.x - frameThickness / 2,
        pos.y - frameThickness / 2,
        imageSize + frameThickness,
        imageSize + frameThickness
      );
    });

    const mergedImageDataURL = canvas.toDataURL("image/jpeg");
    setMergedImage(mergedImageDataURL);
  };
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

  return (
    <div className="memory-upload">
      <div className="title">Memory</div>
      <div className="image-grid">
        {["a", "b", "c", "d"].map((key) => (
          <div
            className="image-upload"
            key={key}
            onClick={() => handleGridItemClick(key)}
            // style={{ backgroundImage: `url(${myImg})` }}
          >
            {images[key] ? (
              <img
                src={images[key]}
                alt={`${key}-img`}
                style={{ maxWidth: "100%" }}
              />
            ) : (
              <CropOriginal />
            )}
          </div>
        ))}
      </div>

      <input
        type="file"
        style={{ display: "none" }}
        onChange={handleImageChange}
        ref={fileInputRef}
      />

      <br />
      <br />
      <br />

      <TextField
        className="input-field"
        variant="filled"
        multiline
        rows={4} // 표시되는 기본 줄 수 
        type="text"
        label="메시지"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ marginBottom : "10px"}}
        inputProps={{
          maxLength: 200  // 한줄에 20자 들어감 
        }}
      />

      <div className="input-row">
        <TextField
          className="input-field"
          type="text"
          label="별명"
          variant="filled"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style= {{ flex : 1}}
          // 글자수 제한
          inputProps={{
            maxLength: 11
          }}
        />

        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={!isReadyToSubmit}
          style= {{ flex: 0}}
        >
          사진 전송
        </button>
      </div>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth={true}
      >
        <DragPage selectedImage={selectedImage} onUpdateImage={updateImage}/>



      </Dialog>

      {mergedImage && message && nickname && (
        <div>
          <h2>합성 이미지</h2>
          <p>별명 : {nickname}</p>
          <p>메시지: {message}</p>
          <div className="polaroid">
            <img
              className="test"
              src={mergedImage}
              alt="Merged"
              style={{ maxWidth: "40%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryUpload;
