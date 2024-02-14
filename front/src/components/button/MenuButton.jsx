import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from "react";
import axios from "axios";
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import { isLoginAtom } from "../store/atom";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export default function PositionedMenu({zin}) {
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
        navigate('/feedback');
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
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        style={{zIndex: 6, }}
      >
        {!zin ? (
          <MenuItem onClick={createHandleMenuClick("Profile")}>
            앨범 설정
          </MenuItem>
        ) : null}
        <MenuItem onClick={createHandleMenuClick("Inquiry")}>1:1 문의</MenuItem>
        {isLogin ? (
          <MenuItem onClick={createHandleMenuClick("Logout")}>
            로그 아웃
          </MenuItem>
        ) : null}
      </Menu>
    </div>
  );
}