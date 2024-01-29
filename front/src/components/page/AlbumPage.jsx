import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Paper, Grid, Pagination, Container, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import {styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(4),
  // backgroundColor: '#FFFFB5',
  backgroundImage: 'url("background.png")', // 배경 이미지 추가
  backgroundSize: 'cover', // 배경 이미지를 화면에 꽉 채우도록 설정
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
  cursor: 'pointer',
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const AlbumPage = () => {
  const [album, setAlbum] = useState([]);
  const [albumMemories, setAlbumMemories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [nextPageImages, setNextPageImages] = useState([]); // 추가: 다음 페이지의 이미지들을 저장할 상태

  const itemsPerPage = 6;
  const navigate = useNavigate()

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

  const handleImageClick = (imageUrl, index) => {
    setSelectedImageIndex(index);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImageIndex(null);
  }

  const handleNextImage = () => {
    setSelectedImageIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < displayedAlbumMemories.length) {
        return nextIndex;
      } else {
        // 추가: 다음 페이지의 이미지를 미리 불러옴
        const nextPage = currentPage + 1;
        const nextStartIndex = (nextPage - 1) * itemsPerPage;
        const nextEndIndex = nextStartIndex + itemsPerPage;
        const nextImages = filteredAlbumMemories.slice(nextStartIndex, nextEndIndex);
        setNextPageImages(nextImages);
        setCurrentPage(nextPage);
        return prevIndex;
      }
    });
  }

  const handlePrevImage = () => {
    setSelectedImageIndex(prevIndex => {
      const newIndex = prevIndex - 1;
      if (newIndex >= 0) {
        return newIndex;
      } else {
        return prevIndex;
      }
    });
  }

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
        {album.id === 1 && <SettingsSharpIcon onClick={() => gotoSetting()}/>}
      </div>

      {album.thumbnailUrl ? (
        <StyledImg src={album.thumbnailUrl} alt="Album Cover" />
      ) : (
        <StyledTypography>기본 이미지 나오게 설정</StyledTypography>
      )}

      <div>
        <StyledTypography>{count} 개 도착</StyledTypography>
      </div>
      {/* <BasicGrid /> */}

      <Grid container spacing={2}>
        {displayedAlbumMemories.map((val, index) => (
          <Grid item xs={4} key={index}>
            <StyledPaper>
              <StyledImg src={val.thumbnailUrl} alt={`Memory ${index + 1}`} onClick={() => handleImageClick(val.url, index)} />
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

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>이미지 상세보기</DialogTitle>
        <DialogContent>
          {selectedImageIndex !== null && (
            <div>
              <StyledImg src={displayedAlbumMemories[selectedImageIndex].url} alt={`Memory ${selectedImageIndex + 1}`} style={{ maxWidth: '100%' }} />
              {/* 추가: 다음 페이지의 이미지들 표시 */}
              {nextPageImages.map((image, index) => (
                <StyledImg key={index} src={image.url} alt={`Memory ${index + itemsPerPage + 1}`} style={{ maxWidth: '100%', display: 'block', marginTop: '8px' }} />
              ))}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrevImage} disabled={selectedImageIndex === 0} color="primary">
            이전
          </Button>
          <Button onClick={handleCloseModal} color="primary">
            닫기
          </Button>
          <Button onClick={handleNextImage} disabled={selectedImageIndex === displayedAlbumMemories.length - 1} color="primary">
            다음
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
}

export default AlbumPage