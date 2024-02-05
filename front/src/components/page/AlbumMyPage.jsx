// react
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FunnyDog from "../button/FunnyDog";

// recoil
import { useRecoilState } from "recoil";
import { albumPageMainImgAtom } from "../store/atom";

// css
import { Grid, Pagination, Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import StyledContainer from "../styledComponents/StyledContainer";
import StyledImg from "../styledComponents/StyledImg";
import StyledTypography from "../styledComponents/StyledTypography";
import "../page/AlbumPage.css";
import "../page/Snowrain.css";

// component
import CustomButton from "../button/CustomButton";
import MenuButton from "../../components/button/MenuButton";
import "../page/Snowrain.css"

// image
import userAltImage from "../images/userAltImage.png";
import albumFrame from "../images/albumFrame.png";
import AlbumProfileImage from "./AlbumProfileImage";

// external
import axios from "axios";
import moment from "moment";


const AlbumMypage = () => {

  // 전역 상태 변수 목록
  const [albumPageMainImg, setAlbumPageMainImg] =useRecoilState(albumPageMainImgAtom);

  
  // 상태 변수 목록
  const [album, setAlbum] = useState([]);
  const [albumMemories, setAlbumMemories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [memoryarray, setMemoryarray] = useState([]);
  const [specificMemory, setSpecificMemory] = useState("");
  const [imageUrl, setImageUrl] = useState(userAltImage);
  const [albumOpenAt, setalbumOpenAt] = useState(undefined);
  const [specNickname, setSpecNickname] = useState("");
  const [specContent, setSpecContent] = useState("");
  const [snowflakes, setSnowflakes] = useState([]);
  const [modalimage, setModalimage] = useState("");

  // 날짜 설정 변수 목록
  const openDate = moment(album.openAt);
  const dday = new Date(album.openAt);
  const today = new Date();
  const timeGap = dday.getTime() - today.getTime();
  const remainDay = Math.ceil(timeGap / (1000 * 60 * 60 * 24));
  
  // 페이지네이션 변수 목록
  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage; // 페이지의 첫 인덱스 (예를 들면 4개씩 1페이지이면 2페이지일 때는 4)
  const endIndex = startIndex + itemsPerPage; // 끝 인덱스
  
  const navigate = useNavigate();

  useEffect(() => {
    
    // 벚꽃
    const snowCount = 100;
    const newSnowflakes = [];

    for (let i = 0; i < snowCount; i++) {
      const randomXStart = Math.random() * window.innerWidth;
      const randomXEnd = Math.random() * window.innerWidth;
      const randomScale = Math.random() * 0.1;
      const fallDuration = randomRange(10, 30) + "s";
      const fallDelay = randomRange(-30, 0) + "s";
      
      newSnowflakes.push({
        id: i,
        style: {
          opacity: Math.random(),
          transform: `translate(${randomXStart}px, -10px) scale(${randomScale})`,
          animation: `fall ${fallDuration} ${fallDelay} linear infinite`,
          position: 'absolute',
          width: '15px',
          height: '15px',
          background: 'pink',
          borderRadius: '50%',
          left: `${randomXStart}px`,
        }
      });
    }
    setSnowflakes(newSnowflakes);

    if (!sessionStorage.accessToken) {  // accessToken 없으면 로그인 페이지로
      navigate("/");
      return;
    }
    
    // accessToken 이 있을 때 현재 로그인 된 유저의 정보를 조회
    axios
      .get(`https://congraduation.me/backapi/members/myAlbum`, {
        headers: { accessToken: sessionStorage.accessToken },
      })
      .then((response) => {
        setAlbum(response.data);
        setImageUrl(response.data.coverUrl);
        setalbumOpenAt(response.data.openAt);

        // 공개일자가 정해지지 않았으면 앨범 정보와 함께 설정 페이지로 이동
        if (response.data.openAt === null) {
          console.log(response.data);
          navigate("/myalbum/setting", { state: response.data });
        }
        setAlbumPageMainImg(response.data.coverUrl);
        return response.data.albumPk;
      })
      .then((albumPk) => {
        
        // 특정 앨범의 메모리 리스트 조회
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

  function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleImageClick = (imageUrl, index) => {
    
    const now = moment();
    setSelectedImageIndex(index);

    if (now >= openDate) {
      
      // 특정 메모리를 조회해서 구체적인 이미지를 보여준다.
      axios
        .get(
          `https://congraduation.me/backapi/memories/${albumMemories[index].memoryPk}`,
          {
            headers: { accessToken: sessionStorage.accessToken },
          }
        )
        .then((response) => {
          setSpecificMemory(response.data);
          setSpecNickname(response.data.nickname);
          setModalimage(response.data.imageUrl)
          setSpecContent(response.data.content);
          console.log("spec Nickname : " + specificMemory.nickname);
          console.log("spec Content : " + specificMemory.content);
        });

      setOpenModal(true);

    // 공개일 아닐 때
    } else {
      alert("공개일 아님");
    }
  };

  /**
   * 현재 페이지를 표시합니다
   * @param {*} event 
   * @param {*} value 현재 페이지 
   */
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  /**
   * 앨범 기본키 값을 받아서 링크를 복사, 저장합니다
   * @param {*} albumPk 앨범 기본키
   */
  const handlerCopyClipBoard = async (albumPk) => {
    try {
      console.log(albumPk);
      const domain = window.location.origin;
      const address = `${domain}/albums/${albumPk}`;
      await navigator.clipboard.writeText(address);
      alert("링크가 복사됐습니다!");
      console.log(albumPk);
    } catch (err) {
      console.log("error :", err);
    }
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
        axios
        .get(
          `https://congraduation.me/backapi/memories/${albumMemories[nextIndex].memoryPk}`,
          {
            headers: { accessToken: sessionStorage.accessToken },
          }
        )
        .then((response) => {
          setModalimage(response.data.imageUrl);
          setSpecificMemory(response.data);
          setSpecNickname(response.data.nickname);
          setSpecContent(response.data.content);
        });
        
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
        axios
        .get(
          `https://congraduation.me/backapi/memories/${albumMemories[prevIndex - 1].memoryPk}`,
          {
            headers: { accessToken: sessionStorage.accessToken },
          }
        )
        .then((response) => {
          setModalimage(response.data.imageUrl);
          setSpecificMemory(response.data);
          setSpecNickname(response.data.nickname);
          setSpecContent(response.data.content);
        });

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
        
        {/* 내 정보 */}
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

        {/* 공유 버튼 */}
        <CustomButton
          clickCallback={() => handlerCopyClipBoard(album.albumPk)}
          buttonName={"공유하러가기"}
        ></CustomButton>

        {/* 모달 */}
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogContent style={{ overflowY: "auto" }}>
            {selectedImageIndex !== null && (
              <div>
                <StyledImg
                  src={modalimage}
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
                  <p className="nickname">From. {specNickname}</p>
                  <p className="box52">{specContent} </p>
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

      <FunnyDog></FunnyDog>
    </div>
  );
};

export default AlbumMypage;