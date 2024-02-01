// 설정  버튼
import * as React from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import DehazeRoundedIcon from '@mui/icons-material/DehazeRounded';

import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { isLoginAtom } from "../store/atom";
import { useNavigate, useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function MenuIntroduction({zin}) {
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom)
  const navigate = useNavigate()
  const params = useParams()
  const [settingdata, setSettingdata] = useState("")
  console.log(zin)

  
  useEffect(() => {
    if(!zin){
      axios
      .get(`https://congraduation.me/backapi/members/myAlbum`,
      { headers: { accessToken: sessionStorage.accessToken }})
      .then(response => {
        console.log('Album Data:', response.data);
        
        setSettingdata(response.data)
      })
    }
  },[])

  const createHandleMenuClick = (menuItem) => {

    
    return () => {

      if (menuItem === 'Log out') {
        sessionStorage.removeItem('accessToken')
        setIsLogin(false)
        navigate('/')
      } else if (menuItem === 'Profile' ) {
        navigate(`/myalbum/setting` , { state : settingdata})
      } else if (menuItem === 'Inquiry') {
        console.log('아직 개발 안함')
      }
      
    };
  };

  return (
    <Dropdown>
      <MenuButton >
      <DehazeRoundedIcon/>
      </MenuButton>
      <Menu slots={{ listbox: Listbox }}>
        {!zin ? <MenuItem  onClick={createHandleMenuClick('Profile')}>앨범 설정</MenuItem>: null}
        <MenuItem onClick={createHandleMenuClick('Inquiry')}>
          1:1 문의
        </MenuItem>
        {isLogin? <MenuItem onClick={createHandleMenuClick('Log out')}>로그 아웃</MenuItem> : null}
        
      </Menu>
    </Dropdown>
  );
}

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  z-index: 1;
  `,
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }
  `,
);