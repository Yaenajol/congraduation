import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

import {
  Paper,
  Grid,
  Pagination,
  Container,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import StyledButton from "../styledComponents/StyledButton";
import StyledContainer from "../styledComponents/StyledContainer";
import StyledImg from "../styledComponents/StyledImg";
import StyledPaper from "../styledComponents/StyledPaper";
import StyledTypography from "../styledComponents/StyledTypography";
import UserImgButton from "../button/UserImgButton";
import userAltImage from "../images/userAltImage.png"; // 이미지 파일의 경로를 import 합니다.
import moment from "moment";
import MenuButton from "../../components/button/MenuButton";
import { isLoginAtom } from "../store/atom";
import { lookingPkAtom } from "../store/atom";
import { albumPageMainImgAtom } from "../store/atom";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import "../page/AlbumPage.css";
import DehazeRoundedIcon from "@mui/icons-material/DehazeRounded";

import AlbumProfileImage from "./AlbumProfileImage";
import Dday from "./Dday";

import "../page/AlbumPage.css";
import albumWhite from "../images/albumWhite.png";

const AlbumPage = () => {
  const params = useParams();

  const [album, setAlbum] = useState([]);
  const [albumMemories, setAlbumMemories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [nextPageImages, setNextPageImages] = useState([]); // 추가: 다음 페이지의 이미지들을 저장할 상태
  const BACK_URL = "http://congraduation.me/backapi";

  const [memoryarray, setMemoryarray] = useState([]);
  const itemsPerPage = 6;
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [lookingPk, setLookingPk] = useRecoilState(lookingPkAtom);
  const [albumPageMainImg, setAlbumPageMainImg] =
    useRecoilState(albumPageMainImgAtom);

  const date = moment(album.openAt);
  const [specificMemory, setSpecificMemory] = useState("");
  const [imageUrl, setImageUrl] = useState(userAltImage);
  const [albumOpenAt, setalbumOpenAt] = useState(null);
  console.log(lookingPk);
  useEffect(() => {
    console.log("=======================" + isLogin);
    setLookingPk(params.PK);
    console.log(params.PK);

    // 특정 앨범 조회
    axios
      .get(`https://congraduation.me/backapi/albums/${params.PK}`)
      .then((response) => {
        console.log("Album Data:", response.data);
        console.log(location.pathname);
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
    if (isLogin) {
      // 유저의 앨범 접근 권한 조회를 한다.
      axios
        .get(
          `https://congraduation.me/backapi/members/authority?albumPk=${params.PK}`,
          { headers: { accessToken: sessionStorage.accessToken } }
        )
        .then((response) => {
          console.log("check" + response.data);
          // 만약 접근한 유저의 권한이 true 이면

          if (typeof response.data === typeof true) {
            if (response.data === true) {
              navigate("/myalbum");
            }
          }
        });
    }
  }, []);

  // lookingpk 확인
  console.log("looking pk : " + lookingPk);

  // 페이지 전환 기능
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  //6개씩 보이게 적용
  const filteredAlbumMemories = albumMemories.filter(
    (val) => val.albumPk === params.PK
  ); // 메모리들의 albumPk 값이 url의 PK 값과 같은 것들을 담은 변수
  const startIndex = (currentPage - 1) * itemsPerPage; // 페이지의 첫 인덱스 (예를 들면 6개씩 1페이지이면 2페이지일 때는 6)
  const endIndex = startIndex + itemsPerPage; // 끝 인덱스
  const displayedAlbumMemories = filteredAlbumMemories.slice(
    startIndex,
    endIndex
  ); // 첫 인덱스와 끝 인덱스를 통해 슬라이스 작업

  // 비동기 처리 해야됨
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
      alert("앨범 주인만 볼 수 있어요!!");
    }
  };

  // 다이어리(모달)을 끄는 기능
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

  // 링크 주소 저장 기능
  const handlerCopyClipBoard = async (text) => {
    try {
      console.log(text);
      await navigator.clipboard.writeText(text);
      alert("링크가 복사됐습니다!");
      console.log(text);
    } catch (err) {
      console.log("error :", err);
    }
  };
  const gotomyAlbum = () => {
    sessionStorage.removeItem("lookingPk", params.PK);

    navigate("/");
  };
  // Setting page 로 이동하는 기능
  const gotoSetting = () => {
    navigate(`/albums/${params.PK}/setting`); // 이러면 안되는데 수정 필요할 듯
  };

  const gotoAddMemory = () => {
    console.log(isLogin);
    if (!isLogin) {
      console.log(isLoginAtom);
      console.log(params.PK);
      sessionStorage.setItem("lookingPk", params.PK);
      navigate("/");
    } else {
      navigate(`/albums/${params.PK}/edit`);
    }
  };
  
  const dday = new Date(album.openAt);
  const today = new Date();
  const timeGap = dday.getTime() - today.getTime();

  const remainDay = Math.ceil(timeGap / (1000 * 60 * 60 * 24));

  // 메모리 리스트 회전 각도 배열
  const rotateArray = [5, -15, -30, 5, -8, 12];

  // 유저 이미지 아이콘 버튼
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <StyledContainer>
        <div class="sortHeader">
          <div>
            <StyledTypography>
              {album.nickname} 의 {album.title}
            </StyledTypography>
            <StyledTypography>
              {albumOpenAt === null ? (
                <div>졸업일자를 설정해주세요.</div>
              ) : (
                <div style={{ color: "white", fontWeight: "bolder" }}>
                  D -{" "}
                  <span class="memorysize">
                    {remainDay === 0 ? <div>Congraduation!</div> : remainDay}
                  </span>
                </div>
              )}
            </StyledTypography>
            <StyledTypography style={{ color: "white" }}>
              <span class="memorysize">{memoryarray.length}장</span>의 메모리가
              도착했어요!
            </StyledTypography>
            <StyledTypography>{album.graduationPlace} 졸업</StyledTypography>
          </div>
          <div style={{ textAlign: "end", width: "30%" }}>
            <AlbumProfileImage
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              albumPk={params.PK}
              isClickable={false}
            />
            <MenuButton zin={true} />
          </div>
        </div>

        <div style={{ display: "flex", position: "relative" }}>
          <img
            src={albumWhite}
            alt="album"
            style={{
              width: "100%",
              // height: "auto"
            }}
          />
          <div class="memoryList">
            <Grid container spacing={2}>
              {albumMemories.slice(startIndex, endIndex).map((val, index) => (
                <Grid
                  item
                  xs={4}
                  key={index}
                  style={{ marginLeft: "5%", marginBottom: "3%" }}
                >
                  <StyledImg
                    style={{ transform: `rotate(${rotateArray[index]}deg)` }}
                    src={val.imageUrl}
                    alt={`Memory ${startIndex + index + 1}`}
                    onClick={() =>
                      handleImageClick(val.memoryPk, startIndex + index)
                    }
                  />
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

        <div class="alignCenter">
          <button class="button-2" onClick={() => gotoAddMemory()}>
            메모리 추가하기
          </button>
          <button class="button-2" onClick={() => gotomyAlbum()}>
            내 앨범으로 가기
          </button>
        </div>

        <Dialog open={openModal} onClose={handleCloseModal}>
          {/* <DialogTitle>이미지 상세보기</DialogTitle> */}
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
    </div>
  );
};

export default AlbumPage;
