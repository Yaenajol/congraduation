import React, { useState, useEffect, useRef } from "react";
import StyledImg from "../styledComponents/StyledImg";
import axios from "axios";
import UploadLoading from "./UploadLoading";
import DragPage from "../page/DragPage";
import {Dialog} from "@mui/material";
import {ReactCrop, centerCrop, makeAspectCrop, convertToPixelCrop} from 'react-image-crop';

function AlbumProfileImage({ imageUrl, setImageUrl, albumPk , isClickable}) {
  
  const [loading, setLoading] = useState(false);
  const fileInput = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  // const [customcallback, setCustomcallback] = useState()

  
  

  const handleCloseModal = async () => {
    setImgSrc()
    setOpenModal(false);
    // await axios
    //     .put(
    //       `https://congraduation.me/backapi/albums/${albumPk}/coverImage`,
    //       formdata,
    //       {
    //         headers: {
    //           accessToken: localStorage.getItem("accessToken"),
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       setImageUrl(response.data);
    //       setLoading(false);
    //     });
    
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
      // setLoading(true);
      // setOpenModal(true)
    }
  }
  
  // function onSelectFile(e) {
  //   if (e.target.files && e.target.files.length > 0) {
      
  //     const reader = new FileReader()
  //     reader.addEventListener('load', () =>
  //       setImgSrc(reader.result?.toString() || ''),
  //     )
  //     reader.readAsDataURL(e.target.files[0])
  //   }
  // }

    //   await axios
    //     .put(
    //       `https://congraduation.me/backapi/albums/${albumPk}/coverImage`,
    //       formdata,
    //       {
    //         headers: {
    //           accessToken: localStorage.getItem("accessToken"),
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       setImageUrl(response.data);
    //       setLoading(false);
    //     });
    // }
    
  
  return (
    <div>
      {loading ? (
        <UploadLoading />
      ) : (
        <StyledImg
          src={imageUrl}
          alt="User Alt Image"
          width={"130rem"}
          // height={"70rem"}
          style={{borderRadius:"50%", marginTop:"40%"}}
          onClick={() => {
            handelopenmodal()
            // onChange()
            // fileInput.current.click();
          }}
        />
      )}
      {/* <input
        type="file"
        style={{ display: "none" }}
        accept="image/jpg,image/png,image/jpeg"
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      /> */}
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
