import {styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const StyledTypography = styled(Typography)(({ theme }) => ({
    textAlign: 'left',
    fontSize: '20px',
    marginTop: theme.spacing(1),
}));

export default StyledTypography;