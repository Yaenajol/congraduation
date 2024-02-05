// react
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// recoil
import { useRecoilState } from "recoil";
import { lookingPkAtom, albumPageMainImgAtom } from "../store/atom";

import FunnyDog from "../button/FunnyDog";
// css
import "../page/AlbumPage.css";
import {
  Grid,
  Pagination,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import StyledContainer from "../styledComponents/StyledContainer";
import StyledImg from "../styledComponents/StyledImg";
import StyledTypography from "../styledComponents/StyledTypography";
import "../page/Snowrain.css";

// component
import CustomButton from "../button/CustomButton";
import MenuButton from "../../components/button/MenuButton";

// image
import userAltImage from "../images/userAltImage.png"; // 이미지 파일의 경로를 import 합니다.
import AlbumProfileImage from "./AlbumProfileImage";
import albumFrame from "../images/albumFrame.png";

// external
import axios from "axios";
import moment from "moment";

const AlbumPage = () => {
  // 전역 상태 변수 목록
  const [albumPageMainImg, setAlbumPageMainImg] =
    useRecoilState(albumPageMainImgAtom);
  const [lookingPk, setLookingPk] = useRecoilState(lookingPkAtom);

  // 상태 변수 목록
  const [album, setAlbum] = useState([]);
  const [albumMemories, setAlbumMemories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [memoryarray, setMemoryarray] = useState([]);
  const [imageUrl, setImageUrl] = useState(userAltImage);
  const [albumOpenAt, setalbumOpenAt] = useState(null);

  // 날짜 설정 변수 목록
  const dday = new Date(album.openAt);
  const today = new Date();
  const timeGap = dday.getTime() - today.getTime();
  const remainDay = Math.ceil(timeGap / (1000 * 60 * 60 * 24));
  // const openDate = moment(album.openAt);

  // 페이지네이션 변수 목록
  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage; // 페이지의 첫 인덱스 (예를 들면 6개씩 1페이지이면 2페이지일 때는 6)
  const endIndex = startIndex + itemsPerPage; // 끝 인덱스

  const params = useParams();
  const navigate = useNavigate();

  // BE url
  const BACK_URL = "http://congraduation.me/backapi";

  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    setLookingPk(params.PK);

    const snowCount = 100;
    const newSnowflakes = [];

    for (let i = 0; i < snowCount; i++) {
      const randomXStart = Math.random() * window.innerWidth;
      const randomScale = Math.random() * 0.1;
      const fallDuration = randomRange(10, 30) + "s";
      const fallDelay = randomRange(-30, 0) + "s";

      newSnowflakes.push({
        id: i,
        style: {
          opacity: Math.random(),
          transform: `translate(${randomXStart}px, -10px) scale(${randomScale})`,
          animation: `fall ${fallDuration} ${fallDelay} linear infinite`,
          position: "absolute",
          width: "15px",
          height: "15px",
          background: "pink",
          borderRadius: "50%",
          left: `${randomXStart}px`,
        },
      });
    }
    setSnowflakes(newSnowflakes);

    // 특정 앨범 조회
    axios
      .get(`https://congraduation.me/backapi/albums/${params.PK}`)
      .then((response) => {
        setAlbum(response.data);
        setImageUrl(response.data.coverUrl);
        setalbumOpenAt(response.data.openAt);
        setAlbumPageMainImg(response.data.coverUrl);
      });

    // 앨범의 특정 메모리 조회
    axios
      .get(`https://congraduation.me/backapi/albums/${params.PK}/memories`)
      .then((response) => {
        console.log("Album Memories Data:", response.data);
        setAlbumMemories(response.data);
        if (typeof response.data === typeof []) {
          setMemoryarray(response.data);
        }
      });

    // accessToken 이 있을 때
    if (sessionStorage.accessToken) {
      // 유저의 앨범 접근 권한 조회
      axios
        .get(
          `https://congraduation.me/backapi/members/authority?albumPk=${params.PK}`,
          { headers: { accessToken: sessionStorage.accessToken } }
        )
        .then((response) => {
          console.log("check" + response.data);

          // 만약 접근한 유저의 권한이 true 이면 내 앨범 페이지로 이동
          if (typeof response.data === typeof true) {
            if (response.data === true) {
              navigate("/myalbum");
            }
          }
        });
    }
  }, []);

  /**
   * 현재 페이지를 표시합니다
   * @param {*} event
   * @param {*} value 현재 페이지
   */
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** 이미지 클릭 시 alert 창 */
  const handleImageClick = () => {
    alert("앨범 주인만 볼 수 있어요!!");
  };

  /**
   * 모달 끄기
   */
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImageIndex(null);
  };

  /**
   * 모달 내에서 다음 이미지를 보여줍니다
   */
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;

      // 전체 길이보다 작을 때에만 다음 이미지로 바꿔줌
      if (nextIndex < memoryarray.length) {
        return nextIndex;
      }
      return prevIndex; // 그 외의 경우에는 이전 인덱스를 반환
    });
  };

  /**
   * 모달 내에서 이전 이미지를 보여줍니다
   */
  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => {
      // 인덱스 값이 0 이상일 때
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex; // 이미지 인덱스가 0보다 작을 때는 현재 인덱스를 반환
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {snowflakes.map((flake) => (
        <div key={flake.id} className="snow" style={flake.style} />
      ))}
      <StyledContainer>
        {/* 졸업자 정보 */}
        <div class="sortHeader">
          <div>
            <StyledTypography>
              {album.nickname} 의 {album.title}
            </StyledTypography>
            <StyledTypography>
              <span class="strongLetter">{memoryarray.length}장</span>의
              메모리가 도착했어요
            </StyledTypography>
            <StyledTypography>
              {albumOpenAt === null ? (
                <div>졸업일자를 설정해주세요.</div>
              ) : (
                <div class="strongLetter">
                  D -{" "}
                  <span>
                    {remainDay <= 0 ? (
                      <span style={{ fontFamily: "KyoboHand" }}>
                        {" "}
                        day Congraduation!
                      </span>
                    ) : (
                      remainDay
                    )}
                  </span>
                </div>
              )}
            </StyledTypography>
          </div>
          <div style={{ textAlign: "end", width: "25%" }}>
            <AlbumProfileImage
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              albumPk={params.PK}
              isClickable={false}
            />
          </div>
        </div>

        <div class="alignCenter">
          {/* 메모리 작성 버튼 */}
          <CustomButton
            clickCallback={() => {
              if (!sessionStorage.accessToken) {
                sessionStorage.setItem("lookingPk", params.PK);
                navigate("/");
              } else {
                navigate(`/albums/${params.PK}/edit`);
              }
            }}
            marginTop={"25px"}
            marginBottom={"0px"}
            buttonName={"메모리 작성"}
            customWidth={"40%"}
          ></CustomButton>

          {/* 내 앨범 버튼 */}
          <CustomButton
            marginTop={"25px"}
            marginBottom={"0px"}
            clickCallback={() => {
              sessionStorage.removeItem("lookingPk", params.PK);
              navigate("/");
            }}
            buttonName={"내 앨범으로 "}
            customWidth={"40%"}
          ></CustomButton>
        </div>

        <div
          style={{
            display: "flex",
            position: "relative",
            width: "100%",
            zIndex: "0",
          }}
        >
          <img
            src={albumFrame}
            alt="album"
            style={{
              width: "100%",
            }}
          />

          {/* 메모리 리스트 */}
          <div class="memoryList">
            <Grid container spacing={2}>
              {albumMemories.slice(startIndex, endIndex).map((val, index) => (
                <Grid item xs={5} key={index} style={{ marginLeft: "5%" }}>
                  <div
                    style={{
                      backgroundColor: "#ffe2e9",
                      padding: "8% 8% 8% 8%",
                      border: "1px solid darkgrey",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      fontSize: "30px",
                      width: "100%",
                    }}
                  >
                    <StyledImg
                      src={val.imageUrl}
                      alt={`Memory ${startIndex + index + 1}`}
                      style={{
                        position: "relative",
                      }}
                      onClick={() =>
                        handleImageClick(val.memoryPk, startIndex + index)
                      }
                    />
                    <div
                      style={{
                        overflow: "hidden",
                        fontSize: "2.5vh",
                        width: "100%",
                        marginTop: "5%",
                        textAlign: "center",
                        fontFamily: "KyoboHand",
                      }}
                    >
                      {val.nickName}
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>

        {/* 페이지네이션 */}
        <div class="alignCenter">
          <Pagination
            count={Math.ceil(memoryarray.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>

        {/* 모달 */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogContent>
            {selectedImageIndex !== null && (
              <StyledImg
                src={memoryarray[selectedImageIndex]?.imageUrl}
                alt={`Memory ${selectedImageIndex + 1}`}
                style={{ maxWidth: "100%" }}
              />
            )}
            <p>{memoryarray[selectedImageIndex]?.nickname}</p>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handlePrevImage}
              disabled={selectedImageIndex === 0}
              color="primary"
            >
              이전
            </Button>
            <Button onClick={handleCloseModal} color="primary">
              닫기
            </Button>
            <Button
              onClick={handleNextImage}
              disabled={selectedImageIndex === memoryarray.length - 1}
              color="primary"
            >
              다음
            </Button>
          </DialogActions>
        </Dialog>
      </StyledContainer>
      <FunnyDog></FunnyDog>
    </div>
  );
};

export default AlbumPage;
