// /*
//   ****************************************************************
//   현재 진행 사항
//   npm install axios 해야함~~
//   임의의 페이지를 활용하여 DB 접속 및 활용 되는 지 확인 완료
//   https://jsonplaceholder.typicode.com/photos - 참고 DB
  
//   BE 에서 REST API 까지 만들어 주면 해당 변수명(?) 만 바꿔주면 적용
//   다 될 것으로 판단됨
//   ****************************************************************
// */

// // 앨범 페이지 "/albums/{albums.pk}"
// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// import { Pagination } from "@mui/material";

// // 모달 관련
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";

// //모달 슬라이딩 (슬릭)
// import Slider from 'react-slick'
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// export default function AlbumPage() {
//   const [album, setAlbum] = useState([]); // 특정 앨범 조회용
//   const [albumMemories, setAlbumMemories] = useState([]); // 특정 앨범의 메모리 리스트 조회
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6; // 페이지 당 표시할 아이템 수

//   const navigate = useNavigate()
  
//   const gotoEdit = () => {
//     navigate('/albums/edit')
//   }
//   // 특정 앨범 조회용 - 하나의 객체만 가져왔을 때
//   useEffect(() => {
//     axios
//       .get("https://jsonplaceholder.typicode.com/photos/1")
//       .then((response) => {
//         console.log("Album Data:", response.data);
//         setAlbum(response.data);
//       });
//   }, []);

//   // 특정 앨범의 메모리 리스트 조회
//   useEffect(() => {
//     axios
//       .get("https://jsonplaceholder.typicode.com/photos")
//       .then((response) => {
//         console.log("Album Memories Data:", response.data);
//         setAlbumMemories(response.data);
//       });
//   }, []);

//   // 특정 앨범의 메모리 수
//   function AlbumMemoriesCountByAlbumId(albumMemories, albumId) {
//     const albumMemoriesWithAlbumId = albumMemories.filter(
//       (albumMemory) => albumMemory.albumId === albumId
//     );
//     return albumMemoriesWithAlbumId.length;
//   }

