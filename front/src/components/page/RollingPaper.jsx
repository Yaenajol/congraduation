import { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2canvas from 'html2canvas';

import userAltImage from "../images/userAltImage.png";
import albumFrame from "../images/albumFrame.png";
import AlbumProfileImage from "./AlbumProfileImage";
import dogBall from "../images/dogBall.png"
import dogHat from "../images/dogHat.png"
import background3 from "../images/background3.png"

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button, Box} from '@mui/material';

function RollingPaper() {

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImages, setSelectedImages] = useState({});
  const [isDownloadMode, setIsDownloadMode] = useState(false)
  const cardRef = useRef(null);

  const messages = [
    { id: 1, image: dogBall, nickname: 'test1', message: "아으디라으니안이라ㅣㄴㅇ란일" },
    { id: 2, image: dogHat, nickname: 'test2', message: "123123123" },
    { id: 3, image: albumFrame, nickname: 'test3', message: "가나다라마바사" },
    { id: 4, image: background3, nickname: 'test4', message: "asdasfvfsdfsf" },
    { id: 5, image: userAltImage, nickname: 'test5', message: "테스트용 더미 데이터 테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터" },
  ];

  
  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % messages.length);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + messages.length) % messages.length);
  };

  const toggleImageSelection = (id) => {
    setSelectedImages((prevSelected) => ({
      ...prevSelected,
      [id]: !prevSelected[id]
    }));
  };

  // const downloadSelectedImages = () => {
  //   messages.forEach((message) => {
  //     if (selectedImages[message.id]) {
  //       const link = document.createElement('a');
  //       link.href = message.image;
  //       link.download = `download_${message.nickname}`; // or extract filename from URL
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //     }
  //   });
  // };

  const downloadSelectedImages = async () => {
    setIsDownloadMode(true); // 다운로드 모드 활성화

    setTimeout(async () => {
      const card = cardRef.current; // 현재 CardActionArea의 DOM 레퍼런스
      if (card) {
        const canvas = await html2canvas(card);
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'rolling-paper.png';
        link.href = image;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      setIsDownloadMode(false); // 다운로드 모드 비활성화
    }, 100); // 잠시 후 실행하여 CSS 변경이 화면에 반영되도록 함
  };

  return (
    <Box>
      <Card ref={cardRef}>
        <CardActionArea style={{ border: "1px black solid", position: 'relative' }} onClick={() => toggleImageSelection(messages[currentPage].id)}>
          <div>
            <CardMedia component="img" image={messages[currentPage].image} sx={{ maxWidth: 500, maxHeight: 500 }} />
            {selectedImages[messages[currentPage].id] && !isDownloadMode && (
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
              }}>
                ✓
              </div>
            )}
          </div>
          
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {messages[currentPage].nickname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {messages[currentPage].message}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button variant="contained" onClick={handlePrev} sx={{ marginRight: 1 }}>
          이전
        </Button>
        <Button variant="contained" onClick={handleNext} sx={{ marginRight: 1 }}>
          다음
        </Button>
        <Button variant="contained" onClick={downloadSelectedImages}>
          다운로드
        </Button>
      </Box>
      <p style={{ justifyContent: 'center', display: 'flex' , marginTop: '10%'}}>원하는 이미지를 선택해주세요</p>
    </Box>
    
  );
}

export default RollingPaper