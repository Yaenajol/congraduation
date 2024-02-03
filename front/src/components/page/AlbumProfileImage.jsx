import React, { useState, useEffect, useRef } from "react";
import StyledImg from "../styledComponents/StyledImg";
import axios from "axios";
import UploadLoading from "./UploadLoading";
import DragPage from "../page/DragPage";
import {Dialog} from "@mui/material";
import {ReactCrop, centerCrop, makeAspectCrop, convertToPixelCrop} from 'react-image-crop';
import userAltImage from '../images/userAltImage.png'

function AlbumProfileImage({ imageUrl, setImageUrl, albumPk , isClickable}) {
  
  const [loading, setLoading] = useState(false);
  const fileInput = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [imgSrc, setImgSrc] = useState('');


  const handleCloseModal = async () => {
    setImgSrc()
    setOpenModal(false);
  };

  const handelopenmodal = () => {
    if (isClickable) {
      setOpenModal(true)
    }
  }
  
  const onChange = async (e) => {
    if (e.target.files[0]) {
      let formdata = new FormData();
      formdata.append("image", e.target.files[0]);
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }
  
  
  
  return (
    <div>
      {loading ? (
        <UploadLoading />
      ) : (
        <StyledImg
          src={imageUrl || userAltImage}
          alt="userAltImage"
          width={"100%"}
          // height={"70rem"}
          style={{borderRadius:"50%"}}
          onClick={() => {
            handelopenmodal()
          }}
        />
      )}

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
