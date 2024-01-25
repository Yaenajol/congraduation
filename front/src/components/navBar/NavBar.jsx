
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

// mui 아이콘
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatIcon from '@mui/icons-material/Chat';

export default function SimpleBottomNavigation() {
  const [album, setAlbum] = useState([]);
  const navigate = useNavigate()

  const [value, setValue] = useState(0);
  
  const goToAlbum = () => {
    navigate('/albums')
  }

  const goToChatting = () => {
    navigate('/albums/edit')
  }

  const goToSettings = () => {
    navigate('/settings')
  }

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => goToAlbum()}/>
        <BottomNavigationAction label="chatting" icon={<ChatIcon />} onClick={() => goToChatting()}/>
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} onClick={() => goToSettings()}/>
      </BottomNavigation>
    </Box>
  );
}