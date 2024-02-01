import {styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import background from '../images/background.png';
import background2 from '../images/background2.png';

const StyledContainer = styled(Box)(({ theme }) => ({
    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // marginTop: theme.spacing(2),
    backgroundImage: `url(${background2})`, // 배경 이미지 추가
    backgroundSize: 'cover', // 배경 이미지를 화면에 꽉 채우도록 설정
}));

export default StyledContainer;
