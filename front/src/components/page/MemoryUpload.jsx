import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./style.css"; 
import GridLayout from "react-grid-layout";
import CropOriginal from "@mui/icons-material/CropOriginal";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import MemoryAdd from '../button/MemoryAdd'
import MemoryAdd1 from '../button/MemoryAdd1'
import backgroundImage from '../images/background.png'
import {Dialog} from "@mui/material";
import DragPage from "../page/DragPage";
import { isLoginAtom } from "../store/atom";
import { lookingPkAtom } from "../store/atom";
import axios from "axios";
import StyledMemoryPage from "../styledComponents/StyledMemoryPage";

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
  
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom)
  const [lookingPk, setLookingPk] = useRecoilState(lookingPkAtom)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(()=> {
    if (isLogin) {
      if (params.PK) {
        axios.get(
          `https://congraduation.me/backapi/members/authority?albumPk=${params.PK}`,
          { headers: { accessToken: sessionStorage.accessToken } }
        )
        .then((response) => {
          if (response.data === true) {

            navigate(`/albums/${params.PK}`)
          }
        })
    } else {
      navigate('/')
    }
  }})
  //모달
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
    // setSelectedImageIndex(null);
  };

  const handleGridItemClick = (key) => {
    setSelectedGridItem(key);
    // fileInputRef.current.click();
    setSelectedImage(null)
    setOpenModal(true)
    

  };
  const updateImage = (imageData) => {
    setImages((prevImages) => ({
      ...prevImages,
      [selectedGridItem]: imageData, // 선택된 그리드 아이템에 이미지 데이터 업데이트
    }));
    setOpenModal(false); // 모달 닫기
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && selectedGridItem) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => ({
          ...prevImages,
          [selectedGridItem]: reader.result // 이미지 데이터 직접 저장
        }));
        setSelectedImage(reader.result)
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

    const dataURLtoFile = (dataurl, filename) => {
      let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }

    const mergedImageDataURL = canvas.toDataURL("image/png");
    const blobBin = atob(mergedImageDataURL.split(",")[1])
    const array = []
    for (let i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i))
    }
    
    const file = dataURLtoFile(mergedImageDataURL, 'sample.png')
    setMergedImage(mergedImageDataURL);
    console.log(mergedImageDataURL)
    // 합쳐진 이미지를 백엔드로 전송하는 코드
    if (isReadyToSubmit) {
      try {
          const payload = {
              albumPk: params.PK,
              nickname,
              content: message,
          }
          console.log(payload)
          const formdata = new FormData()
          formdata.append('image', file)
          formdata.append('data', new Blob([JSON.stringify(payload)] , { type: 'application/json'}))

          axios.post('https://congraduation.me/backapi/memories', formdata, 
          {
            headers : {
              'accessToken' : sessionStorage.getItem('accessToken')
            },
          }).then (response => {
            console.log(response.data)
            navigate(`/albums/${params.PK}`)
          })
          .catch(error => {
            console.log(error)
          }) 

      } catch (error) {
          console.log('전송 중 실패', error)
      }
    }
  };
  
    
  return (
    <StyledMemoryPage>
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
     

      <TextField
        // id="outlined-multiline-flexible"
        className="input-field"
        // variant="filled"
        multiline
        rows={4} // 표시되는 기본 줄 수 
        type="text"
        label="메시지"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ marginBottom : "10px"}}
        inputProps={{
          minLength: 14,
          maxLength: 200,  // 한줄에 20자 들어감 
        }}
        
      />

      
        <TextField
          className="input-field"
          type="text"
          label="별명"
          // variant="filled"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          // style= {{ flex : 1}}
          style={{ marginBottom: "5%"}}
          // 글자수 제한
          inputProps={{
            maxLength: 15
          }}
        />

        <MemoryAdd1
          className="submit-button"
          onClick={handleSubmit}
          isClickable={isReadyToSubmit}
          style= {{ flex: 0}}

        >
        </MemoryAdd1 >
      
      <Dialog
        // style={{ height: '0%'}}
        open={openModal}
        onClose={handleCloseModal}
        fullWidth={true}
      >
        <DragPage selectedGridItem={selectedGridItem} setImages={setImages} setOpenModal={setOpenModal} />
      </Dialog>

    </StyledMemoryPage>
  );
};

export default MemoryUpload;