//   const count = AlbumMemoriesCountByAlbumId(albumMemories, 1); //albumId 1로 고정 수정 필

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   // 1로 필터링하고 Pagenation 진행
//   const filteredAlbumMemories = albumMemories.filter(
//     (val) => val.albumId === 1
//   );
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const displayedAlbumMemories = filteredAlbumMemories.slice(
//     startIndex,
//     endIndex
//   );

//   function BasicGrid() {
//     const [open, setOpen] = useState(false);
//     const [selectedImage, setSelectedImage] = useState(null)
//     const [currentImageIndex, setCurrentImageIndex] = useState(null)

//     const sliderRef = useRef(null)
    
//     useEffect(() => {
//       if (open && sliderRef.current && typeof currentImageIndex === 'number') {
//         setTimeout(() => sliderRef.current.slickGoTo(currentImageIndex), 0)
//       }
//     },[open, currentImageIndex])

//     const handleOpen = () => setOpen(true);

//     const handleClose = () => {
//       setOpen(false)
//       setSelectedImage(null)
//     }

//     const handleImageClick = (image, index) => {
//       setSelectedImage(image)
//       setCurrentImageIndex(index)
//       setOpen(true)

//       if (sliderRef.current) {
//         sliderRef.current.slickGoTo(index)
//       }
//     }
   
//     // 모달 스타일
//     const style = {
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       width: 400,
//       bgcolor: 'background.paper',
//       border: '2px solid #000',
//       boxShadow: 24,
//       p: 4,
//     };

//     const Item = styled(Paper)(({ theme }) => ({
//       backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//       ...theme.typography.body2,
//       padding: theme.spacing(1),
//       textAlign: "center",
//       color: theme.palette.text.secondary,
//     }));

//     const sliderSettings = {
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll:1,
//       draggable: true,
//       arrows : true,
//     }

//     return (
//       <Box sx={{ flexGrow: 1 }}>
//         <Grid container spacing={2}>
//           {displayedAlbumMemories.map((val, index) => (
//             <Grid item xs={4} key={index} onClick={() => handleImageClick(val)}>
//               <Item>
//                 <img src={val.thumbnailUrl} alt={`Memory ${index + 1}`} />

//               </Item>
//             </Grid>
//           ))}
//         </Grid>
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <Slider ref={sliderRef} {...sliderSettings} key={currentImageIndex}>
//               {displayedAlbumMemories.map((image, index) => (
//                 <div key={index}>
//                   <img src={image.thumbnailUrl} alt={`Memory ${index + 1}`} />
//                   <p>{image.title}</p>
//                 </div>
//               ))}
//             </Slider>
//             {/* {selectedImage && (
//               <div>
//                 <img src={selectedImage.thumbnailUrl} alt="Selected" />
//                 <p>{selectedImage.title}</p>
//                 <p>{selectedImage.id}</p>
//               </div>
//             )} */}
//           </Box>
          
//         </Modal>
//       </Box>
//     );
//   }

//   return (
//     <div>
//       <div>
//         <div>D - {album.id}</div> {/* 특정 앨범 조회 */}
//         <div>{album.title}</div> {/* 특정 앨범 조회 */}
//       </div>

//       {album.id === 1 && <div>set</div>}

//       {album.thumbnailUrl ? (
//         <img src={album.thumbnailUrl} alt="Album Cover" />
//       ) : (
//         <div>기본 이미지 나오게 설정</div>
//       )}

//       <div>
//         {/* {album.id} 를 쓰면 무한콘솔 찍히는 현상 발견*/}
//         {/* <div>{album.id} 대학교</div> 특정 앨범 조회 */}
//         <div>{count} 개 도착</div> {/* 특정 앨범의 메모리 리스트 조회*/}
//       </div>
//       <BasicGrid />
//       <Pagination
//         count={Math.ceil(filteredAlbumMemories.length / itemsPerPage)}
//         page={currentPage}
//         onChange={handlePageChange}
//       />
//       <button
//         onClick={() => {gotoEdit()}}
//       >
//         공유하러 가기
//       </button>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Paper, Grid, Pagination, Container, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import {styled } from '@mui/material/styles';



const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(4),
  backgroundColor: '#FFFFB5',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledImg = styled('img')({
  maxWidth: '100%',
  height: 'auto',
  marginTop: '8px',
  cursor: 'pointer', // 추가: 마우스 커서를 포인터로 변경하여 사용자에게 클릭 가능성을 시사합니다.
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const AlbumPage = () => {
  const [album, setAlbum] = useState([]);
  const [albumMemories, setAlbumMemories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false); // 추가: 모달의 열림/닫힘 상태를 관리합니다.
  const [selectedImage, setSelectedImage] = useState(null); // 추가: 모달에 표시할 이미지 URL을 관리합니다.
  const itemsPerPage = 6;
  const navigate = useNavigate()

  const gotoEdit = () => {
    navigate('/albums/edit')
  }

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos/1')
         .then(response => {
           console.log('Album Data:', response.data);
           setAlbum(response.data);
         });
  }, []);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos')
         .then(response => {
           console.log('Album Memories Data:', response.data);
           setAlbumMemories(response.data);
         });
  }, []);

  function AlbumMemoriesCountByAlbumId(albumMemories, albumId) {
    const albumMemoriesWithAlbumId = albumMemories.filter((albumMemory) => albumMemory.albumId === albumId);
    return albumMemoriesWithAlbumId.length;
  }

  const count = AlbumMemoriesCountByAlbumId(albumMemories, 1);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  }

  const filteredAlbumMemories = albumMemories.filter((val) => val.albumId === 1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedAlbumMemories = filteredAlbumMemories.slice(startIndex, endIndex);

  // 추가: 이미지 클릭 시 모달 열기
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenModal(true);
  }

  // 추가: 모달 닫기
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null); // 선택된 이미지 초기화
  }

  //세팅 화면 가는 navigate
  const gotoSetting = () => {
    navigate('/albums/setting')
  }
  return (
    <StyledContainer>
      <StyledTypography variant="h4">Album Page</StyledTypography>
      
      <div className='flex-direction-row'>
        <div>D - {album.id}</div>
        <div>{album.title}</div>
      </div>
      
      <div>
        <button >로그아웃 버튼(위치는 신경쓰지마요)</button>
      </div>
      <div>
        {album.id === 1 && <SettingsSharpIcon onClick={() => gotoSetting() }/>}
      </div>

      {album.thumbnailUrl ? (
        <StyledImg src={album.thumbnailUrl} alt="Album Cover" />
      ) : (
        <StyledTypography>기본 이미지 나오게 설정</StyledTypography>
      )}

      <div>
        <StyledTypography>{count} 개 도착</StyledTypography>
      </div>

      <Grid container spacing={2}>
        {displayedAlbumMemories.map((val, index) => (
          <Grid item xs={4} key={index}>
            <StyledPaper>
              {/* 추가: 이미지 클릭 시 모달 열기 */}
              <StyledImg src={val.thumbnailUrl} alt={`Memory ${index + 1}`} onClick={() => handleImageClick(val.url)} />
            </StyledPaper>
          </Grid>
        ))}
      </Grid>

      <Pagination 
        count={Math.ceil(filteredAlbumMemories.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />


      {/* 졸업자pk와 지인pk를 삼항연산자로 확인해서 (? 링크 공유 : 메모리 추가하기 )작업을 해야됨 */}
      <StyledButton
        variant="contained"
        color="primary"
        onClick={() => {
          gotoEdit()
        }}
      >
        공유하러 가기
      </StyledButton>

      {/* 추가: 모달 */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>이미지 상세보기</DialogTitle>
        <DialogContent>
          {selectedImage && <img src={selectedImage} alt="Memory" style={{ maxWidth: '100%' }} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
}

export default AlbumPage;