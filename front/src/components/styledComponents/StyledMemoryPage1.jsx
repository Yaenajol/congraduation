import {styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import background3 from '../images/background3.png';

const StyledContainer = styled(Box)(({ theme }) => ({
    
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // marginTop: theme.spacing(2),
    backgroundImage: `url(${background3})`, // 배경 이미지 추가
    backgroundSize: 'cover', // 배경 이미지를 화면에 꽉 채우도록 설정
    height:'100vh'
}));

export default StyledContainer;
