import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import background3 from "../images/background3.png";

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundPosition: "center top",
  backgroundRepeat: "no-repeat",
  maxWidth: "1080px",
  // height:'100vh',
  // background: 'linear-gradient(pink, #fffafa 55%)'
  backgroundImage: `url(${background3})`, // 배경 이미지 추가
  backgroundSize: "cover", // 배경 이미지를 화면에 꽉 채우도록 설정
  // background: 'linear-gradient(#fffafa 55%, pink);'
}));

export default StyledContainer;
