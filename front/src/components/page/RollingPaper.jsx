import { useEffect, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import saveAs from "file-saver";

import { useLocation, useNavigate } from "react-router";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  CardActionArea,
  Grid,
} from "@mui/material";

import background3 from "../images/background3.png"

function RollingPaper() {
  const API_URL = process.env.REACT_APP_BACKEND_API_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 4;
  const [selectedImages, setSelectedImages] = useState({});
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/members/myMemories`, {
        headers: { accessToken: sessionStorage.accessToken },
      })
      .then((response) => {
        response.data.forEach(async (memory) => {
          const res = await fetch(memory.image);
          const blob = await res.blob();
          const downloadUrl = window.URL.createObjectURL(blob); // 이 과정이 필요하다.
          memory.image = downloadUrl;
        });
        setMessages(response.data);
      });
  }, []);

  const totalPages = Math.ceil(messages.length / imagesPerPage);

  const handleNext = () => {
    setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage);
  };

  const handlePrev = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  };

  const toggleImageSelection = (id) => {
    setSelectedImages((prevSelected) => ({
      ...prevSelected,
      [id]: !prevSelected[id],
    }));
  };

  const downloadSelectedImages = async () => {
    const zip = new JSZip(); 
    const canvasPromises = [];

    Object.keys(selectedImages).forEach((id) => {
      if (selectedImages[id]) {
        const message = messages.find(
          (message) => message.id.toString() === id
        );
        if (message) {
          const imageContainer = document.createElement("div");
          imageContainer.style.boxShadow =
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);";
          imageContainer.style.width = "350px";
          imageContainer.style.backgroundColor = "rgb(255, 226, 233)";
          imageContainer.style.display = "flex";
          imageContainer.style.alignItems = "center";
          imageContainer.style.flexDirection = "column";
          imageContainer.style.padding = "10px";
          imageContainer.style.border = "1px solid black";
          imageContainer.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
          // 다운받는 사진의 css 건드리는곳
          imageContainer.innerHTML = `
            <img src="${message.image}" alt="${message.nickname}" style="background-color:white;display: block; width: 300px; margin: 10px;"/>
            <h3 style="margin: 0;color: white;text-shadow: 2px 2px 4px #000000;margin-bottom:5px">${message.nickname}</h3>
            <p style="margin: 0;color:black;text-shadow: 1px 1px 2px #000000;">${message.content}</p>
          `;
          document.body.appendChild(imageContainer);

          const promise = new Promise((resolve, reject) => {
            html2canvas(imageContainer).then((canvas) => {
              canvas.toBlob((blob) => {
                zip.file(`image_${id}.png`, blob);
                document.body.removeChild(imageContainer);
                resolve();
              }, "image/png");
            });
          });
          canvasPromises.push(promise);
        }
      }
    });

    await Promise.all(canvasPromises).then(() => {
      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "congraduation.zip");
      });
    });
    navigate('/myalbum');
  };

  return (
    <Box style={{ backgroundColor: 'gray'}}>
      <Grid container spacing={2} >
        {messages
          .slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage)
          .map((message) => (
            <Grid
              item
              xs={6}
              key={message.id}
              onClick={() => toggleImageSelection(message.id)}
            >
              <Card
                sx={{ maxWidth: 500, maxHeight: 500, position: "relative" }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={message.image}
                    alt={message.nickname}
                    sx={{ height: 250 }} // 사이트에서 보여지는 사진 크기
                    id={`image-${message.id}`}
                  />
                  {selectedImages[message.id] && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "24px",
                      }}
                    >
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
        <Button
          variant="contained"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          이전
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          다음
        </Button>
        <Button
          variant="contained"
          onClick={downloadSelectedImages}
          sx={{ ml: 2 }}
        >
          선택 다운로드
        </Button>
      </Box>
    </Box>
  );
}

export default RollingPaper;
