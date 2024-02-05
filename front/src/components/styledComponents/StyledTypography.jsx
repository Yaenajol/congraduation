import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import "../../index.css";

const StyledTypography = styled(Typography)(({ theme }) => ({
    textAlign: 'left',
    fontSize: '1.2rem',
    color: 'white',
    fontFamily: 'KyoboHand',
    // fontWeight: 'bold',
}));

export default StyledTypography;
