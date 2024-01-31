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

    useEffect(() => {
      axios.get(`https://congraduation.me/backapi/albums/${params.PK}`)
        .then(response => {
          console.log('Album Data:', response.data);
          setAlbum(response.data);
        })
        .catch(error => {
          console.error('Error fetching album data:', error);
        });
    }, [params.PK]); // params.PK 값이 변경될 때마다 useEffect 호출
  
    const gotoAlbumPage = () => {
      navigate(`/albums/${params.PK}`);
    }

    const handleSaveSettings = async () => {
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

    return (
      <div
        style={{
          marginTop: '80px',
          marginBottom: '80px',
          marginLeft: '20px',
          marginRight: '20px',
          width: '250px', // 너비
          height: '500px', // 높이
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
            <div variant="h6" gutterBottom>{album.nickname} 님</div>
            {album.imageUrl ? (
              <StyledImg src={album.imageUrl} alt="Album Cover" />
            ) : (
              <StyledImg src={userAltImage} alt="User Alt Image" width={'30px'} height={'30px'} />
            )}
          </div>
          <Box>
            <div>
              <div>Nickname</div>
              <TextField
                label="Nickname"
                id="outlined-size-small"
                defaultValue={album.nickname}
                size="small"
                onChange={(e) => setNickname(e.target.value)}
                margin="normal"
              />
            </div>
            <div>
              <div>Graduation Place</div>
              <TextField
                label={album.graduationPlace}
                variant="outlined"
                fullWidth
                value={graduationPlace}
                onChange={(e) => setGraduationPlace(e.target.value)}
                margin="normal"
              />
            </div>
            <div>
              <div>Title</div>
              <TextField
                label={album.title}
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
              />
            </div>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Graduation Date"
                value={graduationDate}
                onChange={(newValue) => setGraduationDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" fullWidth margin="normal" />
                )}
              />
            </LocalizationProvider> */}
            <Box textAlign="center" marginTop={2}>
              <Button variant="contained" color="primary" onClick={handleSaveSettings}>
                Save
              </Button>
            </Box>
          </Box>
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
