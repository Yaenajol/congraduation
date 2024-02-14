// react
import React, { useState } from "react";

// css
import StyledImg from "../styledComponents/StyledImg";
import {Dialog} from "@mui/material";

// component
import UploadLoading from "./UploadLoading";
import DragPage from "../page/DragPage";

// image
import userAltImage from '../images/userAltImage.png'


/**
 * 앨범 프로필 사진을 변경합니다
 * @param {*} imageUrl 기존 이미지
 * @param {*} setImageUrl 바꿀 이미지
 * @param {*} albumPk 앨범 기본키
 * @param {*} isClickable 클릭 여부
 * @returns 
 */
function AlbumProfileImage({ imageUrl, setImageUrl, albumPk , isClickable}) {
  
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [imgSrc, setImgSrc] = useState('');


  /**
   * 모달 끄기
   */
  const handleCloseModal = async () => {
    setImgSrc()
    setOpenModal(false);
  };

  /**
   * 모달 키기
   */
  const handelopenmodal = () => {
    if (isClickable) {
      setOpenModal(true)
    }
  }
  
  return (
    <div style={{position:"relative", zIndex:"1" }}>
      {/* 로딩 중이면 스피너 보여주고 아닌 떄에는 프로필 이미지 */}
      {loading ? (
        <UploadLoading />
      ) : (
        <StyledImg
          src={imageUrl || userAltImage}
          alt="userAltImage"
          width={"100%"}
          // height={"70rem"}
          style={{borderRadius:"50%" }}
          onClick={() => {
            handelopenmodal()
          }}
          
        />
      )}

      {/* 모달을 통해 이미지를 변경 */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth={true}
      >
        <DragPage albumPk={albumPk} setImages={setImageUrl} setOpenModal={setOpenModal} />
      </Dialog>
    </div>
  );
}

export default AlbumProfileImage;
