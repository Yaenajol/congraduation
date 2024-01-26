import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';

const SettingsPage = () => {
  const [nickname, setNickname] = useState('');
  const [institution, setInstitution] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [albumCover, setAlbumCover] = useState(null);
  const [albumCoverPreview, setAlbumCoverPreview] = useState(null); // 이미지 미리보기를 위한 상태
  const [graduationDate, setGraduationDate] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // 이미지 미리보기 업데이트
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAlbumCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }

    setAlbumCover(file);
  };

  const handleSaveSettings = async () => {
    try {
      const formData = new FormData();
      formData.append('nickname', nickname);
      formData.append('institution', institution);
      formData.append('albumName', albumName);
      formData.append('albumCover', albumCover);
      formData.append('graduationDate', graduationDate);

      const response = await axios.put('YOUR_REST_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Settings saved:', response.data);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Settings
      </Typography>
      <Box>
        <TextField
          label="닉네임"
          variant="outlined"
          fullWidth
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          margin="normal"
        />
        <TextField
          label="기관 설정"
          variant="outlined"
          fullWidth
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          margin="normal"
        />
        <TextField
          label="앨범 이름"
          variant="outlined"
          fullWidth
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
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
            <Typography>미리보기:</Typography>
            <img
              src={albumCoverPreview}
              alt="Album Cover Preview"
              style={{ maxWidth: '100%', height: 'auto', marginTop: '8px' }}
            />
          </Box>
        )}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="졸업 일자"
            value={graduationDate}
            onChange={(newValue) => setGraduationDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" fullWidth margin="normal" />
            )}
          />
        </LocalizationProvider>
        <Box textAlign="center" marginTop={2}>
          <Button variant="contained" color="primary" onClick={handleSaveSettings}>
            저장
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SettingsPage;

// const SettingsPage = () => {
//   const [nickname, setNickname] = useState('');
//   const [institution, setInstitution] = useState('');
//   const [albumName, setAlbumName] = useState('');
//   const [albumCover, setAlbumCover] = useState('');
//   const [graduationDate, setGraduationDate] = useState(null);

//   const handleSaveSettings = () => {
//     // 이 부분에서 설정을 저장하거나 처리하는 로직을 추가할 수 있습니다.
//     console.log('Settings saved:', { nickname, institution, albumName, albumCover, graduationDate });
//   };

//   return (
//     <Container>
//       <Typography variant="h4" align="center" gutterBottom>
//         Settings
//       </Typography>
//       <Box>
//         <TextField
//           label="닉네임"
//           variant="outlined"
//           fullWidth
//           value={nickname}
//           onChange={(e) => setNickname(e.target.value)}
//           margin="normal"
//         />
//         <TextField
//           label="기관 설정"
//           variant="outlined"
//           fullWidth
//           value={institution}
//           onChange={(e) => setInstitution(e.target.value)}
//           margin="normal"
//         />
//         <TextField
//           label="앨범 이름"
//           variant="outlined"
//           fullWidth
//           value={albumName}
//           onChange={(e) => setAlbumName(e.target.value)}
//           margin="normal"
//         />
//         <TextField
//           label="앨범 커버 사진"
//           variant="outlined"
//           fullWidth
//           value={albumCover}
//           onChange={(e) => setAlbumCover(e.target.value)}
//           margin="normal"
//         />
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DatePicker
//             label="졸업 일자"
//             value={graduationDate}
//             onChange={(newValue) => setGraduationDate(newValue)}
//             renderInput={(params) => <TextField {...params} variant="outlined" fullWidth margin="normal" />}
//           />
//         </LocalizationProvider>
//         <Box textAlign="center" marginTop={2}>
//           <Button variant="contained" color="primary" onClick={handleSaveSettings}>
//             저장
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default SettingsPage;




