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
import MenuButton from '../../components/button/MenuButton'
import { isLoginAtom } from "../store/atom";
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import '../page/AlbumPage.css'
import DehazeRoundedIcon from '@mui/icons-material/DehazeRounded';
import AlbumProfileImage from "./AlbumProfileImage";
const AlbumPage = () => {
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
  const date = moment(album.openAt)
  const [specificMemory, setSpecificMemory] = useState("")
  const [imageUrl, setImageUrl] = useState(userAltImage);
  const [albumOpenAt, setalbumOpenAt] = useState(null);

  useEffect(() => {
    // 특정 앨범 조회
    axios
      .get(`https://congraduation.me/backapi/albums/${params.PK}`)
      .then(response => {
        console.log('Album Data:', response.data);

      setAlbum(response.data);
      setImageUrl(response.data.coverUrl);
      setalbumOpenAt(response.data.openAt);
  });

// 앨범의 특정 메모리 조회
    axios
    .get(`https://congraduation.me/backapi/albums/${params.PK}/memories`)
    .then(response => {
      console.log('Album Memories Data:', response.data);
      setAlbumMemories(response.data);
      if (typeof (response.data) === typeof ([])) {
        setMemoryarray(response.data)
      }
    });

// accessToken 이 있을 때
if (isLogin) {
  // 유저의 앨범 접근 권한 조회를 한다.
  axios
    .get
      (`https://congraduation.me/backapi/members/authority?albumPk=${params.PK}`,
      { headers: { accessToken: localStorage.accessToken } }
      )
    .then(response => {
      console.log(response.data)
      // 만약 접근한 유저의 권한이 true 이면
      if (typeof (response.data) === typeof (true)) {
        setIsauthorized(response.data)  // 상태를 바꿔준다.
        console.log(isauthorized)
      }
    })
  }
  }, []);

  // 페이지 전환 기능
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  //6개씩 보이게 적용
  const filteredAlbumMemories = albumMemories.filter((val) => val.albumPk === params.PK); // 메모리들의 albumPk 값이 url의 PK 값과 같은 것들을 담은 변수
  const startIndex = (currentPage - 1) * itemsPerPage;  // 페이지의 첫 인덱스 (예를 들면 6개씩 1페이지이면 2페이지일 때는 6)
  const endIndex = startIndex + itemsPerPage; // 끝 인덱스
  const displayedAlbumMemories = filteredAlbumMemories.slice(startIndex, endIndex); // 첫 인덱스와 끝 인덱스를 통해 슬라이스 작업

  // 비동기 처리 해야됨
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

  // 다이어리(모달)을 끄는 기능
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

  // 링크 주소 저장 기능
  const handlerCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("링크가 복사됐습니다!");
    } catch (err) {
      console.log("error :", err);
    }
  };

  // Setting page 로 이동하는 기능
  const gotoSetting = () => {
    navigate(`/albums/${params.PK}/setting`)  // 이러면 안되는데 수정 필요할 듯
  }

  const gotoAddMemory = () => {
    console.log(isLogin)
    if (!isLogin) {
      console.log(isLoginAtom);
      navigate("/");
    } else {
      navigate(`/albums/${params.PK}/edit`);
    }
  };

  // 유저 이미지 아이콘 버튼
  return (
    <StyledContainer>
      <div
        style={{
          marginTop: '30px',
          width: '40vh', // 너비
          height: '30vh', // 높이
          borderRadius: '20px', // 모서리 반경
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // 희미한 흰색 배경
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', // 그림자
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AlbumProfileImage
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          albumPk={params.PK}
        />
        <StyledTypography>{album.nickname} 의 앨범</StyledTypography>
      </div>
      <StyledTypography>
        {albumOpenAt === null ? (
          <div>졸업일자를 설정해주세요.</div>
        ) : (
          <div>D - {album.openAt}</div>
        )}
        <div>{album.title}</div>
      </StyledTypography>
      <StyledTypography>
        {memoryarray.length}장의 메모리가 도착했어요!
      </StyledTypography>
      <div>
        <MenuButton />
      </div>
      <Grid container spacing={1}>
        {albumMemories.slice(startIndex, endIndex).map((val, index) => (
          <Grid item xs={4} key={index}>
            <StyledPaper>
              <StyledImg
                src={val.imageUrl}
                alt={`Memory ${startIndex + index + 1}`}
                onClick={() =>
                  handleImageClick(val.memoryPk, startIndex + index)
                }
              />
            </StyledPaper>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(memoryarray.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
      <div>
        {isauthorized === true ? (
          <StyledButton
            variant="contained"
            color="primary"
            onClick={() =>
              handlerCopyClipBoard(`congraduation.me/${location.pathname}`)
            }
            // onClick={() => {
            //   window.location.href = "https://www.naver.com";
            // }}
          >
            공유하러 가기
          </StyledButton>
        ) : (
          <StyledButton
            onClick={() => gotoAddMemory()}
            variant="contained"
            color="primary"
          >
            메모리 추가하기
          </StyledButton>
        )}
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
  );
};

export default AlbumPage;
