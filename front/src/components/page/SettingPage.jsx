import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import StyledContainer from '../styledComponents/StyledContainer';
import HomeIcon from '@mui/icons-material/Home';
import StyledImg from '../styledComponents/StyledImg';
import StyledTypography from '../styledComponents/StyledTypography';
import userAltImage from '../images/userAltImage.png'; // 이미지 파일의 경로를 import 합니다.


const SettingsPage = () => {
  // const [nickname, setNickname] = useState('');
  // const [graduationPlace, setGraduationPlace] = useState('');
  // const [title, setTitle] = useState('');
  // const [albumCover, setAlbumCover] = useState(null);
  // const [albumCoverPreview, setAlbumCoverPreview] = useState(null);
  // const [graduationDate, setGraduationDate] = useState(null);
  // const [album, setAlbum] = useState({}); // 객체 형태로 변경
  // const params = useParams();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get(`https://congraduation.me/backapi/albums/${params.PK}`)
  //     .then(response => {
  //       console.log('Album Data:', response.data);
  //       setAlbum(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching album data:', error);
  //     });
  // }, [params.PK]); // params.PK 값이 변경될 때마다 useEffect 호출

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setAlbumCoverPreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  //   setAlbumCover(file);
  // };

  // const gotoAlbumPage = () => {
  //   navigate(`/albums/${params.PK}`);
  // }

  const RoundedRectangle = () => {

    const [nickname, setNickname] = useState('');
    const [graduationPlace, setGraduationPlace] = useState('');
    const [title, setTitle] = useState('');
    const [albumCover, setAlbumCover] = useState(null);
    const [albumCoverPreview, setAlbumCoverPreview] = useState(null);
    const [graduationDate, setGraduationDate] = useState(null);
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
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAlbumCoverPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
      setAlbumCover(file);
    };
  
    const gotoAlbumPage = () => {
      navigate(`/albums/${params.PK}`);
    }
  
    const handleSaveSettings = async () => {
      try {
        const userInfo1 = {
          nickname: nickname,
          graduationPlace: graduationPlace,
          title: title
        };
  
        const userInfo2 = {
          graduationDate: graduationDate,
        };
  
        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify(userInfo1)], { type: 'application/json' }))
        formData.append('image', albumCover);
        formData.append('data', new Blob([JSON.stringify(userInfo2)], { type: 'application/json' }))
  
        const accessToken = localStorage.getItem('accessToken');
  
        axios.put(`https://congraduation.me/backapi/albums/${params.PK}`, formData, {
          headers: {
            'accessToken': accessToken,
          },
        }).then(response => {
          console.log(response.data);
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
          <StyledTypography>계정 설정</StyledTypography>
          <HomeIcon fontSize='large' onClick={gotoAlbumPage} />
        </div>
        <div >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 15px' }}>
            <StyledTypography variant="h6" gutterBottom>{album.nickname}님</StyledTypography>
            {album.imageUrl ? (
              <StyledImg src={album.imageUrl} alt="Album Cover" />
            ) : (
              <StyledImg src={userAltImage} alt="User Alt Image" width={'30px'} height={'30px'} />
            )}
          </div>
          <Box>
            <TextField
              label="Nickname"
              variant="outlined"
              fullWidth
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Graduation Place"
              variant="outlined"
              fullWidth
              value={graduationPlace}
              onChange={(e) => setGraduationPlace(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ marginBottom: '16px' }}
            />
            {albumCoverPreview && (
              <Box>
                <Typography>Preview:</Typography>
                <img
                  src={albumCoverPreview}
                  alt="Album Cover Preview"
                  style={{ maxWidth: '100%', height: 'auto', marginTop: '8px' }}
                />
              </Box>
            )}
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
              <Button variant="contained" color="primary" onClick={handleSaveSettings}>
                Save
              </Button>
            </Box>
          </Box>
        </div>
      </div>
    );
  };

  // const handleSaveSettings = async () => {
  //   try {
  //     const userInfo1 = {
  //       nickname: nickname,
  //       graduationPlace: graduationPlace,
  //       title: title
  //     };

  //     const userInfo2 = {
  //       graduationDate: graduationDate,
  //     };

  //     const formData = new FormData();
  //     formData.append('data', new Blob([JSON.stringify(userInfo1)], { type: 'application/json' }))
  //     formData.append('image', albumCover);
  //     formData.append('data', new Blob([JSON.stringify(userInfo2)], { type: 'application/json' }))

  //     const accessToken = localStorage.getItem('accessToken');

  //     axios.put(`https://congraduation.me/backapi/albums/${params.PK}`, formData, {
  //       headers: {
  //         'accessToken': accessToken,
  //       },
  //     }).then(response => {
  //       console.log(response.data);
  //     }).catch(error => {
  //       console.log('실패');
  //     })

  //   } catch (error) {
  //     console.error('전송 실패 :', error);
  //   }
  // };

  return (
    <StyledContainer>
      <RoundedRectangle />
      {/* <Box>
        <TextField
          label="Nickname"
          variant="outlined"
          fullWidth
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Graduation Place"
          variant="outlined"
          fullWidth
          value={graduationPlace}
          onChange={(e) => setGraduationPlace(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: '16px' }}
        />
        {albumCoverPreview && (
          <Box>
            <Typography>Preview:</Typography>
            <img
              src={albumCoverPreview}
              alt="Album Cover Preview"
              style={{ maxWidth: '100%', height: 'auto', marginTop: '8px' }}
            />
          </Box>
        )}
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
          <Button variant="contained" color="primary" onClick={handleSaveSettings}>
            Save
          </Button>
        </Box>
      </Box> */}
    </StyledContainer>
  );
};

export default SettingsPage;
