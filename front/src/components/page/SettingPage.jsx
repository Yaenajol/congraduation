import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
// import StyledContainer from '../styledComponents/StyledContainer';
import StyledMemoryPage from "../styledComponents/StyledMemoryPage";
import HomeIcon from '@mui/icons-material/Home';
import StyledImg from '../styledComponents/StyledImg';
import StyledTypography from '../styledComponents/StyledTypography';
import userAltImage from '../images/userAltImage.png'; // 이미지 파일의 경로를 import 합니다.
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const SettingsPage = () => {

  const RoundedRectangle = () => {

    const [nickname, setNickname] = useState('');
    const [graduationPlace, setGraduationPlace] = useState('');
    const [title, setTitle] = useState('');
    // const [albumCover, setAlbumCover] = useState(null);
    // const [albumCoverPreview, setAlbumCoverPreview] = useState(null);
    // const [graduationDate, setGraduationDate] = useState(null);
    const [album, setAlbum] = useState({}); // 객체 형태로 변경
    const params = useParams();
    const navigate = useNavigate();
    const [graduationDate, setGraduationDate] = useState(dayjs(new Date()));

    useEffect(() => {
      axios.get(`https://congraduation.me/backapi/albums/${params.PK}`)
        .then(response => {
          console.log('Album Data:', response.data);
          setAlbum(response.data);
          setNickname(response.data.nickname);
          setGraduationPlace(response.data.graduationPlace);
          setTitle(response.data.title);
        })
        .catch(error => {
          console.error('Error fetching album data:', error);
        });
    }, [params.PK]); // params.PK 값이 변경될 때마다 useEffect 호출
  
    const gotoAlbumPage = () => {
      navigate(`/albums/${params.PK}`);
    }

    const handleSaveAlbumSettings = async () => {
      try {
        const userInfo = {
          nickname: nickname,
          graduationPlace: graduationPlace,
          title: title
        };
  
        const accessToken = localStorage.getItem('accessToken');

        axios.put(`https://congraduation.me/backapi/albums/${params.PK}`, userInfo, {
          headers: {
            'accessToken': accessToken,
          },
        }).then(response => {
          console.log(response.data);
          gotoAlbumPage();
        }).catch(error => {
          console.log('실패');
        })
  
      } catch (error) {
        console.error('전송 실패 :', error);
      }
    };

    const handleSaveGraduationDateSettings = async () => {
      
      try {
        if(!window.confirm("확정 시, 수정 불가합니다.")){
           return;
        }
  
        const accessToken = localStorage.getItem('accessToken');
        const dateFormat = dayjs(graduationDate).format("YYYYMMDD");
        console.log("데이트포맷 : " + dateFormat)
          const payload = {
              graduationDate: dateFormat
          }
          console.log(payload)
          axios.put(`https://congraduation.me/backapi/albums/${params.PK}/graduationDate`, payload, {
            headers : {
              'accessToken' : localStorage.getItem('accessToken'),
              'Content-Type': 'application/json',
            },
        }).then(response => {
          console.log(response.data);
          // window.location.reload();
          gotoAlbumPage();
        }).catch(error => {
          console.log('실패' + error);
        })
  
      } catch (error) {
        console.error('전송 실패 :', error);
      }
    };

    
    
    // console.log("현재 날짜는 " + dateFormat);

    console.log(album)

    return (
      <div
        style={{
          marginTop: '80px',
          marginBottom: '80px',
          marginLeft: '20px',
          marginRight: '20px',
          width: '300px', // 너비
          height: '600px', // 높이
          borderRadius: '10px', // 모서리 반경
          backgroundColor: 'rgba(255, 255, 255, 1)', // 희미한 흰색 배경
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', // 그림자
          display: 'flex',
          flexDirection: 'column', // 세로 방향으로 배치
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 15px' }}>
          <div>계정 설정</div>
          <HomeIcon fontSize='large' onClick={gotoAlbumPage} />
        </div>
        <div >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 15px' }}>
            <StyledTypography variant="h6" gutterBottom>{album.nickname}님</StyledTypography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', padding: '0 15px', marginTop: '10px'}}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
              <div>Nickname</div>
              <TextField
                id="outlined-size-small"
                value={nickname}
                // size="normal"
                width="100%S"
                onChange={(e) => setNickname(e.target.value)}
                margin="dense"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
              <div>Graduation Place</div>
              <TextField
                id="outlined-size-small"
                value={graduationPlace}
                size="normal"
                onChange={(e) => setGraduationPlace(e.target.value)}
                margin="dense"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
              <div>Title</div>  
              <TextField
                id="outlined-size-small"
                value={title}
                size="normal"
                onChange={(e) => setTitle(e.target.value)}
                margin="dense"
              />
            </div>
            <Box textAlign="center" marginTop={2}>
              <Button variant="contained" color="primary" onClick={handleSaveAlbumSettings}>
                Save
              </Button>
            </Box>
            {album.openAt === null ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', marginTop: '30px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Graduation Date"
                value={graduationDate}
                onChange={(newValue) => setGraduationDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" fullWidth margin="normal" />
                )}
              />
            </LocalizationProvider>
            <Box textAlign="center" marginTop={2}>
              <Button variant="contained" color="primary" onClick={handleSaveGraduationDateSettings}>
                Save
              </Button>
            </Box>
            </div> : <div/>} 
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
