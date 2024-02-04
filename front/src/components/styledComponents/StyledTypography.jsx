import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import "../../index.css";

const StyledTypography = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  fontSize: "3vh",
  color: "white",
  fontFamily: "TheJamsil2Light",
  fontWeight: "bold",
}));

export default StyledTypography;
