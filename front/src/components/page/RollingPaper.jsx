import { useEffect, useState} from "react";
import axios from "axios";
import html2canvas from 'html2canvas';
import JSZip from "jszip";
import saveAs from "file-saver";

import userAltImage from "../images/userAltImage.png";
import albumFrame from "../images/albumFrame.png";
import AlbumProfileImage from "./AlbumProfileImage";
import dogBall from "../images/dogBall.png"
import dogHat from "../images/dogHat.png"
import background3 from "../images/background3.png"
import { useLocation, useNavigate } from "react-router";

import { Card, CardContent, CardMedia, Typography, Button, Box,CardActionArea, Grid} from '@mui/material';

function RollingPaper() {
  const API_URL = process.env.REACT_APP_BACKEND_API_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 4;
  const [selectedImages, setSelectedImages] = useState({});
  const [messages, setMessages] = useState([])
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${API_URL}/members/myMemories`, {
        headers: { accessToken: sessionStorage.accessToken },
      })
      .then((response) => {
        setMessages(response.data); 
    })
  }, []); 

  console.log(messages)
  
  
  // 더미 데이터 
  // const messages = [
  //   { id: 1, image: dogBall, nickname: 'test1', message: "아으디라으니안이라ㅣㄴㅇ란일" },
  //   { id: 2, image: dogHat, nickname: 'test2', message: "123123123" },
  //   { id: 3, image: albumFrame, nickname: 'test3', message: "가나다라마바사" },
  //   { id: 4, image: background3, nickname: 'test4', message: "asdasfvfsdfsf" },
  //   { id: 5, image: userAltImage, nickname: 'test5', message: "테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터 테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터테스트용 더미 데이터" },
  // ];


  const totalPages = Math.ceil(messages.length / imagesPerPage)

  const handleNext = () => {
    setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage);
  };

  const handlePrev = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  };

  const toggleImageSelection = (index) => {
    setSelectedImages((prevSelected) => ({
      ...prevSelected,
      [index]: !prevSelected[index]
    }));
  };
  console.log(selectedImages)
  
  const downloadSelectedImages = async () => {
    const zip = new JSZip();
    const canvasPromises = [];
  
    Object.keys(selectedImages).forEach((id) => {
      if (selectedImages[id]) {
        const message = messages.find(message => message.id.toString() === id);
        if (message) {
          console.log(message)
          const imageContainer = document.createElement("div");
          imageContainer.style.padding = "10px";
          // imageContainer.style.background = "white"; 
          imageContainer.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
          // 다운받는 사진의 css 건드리는곳 
          imageContainer.innerHTML = `
            <img src="${message.image}" alt="${message.nickname}" style="max-width: 100%; display: block; margin-bottom: 10px; border: 1px solid black" />
            <h5 style="margin: 0;">${message.nickname}</h5>
            <p style="margin: 0;">${message.content}</p>
          `;
          document.body.appendChild(imageContainer);
          
          const promise = new Promise((resolve, reject) => {
            html2canvas(imageContainer).then(canvas => {
              canvas.toBlob(blob => {
                zip.file(`image_${id}.png`, blob);
                document.body.removeChild(imageContainer);
                resolve();
              }, 'image/png');
            });
          });
          canvasPromises.push(promise);
        }
      }
    });
  
    
    await Promise.all(canvasPromises).then(() => {
      zip.generateAsync({ type: "blob" }).then(content => {
        saveAs(content, "congraduation.zip");
      });
    });
  };

 

  return (
    <Box>
      <Grid container spacing={2}>
        {messages.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage).map((message, index) => (
          <Grid item xs={6} key={index} onClick={() => toggleImageSelection(index)}>
            <Card sx={{ maxWidth: 500, maxHeight: 500, position: 'relative' }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={message.image}
                  alt={message.nickname}
                  sx={{ height: 250 }}   // 사이트에서 보여지는 사진 크기 
                  id={`image-${index}`}
                />
                {selectedImages[index] && (
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                  }}>
                    ✓
                  </Box>
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {message.nickname}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {message.content}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button variant="contained" onClick={handlePrev} disabled={currentPage === 1}>이전</Button>
        <Button variant="contained" onClick={handleNext} disabled={currentPage === totalPages}>다음</Button>
        <Button variant="contained" onClick={downloadSelectedImages} sx={{ ml: 2 }}>선택 다운로드</Button>
      </Box>
    </Box>
  );
}

export default RollingPaper