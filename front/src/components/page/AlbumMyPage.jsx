import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./albumSlide.css";
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

import StyledContainer from "../styledComponents/StyledContainer";
import StyledImg from "../styledComponents/StyledImg";

import StyledTypography from "../styledComponents/StyledTypography";

import userAltImage from "../images/userAltImage.png"; // 이미지 파일의 경로를 import 합니다.
import moment from "moment";
import MenuButton from "../../components/button/MenuButton";
import { isLoginAtom } from "../store/atom";
import { lookingPkAtom } from "../store/atom";
import { albumPageMainImgAtom } from "../store/atom";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";

import AlbumProfileImage from "./AlbumProfileImage";

import "../page/AlbumPage.css";
import albumWhite from "../images/albumWhite.png";

const AlbumMypage = () => {
  const params = useParams();

  const [album, setAlbum] = useState([]);
  const [albumMemories, setAlbumMemories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [nextPageImages, setNextPageImages] = useState([]); // 추가: 다음 페이지의 이미지들을 저장할 상태
  const BACK_URL = "http://congraduation.me/backapi";
  const [isauthorized, setIsauthorized] = useState(false);
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
  const [albumOpenAt, setalbumOpenAt] = useState(undefined);

  useEffect(() => {
    if (!isLogin) {
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

  const remainDay = Math.ceil(timeGap / (1000 * 60 * 60 * 24));

  const startIndex = (currentPage - 1) * itemsPerPage; // 페이지의 첫 인덱스 (예를 들면 6개씩 1페이지이면 2페이지일 때는 6)
  const endIndex = startIndex + itemsPerPage; // 끝 인덱스

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

  const getFlipList = () => {
    const page = parseInt(Math.ceil(albumMemories.length / 6));
    const pageList = Array.from({ length: page }, () => []);
    console.log("page " + page);
    for (let index = 0; index < albumMemories.length; index++) {
      pageList[parseInt(index / 6)].push(albumMemories[index]);
    }
    let flipList = Array.from({ length: page }, () => []);
    for (let index = 0; index < page; index++) {
      flipList[index].push(
        <div className="flip" id={`p${index + 1}`} key={index + 1}>
          <div className="back">
            <label for={`c${index + 1}`} className="back-btn">
              Before
            </label>
          </div>
          <div className="front">
            {pageList[index].map((memory, mapIndex) => {
              console.log("console : " + (index * 6 + mapIndex));
              return (
                <StyledImg
                  style={{
                    backgroundColor: "white",
                    padding: "1px",
                    width: "80px",
                    height: "80px",
                  }}
                  src={memory.imageUrl}
                  onClick={() =>
                    handleImageClick(memory.memoryPk, index * 6 + mapIndex)
                  }
                />
              );
            })}
            <label for={`c${index + 1}`} className="next-btn">
              NEXT
            </label>
          </div>
        </div>
      );
    }
    console.log(pageList);
    return (
      <div className="book">
        <div className="wrapper">
          {[...Array(parseInt(page))].map((n, index) => {
            return (
              <input
                className="pageInput"
                type="checkbox"
                id={`c${index + 1}`}
              />
            );
          })}
          <div className="flip-book">{flipList}</div>
        </div>
      </div>
    );
  };

  // 메모리 리스트 회전 각도 배열
  const rotateArray = [5, -15, -30, 5, -8, 12];

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
              )}{" "}
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
              albumPk={album.albumPk}
              isClickable={true}
            />
            <MenuButton zin={false} />
          </div>
        </div>
        {getFlipList()}

        <div class="alignCenter">
          <button
            class="button"
            onClick={() => handlerCopyClipBoard(album.albumPk)}
          >
            공유하러 가기
          </button>
        </div>

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
                  <h2> {specificMemory.content}ㅋㅋㅋㅋㅋ</h2>
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
