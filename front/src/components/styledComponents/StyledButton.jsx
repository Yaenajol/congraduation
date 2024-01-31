import {styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

export default StyledButton;