import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Paper,
  Grid,
  Pagination,
  TextField,
  Container,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import StyledContainer from "../styledComponents/StyledContainer";
import StyledImg from "../styledComponents/StyledImg";

import StyledTypography from "../styledComponents/StyledTypography";

import userAltImage from "../images/userAltImage.png"; // 이미지 파일의 경로를 import 합니다.
import moment from "moment";
import MenuButton from "../../components/button/MenuButton";
import { albumPageMainImgAtom } from "../store/atom";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";

import AlbumProfileImage from "./AlbumProfileImage";

import "../page/AlbumPage.css";
import albumFrame from "../images/albumFrame.png";
import { fontSize } from "@mui/system";
import CustomButton from "../button/CustomButton";

const AlbumMypage = () => {
  const params = useParams();

  const [album, setAlbum] = useState([]);
  const [albumMemories, setAlbumMemories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [memoryarray, setMemoryarray] = useState([]);
  const itemsPerPage = 4;
  const navigate = useNavigate();
  const location = useLocation();
  const [albumPageMainImg, setAlbumPageMainImg] =
    useRecoilState(albumPageMainImgAtom);

  const date = moment(album.openAt);
  const [specificMemory, setSpecificMemory] = useState("");
  const [imageUrl, setImageUrl] = useState(userAltImage);
  const [albumOpenAt, setalbumOpenAt] = useState(undefined);
  console.log(albumMemories);
  useEffect(() => {
    if (!sessionStorage.accessToken) {
      navigate("/");
      return;
    }
    axios
      .get(`https://congraduation.me/backapi/members/myAlbum`, {
        headers: { accessToken: sessionStorage.accessToken },
      })
      .then((response) => {
        console.log("Album Data:", response.data);

        setAlbum(response.data);
        setImageUrl(response.data.coverUrl);
        setalbumOpenAt(response.data.openAt);
        if (response.data.openAt === null) {
          console.log(response.data);
          navigate("/myalbum/setting", { state: response.data });
        }
        setAlbumPageMainImg(response.data.coverUrl);
        return response.data.albumPk;
      })
      .then((albumPk) => {
        axios
          .get(`https://congraduation.me/backapi/albums/${albumPk}/memories`)
          .then((response) => {
            setAlbumMemories(response.data);
            if (typeof response.data === typeof []) {
              setMemoryarray(response.data);
            }
          });
      });
  }, []);

  const dday = new Date(album.openAt);
  const today = new Date();
  const timeGap = dday.getTime() - today.getTime();
  console.log("album.openAt : " + album.openAt);
  console.log("dday : " + dday);
  console.log("today : " + today);
  const remainDay = Math.ceil(timeGap / (1000 * 60 * 60 * 24));

  const filteredAlbumMemories = albumMemories.filter(
    (val) => val.albumPk === params.PK
  ); // 메모리들의 albumPk 값이 url의 PK 값과 같은 것들을 담은 변수
  const startIndex = (currentPage - 1) * itemsPerPage; // 페이지의 첫 인덱스 (예를 들면 6개씩 1페이지이면 2페이지일 때는 6)
  const endIndex = startIndex + itemsPerPage; // 끝 인덱스
  const displayedAlbumMemories = filteredAlbumMemories.slice(
    startIndex,
    endIndex
  );

  const handleImageClick = (imageUrl, index) => {
    const now = moment();
    setSelectedImageIndex(index);
    console.log(now);
    console.log(date);
    console.log(albumMemories[index].memoryPk);
    if (now >= date) {
      axios
        .get(
          `https://congraduation.me/backapi/memories/${albumMemories[index].memoryPk}`,
          {
            headers: { accessToken: sessionStorage.accessToken },
          }
        )
        .then((response) => {
          console.log(response.data);
          setSpecificMemory(response.data);
          // console.log(response.data)
        });

      setOpenModal(true); // 모달 opne 상태 true로
    } else {
      alert("공개일 아님");
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handlerCopyClipBoard = async (text) => {
    try {
      console.log(text);
      const domain = window.location.origin;
      const address = `${domain}/albums/${text}`;
      await navigator.clipboard.writeText(address);
      alert("링크가 복사됐습니다!");
      console.log(text);
    } catch (err) {
      console.log("error :", err);
    }
  };
  const handleCloseModal = () => {
    setOpenModal(false); // 모달 open 상태 false로
    setSelectedImageIndex(null); // 선택된 이미지 인덱스를 null로 상태 변경
  };

  // 다이어리(모달) 내에서 다음 이미지를 보여주는 함수
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < memoryarray.length) {
        // 전체 길이보다 작을 때에만 다음 이미지로 바꿔줌
        return nextIndex;
      }
      return prevIndex; // 그 외의 경우에는 이전 인덱스를 반환
    });
  };

  // 다이어리(모달) 내에서 이전 이미지를 보여주는 함수
  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex; // 이미지 인덱스가 0보다 작을 때는 현재 인덱스를 반환
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <StyledContainer>
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
                    {remainDay === 0 ? (
                      <span style={{fontFamily:"KyoboHand"}}> day Congraduation!</span>
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
              albumPk={album.albumPk}
              isClickable={true}
            />
            <MenuButton zin={false} />
          </div>
        </div>
        <div style={{ position: "relative", width:"100%", zIndex:"0"}}>
          <img
            src={albumFrame}
            alt="album"
            style={{
              width: "100%",
            }}
          />
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

        <div class="alignCenter">
          <Pagination
            count={Math.ceil(memoryarray.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>

        <CustomButton
          clickCallback={() => handlerCopyClipBoard(album.albumPk)}
          buttonName={"공유하러가기"}
        ></CustomButton>

        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogContent style={{ overflowY: "auto" }}>
            {selectedImageIndex !== null && (
              <div>
                <StyledImg
                  src={memoryarray[selectedImageIndex]?.imageUrl}
                  alt={`Memory ${selectedImageIndex + 1}`}
                  style={{ maxWidth: "100%" }}
                />
                <div
                  style={{
                    maxHeight: "30vh",
                    overflowY: "auto",
                    wordBreak: "break-word",
                  }}
                >
                  {" "}
                  {/* wordWrap: 'break-word' 일 경우 단어가 끊김  */}
                  <p>{specificMemory.nickname}</p>
                  <h2> {specificMemory.content}</h2>
                </div>
              </div>
            )}
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
    </div>
  );
};

export default AlbumMypage;
