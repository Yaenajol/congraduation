import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

import StyledMemoryPage from "../styledComponents/StyledMemoryPage";
import HomeIcon from "@mui/icons-material/Home";

import StyledTypography from "../styledComponents/StyledTypography";
import userAltImage from "../images/userAltImage.png"; // 이미지 파일의 경로를 import 합니다.
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "./AllPage.css";

const SettingsPage = () => {
  const location = useLocation();
  const albumdata = location.state;
  console.log("albumdata" + albumdata);

  const RoundedRectangle = () => {
    const [nickname, setNickname] = useState(
      albumdata.nickname !== null ? albumdata.nickname : ""
    );
    const [graduationPlace, setGraduationPlace] = useState(
      albumdata.graduationPlace !== null ? albumdata.graduationPlace : ""
    );
    const [title, setTitle] = useState(
      albumdata.title !== null ? albumdata.title : ""
    );
    const navigate = useNavigate();
    const [graduationDate, setGraduationDate] = useState(dayjs(new Date()));

    const gotoAlbumPage = () => {
      navigate(`/myalbum`);
    };

    const handleSaveAlbumSettings = async () => {
      try {
        const userInfo = {
          nickname: nickname,
          graduationPlace: graduationPlace,
          title: title,
        };

        const accessToken = sessionStorage.getItem("accessToken");

        axios
          .put(
            `https://congraduation.me/backapi/albums/${albumdata.albumPk}`,
            userInfo,
            {
              headers: {
                accessToken: accessToken,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            gotoAlbumPage();
          })
          .catch((error) => {
            console.log("실패");
          });
      } catch (error) {
        console.error("전송 실패 :", error);
      }
    };

    const handleSaveAlbumSettingsWithGraduationDate = async () => {
      try {
        const dateFormat = dayjs(graduationDate).format("YYYYMMDD");
        const todayDateFormat = dayjs(new Date()).format("YYYYMMDD");

        if (dateFormat < todayDateFormat) {
          window.alert("날짜를 오늘 이상으로 설정해 주세요.");
          return;
        }

        if (!dateFormat)
          if (!window.confirm("확정 시, 수정 불가합니다.")) {
            return;
          }

        console.log("데이트포맷 : " + dateFormat);
        const payload = {
          graduationDate: dateFormat,
        };
        axios
          .put(
            `https://congraduation.me/backapi/albums/${albumdata.albumPk}/graduationDate`,
            payload,
            {
              headers: {
                accessToken: sessionStorage.getItem("accessToken"),
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            // window.location.reload();
            gotoAlbumPage();
          })
          .catch((error) => {
            console.log("실패" + error);
          });
      } catch (error) {
        console.error("전송 실패 :", error);
      }
    };

    return (
      <div
        style={{
          marginTop: "80px",
          marginBottom: "80px",
          marginLeft: "20px",
          marginRight: "20px",
          width: "300px", // 너비
          height: "auto", // 높이
          borderRadius: "10px", // 모서리 반경
          backgroundColor: "rgb(255, 255, 255, 0.7)", // 희미한 흰색 배경
          boxShadow: "0px 0px 15px 10px rgba(232, 236, 242)", // 그림자
          display: "flex",
          flexDirection: "column", // 세로 방향으로 배치
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 15px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              color: "#f2eff7",
              fontSize: "25px",
              textShadow: "0px 0px 10px rgb(108, 0, 174)",
              fontFamily: "TheJamsil5Bold",
            }}
          >
            앨범 설정
          </div>
          <HomeIcon sx={{ fontSize: 50 }} onClick={gotoAlbumPage} />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 15px",
            }}
          >
            <StyledTypography
              variant="h6"
              gutterBottom
              style={{
                color: "rgb(255, 249, 215)",
                textShadow: "0px 0px 10px rgb(108, 0, 174)",
                fontFamily: "TheJamsil5Bold",
              }}
            >
              {nickname}님
            </StyledTypography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              padding: "0 15px",
              marginTop: "10px",
              color: "rgb(75, 24, 112)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
              }}
            >
              {/* <div className='font700'>Nickname</div> */}
              <TextField
                label="닉네임"
                id="outlined-size-small"
                value={nickname}
                // size="normal"
                width="100%S"
                onChange={(e) => setNickname(e.target.value)}
                margin="dense"
                sx={{ input: { textAlign: "center" } }} // 안에 문자 중간정렬
                // 테두리 둥글게 하는 방법 inputprops부터 넣어야함
                InputProps={{
                  style: {
                    borderRadius: "20px",
                    backgroundColor: "rgb(255, 255, 255, 0.9)",
                    fontFamily: "TheJamsil5Bold",
                    color: "rgba(74, 16, 102)",
                  },
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                marginTop: "15px",
              }}
            >
              {/* <div className='font700'>Graduation Place</div> */}
              <TextField
                label="졸업 학교"
                id="outlined-size-small"
                value={graduationPlace}
                size="medium"
                onChange={(e) => setGraduationPlace(e.target.value)}
                margin="dense"
                sx={{ input: { textAlign: "center" } }} // 안에 문자 중간정렬
                // 테두리 둥글게 하는 방법 inputprops부터 넣어야함
                InputProps={{
                  style: {
                    borderRadius: "20px",
                    backgroundColor: "rgb(255, 255, 255)",
                    fontFamily: "TheJamsil5Bold",
                    color: "rgba(74, 16, 102)",
                  },
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                marginTop: "15px",
              }}
            >
              {/* <div className='font700'>Title</div>   */}
              <TextField
                label="앨범 이름"
                id="outlined-size-small"
                value={title}
                size="normal"
                onChange={(e) => setTitle(e.target.value)}
                margin="dense"
                sx={{ input: { textAlign: "center" } }} // 안에 문자 중간정렬
                // 테두리 둥글게 하는 방법 inputprops부터 넣어야함
                InputProps={{
                  style: {
                    borderRadius: "20px",
                    backgroundColor: "rgb(255, 255, 255)",
                    fontFamily: "TheJamsil5Bold",
                    color: "rgba(74, 16, 102)",
                  },
                }}
              />
            </div>

            {albumdata.openAt === null ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Graduation Date"
                    value={graduationDate}
                    onChange={(newValue) => setGraduationDate(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            ) : (
              <div />
            )}
            <Box textAlign="center" marginTop={15} marginBottom={2}>
              <button
                className="button"
                onClick={
                  albumdata.openAt === null
                    ? handleSaveAlbumSettingsWithGraduationDate
                    : handleSaveAlbumSettings
                }
              >
                설정하기
              </button>
            </Box>
          </div>
        </div>
      </div>
    );
  };

  return (
    <StyledMemoryPage>
      <RoundedRectangle />
    </StyledMemoryPage>
  );
};

export default SettingsPage;
