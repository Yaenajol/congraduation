import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

const SettingsPage = () => {
  const [nickname, setNickname] = useState('');
  const [institution, setInstitution] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [albumCover, setAlbumCover] = useState('');
  const [graduationDate, setGraduationDate] = useState(null);

  const handleSaveSettings = () => {
    // 이 부분에서 설정을 저장하거나 처리하는 로직을 추가할 수 있습니다.
    console.log('Settings saved:', { nickname, institution, albumName, albumCover, graduationDate });
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
        <TextField
          label="앨범 커버 사진"
          variant="outlined"
          fullWidth
          value={albumCover}
          onChange={(e) => setAlbumCover(e.target.value)}
          margin="normal"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="졸업 일자"
            value={graduationDate}
            onChange={(newValue) => setGraduationDate(newValue)}
            renderInput={(params) => <TextField {...params} variant="outlined" fullWidth margin="normal" />}
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




// import React, { useState } from 'react';
// import { TextField, Button, Box, Typography, Container } from '@mui/material';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
// import axios from 'axios';

// const SettingsPage = () => {
//   const [nickname, setNickname] = useState('');
//   const [institution, setInstitution] = useState('');
//   const [albumName, setAlbumName] = useState('');
//   const [albumCover, setAlbumCover] = useState('');
//   const [graduationDate, setGraduationDate] = useState(null);

//   const handleSaveSettings = async () => {
//     try {
//       const response = await axios.put('YOUR_REST_API_ENDPOINT', {
//         nickname,
//         institution,
//         albumName,
//         albumCover,
//         graduationDate,
//       });

//       console.log('Settings saved:', response.data);
//     } catch (error) {
//       console.error('Error saving settings:', error);
//     }
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
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <DatePicker
//             label="졸업 일자"
//             value={graduationDate}
//             onChange={(newValue) => setGraduationDate(newValue)}
//             renderInput={(params) => (
//               <TextField {...params} variant="outlined" fullWidth margin="normal" />
//             )}
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
