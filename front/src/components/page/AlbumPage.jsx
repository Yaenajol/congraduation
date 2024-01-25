/*
  ****************************************************************
  현재 진행 사항
  npm install axios 해야함~~
  임의의 페이지를 활용하여 DB 접속 및 활용 되는 지 확인 완료
  https://jsonplaceholder.typicode.com/photos - 참고 DB
  
  BE 에서 REST API 까지 만들어 주면 해당 변수명(?) 만 바꿔주면 적용
  다 될 것으로 판단됨
  ****************************************************************
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { styled } from '@mui/system';
import { Paper, Grid, Pagination, Container, Button, Typography } from '@mui/material';
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
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const AlbumPage = () => {
  const [album, setAlbum] = useState([]);
  const [albumMemories, setAlbumMemories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  return (
    <StyledContainer>
      <StyledTypography variant="h4">Album Page</StyledTypography>
      
      <div className='flex-direction-row'>
        <div>D - {album.id}</div>
        <div>{album.title}</div>
      </div>
      
      <div>
        {album.id === 1 && <SettingsSharpIcon />}
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
              <StyledImg src={val.thumbnailUrl} alt={`Memory ${index + 1}`} />
            </StyledPaper>
          </Grid>
        ))}
      </Grid>

      <Pagination 
        count={Math.ceil(filteredAlbumMemories.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />

      <StyledButton
        variant="contained"
        color="primary"
        onClick={() => {
          window.location.href = "https://www.naver.com";
        }}
      >
        공유하러 가기
      </StyledButton>
    </StyledContainer>
  );
}

export default AlbumPage;




// // 앨범 페이지 "/albums/{albums.pk}"
// import { useEffect, useState } from 'react'
// import axios from 'axios'

// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import { Pagination, Container } from '@mui/material';
// import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';

// export default function AlbumPage() {
//   const [album, setAlbum] = useState([]); // 특정 앨범 조회용
//   const [albumMemories, setAlbumMemories] = useState([]); // 특정 앨범의 메모리 리스트 조회
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6; // 페이지 당 표시할 아이템 수

//   // 특정 앨범 조회용 - 하나의 객체만 가져왔을 때
//   useEffect(() => {
//     axios.get('https://jsonplaceholder.typicode.com/photos/1')
//          .then(response => {
//            console.log('Album Data:', response.data);
//            setAlbum(response.data);
//          })
//   }, []);

//   // 특정 앨범의 메모리 리스트 조회
//   useEffect(() => {
//     axios.get('https://jsonplaceholder.typicode.com/photos')
//          .then(response => {
//            console.log('Album Memories Data:', response.data);
//            setAlbumMemories(response.data);
//          })
//   }, []);

//   // 특정 앨범의 메모리 수
//   function AlbumMemoriesCountByAlbumId(albumMemories, albumId) {
//     const albumMemoriesWithAlbumId = albumMemories.filter((albumMemory) => albumMemory.albumId === albumId);
//     return albumMemoriesWithAlbumId.length;
//   }

//   const count = AlbumMemoriesCountByAlbumId(albumMemories, 1);  //albumId 1로 고정 수정 필

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   }

//   // 1로 필터링하고 Pagenation 진행 
//   const filteredAlbumMemories = albumMemories.filter((val) => val.albumId === 1);
//   const startIndex = (currentPage - 1) * itemsPerPage; 
//   const endIndex = startIndex + itemsPerPage;
//   const displayedAlbumMemories = filteredAlbumMemories.slice(startIndex, endIndex);

//   function BasicGrid() {
//     const Item = styled(Paper)(({ theme }) => ({
//       backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//       ...theme.typography.body2,
//       padding: theme.spacing(1),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//     }));
//     return (
//       <Box sx={{ flexGrow: 1 }}>
//         <Grid container spacing={2}>
//             {displayedAlbumMemories.map((val, index) => (
//               <Grid item xs={4} key={index}>
//                 <Item><img src={val.thumbnailUrl} alt={`Memory ${index + 1}`} /></Item>
//               </Grid>
//             ))}
//         </Grid>
//       </Box>
//     );
//   };

//   return (
//     <Container>
//       <div>
//         <div>D - {album.id}</div>   {/* 특정 앨범 조회 */}
//         <div>{album.title}</div>    {/* 특정 앨범 조회 */}
//       </div>
//       <div>
//         {album.id === 1 && <SettingsSharpIcon />}
//       </div>

//       {album.thumbnailUrl ? <img src={album.thumbnailUrl} alt="Album Cover" /> : <div>기본 이미지 나오게 설정</div>}

//       <div>
//         {/* {album.id} 를 쓰면 무한콘솔 찍히는 현상 발견*/}
//         {/* <div>{album.id} 대학교</div> 특정 앨범 조회 */}
//         <div>{count} 개 도착</div>  {/* 특정 앨범의 메모리 리스트 조회*/}
//       </div>
//       <BasicGrid />
//       <Pagination 
//         count={Math.ceil(filteredAlbumMemories.length / itemsPerPage)}
//         page={currentPage}
//         onChange={handlePageChange}
//       />
//       <button onClick={() => {
//         window.location.href = "https://www.naver.com";
//       }}>공유하러 가기</button>
//     </Container>
//   )
// }