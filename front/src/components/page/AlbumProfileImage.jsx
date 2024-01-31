import React, { useState, useEffect, useRef } from "react";
import StyledImg from "../styledComponents/StyledImg";
import axios from "axios";
import UploadLoading from "./UploadLoading";

function AlbumProfileImage({ imageUrl, setImageUrl, albumPk }) {
  const [loading, setLoading] = useState(false);
  const fileInput = useRef(null);

  const onChange = async (e) => {
    if (e.target.files[0]) {
      let formdata = new FormData();
      formdata.append("image", e.target.files[0]);
      setLoading(true);

      await axios
        .put(
          `https://congraduation.me/backapi/albums/${albumPk}/coverImage`,
          formdata,
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          setImageUrl(response.data);
          setLoading(false);
        });
    }
  };

  return (
    <div>
      {loading ? (
        <UploadLoading />
      ) : (
        <StyledImg
          src={imageUrl}
          alt="User Alt Image"
          width={"100px"}
          height={"100px"}
          onClick={() => {
            fileInput.current.click();
          }}
        />
      )}
      <input
        type="file"
        style={{ display: "none" }}
        accept="image/jpg,impge/png,image/jpeg"
        name="profile_img"
        onChange={onChange}
        ref={fileInput}
      />
    </div>
  );
}

export default AlbumProfileImage;
