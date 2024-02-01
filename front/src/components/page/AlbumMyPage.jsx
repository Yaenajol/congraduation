import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Paper, Grid, Pagination, Container, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import StyledButton from '../styledComponents/StyledButton';
import StyledContainer from '../styledComponents/StyledContainer';
import StyledImg from '../styledComponents/StyledImg';
import StyledPaper from '../styledComponents/StyledPaper';
import StyledTypography from '../styledComponents/StyledTypography';
import UserImgButton from '../button/UserImgButton';
import userAltImage from '../images/userAltImage.png'; // 이미지 파일의 경로를 import 합니다.
import moment from 'moment'
import MenuButton from "../../components/button/MenuButton";
import { isLoginAtom } from "../store/atom";
import { lookingPkAtom } from "../store/atom";
import { albumPageMainImgAtom } from "../store/atom";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import '../page/AlbumPage.css'
import DehazeRoundedIcon from '@mui/icons-material/DehazeRounded';
import AlbumProfileImage from "./AlbumProfileImage";

const AlbumMypage = () => {

  const params = useParams();

  const [album, setAlbum] = useState([]);
  const [albumMemories, setAlbumMemories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [nextPageImages, setNextPageImages] = useState([]); // 추가: 다음 페이지의 이미지들을 저장할 상태
  const BACK_URL = 'http://congraduation.me/backapi';
  const [isauthorized, setIsauthorized] = useState(false);
  const [memoryarray, setMemoryarray] = useState([]);
  const itemsPerPage = 6;
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom)
  const [lookingPk, setLookingPk] = useRecoilState(lookingPkAtom)
  const [albumPageMainImg, setAlbumPageMainImg] = useRecoilState(albumPageMainImgAtom)

  const date = moment(album.openAt)
  const [specificMemory, setSpecificMemory] = useState("")
  const [imageUrl, setImageUrl] = useState(userAltImage);
  const [albumOpenAt, setalbumOpenAt] = useState(null);

  useEffect(() => {

    if (!isLogin) {
      navigate('/')
      return
    }
    axios
      .get(`https://congraduation.me/backapi/members/myAlbum`,
      { headers: { accessToken: localStorage.accessToken }})
      .then(response => {
        console.log('Album Data:', response.data);
        
        setAlbum(response.data);
        setImageUrl(response.data.coverUrl);
        setalbumOpenAt(response.data.openAt);
        setAlbumPageMainImg(response.data.coverUrl)
        return response.data.albumPk
      }).then((albumPk)=>{
        axios
        .get(`https://congraduation.me/backapi/albums/${albumPk}/memories`)
        .then(response => {
          setAlbumMemories(response.data);
          if (typeof (response.data) === typeof ([])) {
            setMemoryarray(response.data)
          }
          console.log(response.data)
        });
      });
    
  },[])

  const filteredAlbumMemories = albumMemories.filter((val) => val.albumPk === params.PK); // 메모리들의 albumPk 값이 url의 PK 값과 같은 것들을 담은 변수
  const startIndex = (currentPage - 1) * itemsPerPage;  // 페이지의 첫 인덱스 (예를 들면 6개씩 1페이지이면 2페이지일 때는 6)
  const endIndex = startIndex + itemsPerPage; // 끝 인덱스
  const displayedAlbumMemories = filteredAlbumMemories.slice(startIndex, endIndex);

  const handleImageClick = (imageUrl, index) => {
    const now = moment();
    setSelectedImageIndex(index);
    console.log(now)
    console.log(date)
    console.log(albumMemories[index].memoryPk)
    if (now >= date) {
      axios.get(`https://congraduation.me/backapi/memories/${albumMemories[index].memoryPk}`, {
        headers: { accessToken: localStorage.accessToken }
      })
        .then(response => {
          console.log(response.data)
          setSpecificMemory(response.data)
          // console.log(response.data)
        })

      setOpenModal(true); // 모달 opne 상태 true로

    } else {
      alert('공개일 아님')
    }
    console.log(imageUrl)
    console.log(index)
    // setSelectedImageIndex(index); //해당 인덱스로 선택된 이미지 상태 변경
    // setOpenModal(true); // 모달 opne 상태 true로
  }
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handlerCopyClipBoard = async (text) => {
    try {
      console.log(text)
      const domain = window.location.origin
      const address = `${domain}/albums/${text}`
      await navigator.clipboard.writeText(address);
      alert("링크가 복사됐습니다!");
      console.log(text)
    } catch (err) {
      console.log("error :", err);
    }
  };
  const handleCloseModal = () => {
    setOpenModal(false);  // 모달 open 상태 false로
    setSelectedImageIndex(null);  // 선택된 이미지 인덱스를 null로 상태 변경
  }

  // 다이어리(모달) 내에서 다음 이미지를 보여주는 함수
  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < memoryarray.length) {  // 전체 길이보다 작을 때에만 다음 이미지로 바꿔줌
        return nextIndex;
      }
      return prevIndex; // 그 외의 경우에는 이전 인덱스를 반환
    });
  };

  // 다이어리(모달) 내에서 이전 이미지를 보여주는 함수
  const handlePrevImage = () => {
    setSelectedImageIndex(prevIndex => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return prevIndex; // 이미지 인덱스가 0보다 작을 때는 현재 인덱스를 반환
    });
  };
  
  return (
    <div style={{ display: "flex", justifyContent: "center"}}>
      <StyledContainer>
        <div style={{marginLeft:"1rem" ,height: "20%"}}>
          <StyledTypography>
            {albumOpenAt === null ? (
              <div>졸업일자를 설정해주세요.</div>
            ) : (
              <div style={{ color: "white", fontWeight: "bolder" }}>D - <span class="memorysize">{album.openAt}</span></div>
            )}
          </StyledTypography>
          <StyledTypography style={{ color: "white" }}>
            <span class="memorysize">{memoryarray.length}장</span>의 메모리가 도착했어요!
          </StyledTypography>
        </div>
        
        <div class="aligncenter">
          <AlbumProfileImage
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            albumPk={params.PK}
            isClickable={isauthorized}
          />
          <StyledTypography>{album.nickname} 의 {album.title}</StyledTypography>
          
          <div>
            <MenuButton />
          </div>
        </div>
        <div style={{ height : '15%'}} className='gridAlignCenter'>
          <Grid container spacing={2}>
            {albumMemories.slice(startIndex, endIndex).map((val, index) => (
              <Grid item xs={4} key={index}>
                {/* <StyledPaper> */}
                <StyledImg
                  style={{ backgroundColor: "white", padding: "1px", }}
                  src={val.imageUrl}
                  alt={`Memory ${startIndex + index + 1}`}
                  onClick={() =>
                    handleImageClick(val.memoryPk, startIndex + index)
                  }
                />
                {/* </StyledPaper> */}
              </Grid>
            ))}
          </Grid>
        </div>
        <div class="aligncenter">
        <Pagination
          count={Math.ceil(memoryarray.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
        </div>
        <div class="aligncenter">
           <button class="button"
              onClick={() =>
                handlerCopyClipBoard(album.albumPk)
              }
            >
              공유하러 가기
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
}


export default AlbumMypage