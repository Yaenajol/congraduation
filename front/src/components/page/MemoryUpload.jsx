// react
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// css
import "./style.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import CropOriginal from "@mui/icons-material/CropOriginal";
import StyledMemoryPage from "../styledComponents/StyledMemoryPage";
import { Dialog, TextField } from "@mui/material";

// component
import CustomButton from "../button/CustomButton";
import DragPage from "../page/DragPage";

// external
import axios from "axios";

const MemoryUpload = () => {
  // 전역 상태 변수 목록

  // 상태 변수 목록
  const [images, setImages] = useState({ a: null, b: null, c: null, d: null });
  const [selectedGridItem, setSelectedGridItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mergedImage, setMergedImage] = useState(null);
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const fileInputRef = useRef(null);
  
  const params = useParams();
  const navigate = useNavigate();
   
  const isReadyToSubmit = Object.values(images).every((img) => img !== null) && nickname && message;

  useEffect(() => {
    if (sessionStorage.accessToken) {
      if (params.PK) {
        axios
          .get(
            `https://congraduation.me/backapi/members/authority?albumPk=${params.PK}`,
            { headers: { accessToken: sessionStorage.accessToken } }
          )
          .then((response) => {
            if (response.data === true) {
              navigate(`/albums/${params.PK}`);
            }
          });
      } else {
        navigate("/");
      }
    }
  });

  /**
   * 모달 끄기
   */
  const handleCloseModal = () => {
    setOpenModal(false);
    // setSelectedImageIndex(null);
  };

  /**
   * 그리드 클릭 시 모달 띄우기
   * @param {*} key 그리드의 인덱스 값
   */
  const handleGridItemClick = (key) => {
    setSelectedGridItem(key);
    // fileInputRef.current.click();
    setSelectedImage(null);
    setOpenModal(true);
  };

  /**
   * 그리드 내에 이미지를 업로드 합니다.
   * @param {*} e 이벤트
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && selectedGridItem) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => ({
          ...prevImages,
          [selectedGridItem]: reader.result, // 이미지 데이터 직접 저장
        }));
        setSelectedImage(reader.result);
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

  /**
   * 4개의 사진, 닉네임, 제목을 넣으면 데이터를 취합해 백엔드에 제출합니다
   */
  const handleSubmit = async () => {
    if (!isReadyToSubmit) {
      alert("모든 사진과 내용들을 입력해주세요!");
    }
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
    };

    const mergedImageDataURL = canvas.toDataURL("image/png");
    const blobBin = atob(mergedImageDataURL.split(",")[1]);
    const array = [];
    for (let i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }

    const file = dataURLtoFile(mergedImageDataURL, "sample.png");
    setMergedImage(mergedImageDataURL);
    console.log(mergedImageDataURL);
    console.log(mergedImage);
    const blob = await (await fetch(mergedImageDataURL)).blob();
    const imageSize1 = blob.size;

    // 합쳐진 이미지를 백엔드로 전송하는 코드
    if (isReadyToSubmit) {
      try {
        const payload = {
          albumPk: params.PK,
          nickname,
          content: message,
        };
        console.log(payload);
        const formdata = new FormData();
        formdata.append("image", file);
        formdata.append(
          "data",
          new Blob([JSON.stringify(payload)], { type: "application/json" })
        );

        axios
          .post("https://congraduation.me/backapi/memories", formdata, {
            headers: {
              accessToken: sessionStorage.getItem("accessToken"),
            },
          })
          .then((response) => {
            console.log(response.data);
            navigate(`/albums/${params.PK}`);
            console.log(imageSize1);
            console.log(canvasHeight);
            console.log(canvasWidth);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log("전송 중 실패", error);
      }
    }
  };

  return (
    <StyledMemoryPage>
      <div className="title">Memory</div>

      {/* 그리드 */}
      <div className="image-grid">
        {["a", "b", "c", "d"].map((key) => (
          <div
            className="image-upload"
            key={key}
            onClick={() => handleGridItemClick(key)}
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
        style={{ marginBottom: "10px" }}
        inputProps={{
          minLength: 14,
          maxLength: 200, // 한줄에 20자 들어감
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
        style={{ marginBottom: "5%" }}
        // 글자수 제한
        inputProps={{
          maxLength: 15,
        }}
      />
      <CustomButton
        clickCallback={handleSubmit}
        buttonName={"업로드"}
      ></CustomButton>

      <Dialog
        // style={{ height: '0%'}}
        open={openModal}
        onClose={handleCloseModal}
        fullWidth={true}
      >
        <DragPage
          selectedGridItem={selectedGridItem}
          setImages={setImages}
          setOpenModal={setOpenModal}
        />
      </Dialog>
    </StyledMemoryPage>
  );
};

export default MemoryUpload;
