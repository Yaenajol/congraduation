import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from "react";
import axios from "axios";
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // 프로필 아이콘
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // 로그아웃 아이콘
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // 1:1 문의 아이콘
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'; // 회원 탈퇴 아이콘
import { isLoginAtom } from "../store/atom";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./MenuButton.css"
import ImageDownload from '../page/ImageDownload';

export default function PositionedMenu({zin, dummyData}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [settingdata, setSettingdata] = useState("");
  const API_URL = process.env.REACT_APP_BACKEND_API_URL
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!zin) {
      axios
        .get(`${API_URL}/members/myAlbum`, {
          headers: { accessToken: sessionStorage.accessToken },
        })
        .then((response) => {
          setSettingdata(response.data);
        });
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (menuItem) => {
    setAnchorEl(null);
  };
  const createHandleMenuClick = (menuItem) => {
    return () => {

      if (menuItem === 'Logout') {
        sessionStorage.removeItem('accessToken')
        setIsLogin(false)
        navigate('/')
      } else if (menuItem === 'Profile' ) {
        navigate(`/myalbum/setting` , { state : settingdata})
      } else if (menuItem === 'Inquiry') {
        window.location.href = 'https://www.instagram.com/yaenajol.official/'
      } else if (menuItem === 'Withdrawal') {
        console.log('회원탈퇴')
      } 
    };
  };
  return (
    <div style={{alignItems: "center", display:"flex"}}>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ backgroundColor: "rgba( 255, 255, 255, 0 )", border: "none" }}
      >
        <SettingsSuggestRoundedIcon fontSize="large" sx={{color:"white"}}/>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{zIndex: 6, }}
      >
        {!zin ? (
          <MenuItem onClick={createHandleMenuClick("Profile")}>
            <AccountCircleIcon fontSize="small" style={{marginRight: 20}} /> <p>앨범 설정</p>
          </MenuItem>
        ) : null}
        {!zin ? (
          <MenuItem  style={{justifyContent: 'space-between'}}>
           <ImageDownload images={dummyData} /> 
          </MenuItem>
        ) : null}
        <MenuItem onClick={createHandleMenuClick("Inquiry")}>
          <HelpOutlineIcon fontSize="small" style={{marginRight: 20}} /> <p>1:1 문의</p>
        </MenuItem>
        {isLogin ? (
          <MenuItem onClick={createHandleMenuClick("Logout")}>
            <ExitToAppIcon fontSize="small" style={{marginRight: 20}} /> <p>로그 아웃</p>
          </MenuItem>
        ) : null}
        <MenuItem onClick={createHandleMenuClick("Withdrawal")}>
          <DeleteForeverIcon fontSize="small" style={{marginRight: 20}} /> <p>회원 탈퇴</p>
        </MenuItem>
        
      </Menu>
    </div>
  );
}