// react
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

// recoil
import { useRecoilState } from 'recoil';
import { isLoginAtom } from "../store/atom";

// css
import "./AllPage.css";
import StyledMemoryPage1 from "../styledComponents/StyledMemoryPage1";

// image
import logo from "../images/logo.png"



function HomePage() {
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom)
  
  const navigate = useNavigate()
  
  const LoginHandler = () => {
    window.location.href = "https://congraduation.me/backapi/kakao/redirect";
  };                                                                    
  
  useEffect(() => {
    if (isLogin) {
      navigate(`/myalbum`)
    }
  },[])

 
  return (
    <StyledMemoryPage1>
        <br></br>
        <br></br>
        <br></br>

        <br></br>
        <h1 className="csstitle">
          <span> 얘 </span>
          <span> </span>
          <span> 들 </span>
          <span> 아 </span>
          <span> </span>
          <span> 나 </span>
          <span> </span>
          <span> 졸 </span>
          <span> 업 </span>
          <span> 해 </span>
          <span> !  </span>
          <span> ! </span>
          {/* <span>!</span> */}
        </h1>
        <br></br>
        
        <h4 className="instatext">모두에게 알리는 졸업 소식</h4>
        <h4 className="instatext">사진으로 함께 나누는 기쁨</h4>
        <br></br>
        <br></br>
        <br></br>

        <img src={logo} className="logo" alt="logo" />


        <br></br>
        <br></br>
        <br></br>

        <li className="kakaobutton" onClick={LoginHandler}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM+SURBVHgB7ZdfSFNRHMd/59xNN2NgPVS4fw/6kvpSVhCJ/SMoHwKLPQWFgdJjbxURSNAfqIfoz0NETxIE1WMP/ZGGudayPySm6ENzG5sa4XRT29zdOf1udefm3fRO3a7gPnA5v/Pv3u/9nT+/cwBKlNAWAsugvaFB3z8xcYCK4i6gtBYYq8ZiMxCy6f87J9EeRWOME9JPCekyJZO9L/z+MORJXgL3W631CUJOYafTmN0M+RHBfq8J53e6A4FutZ1UCTxotVbHKb1AGGtFzwiwUjj36Bg75wwGPyzVdEmBTTbbeUbIJXypCVYXhs9dbjRedg0NRXM1yimwoaqqwqjT3UazDQoICugVDYYW9/BwMEe9kqM1NeXTicRjzvkJKAK4iAaNAIde+nyjirpsHVDctWKJk2Ccb5vh/Okei8W4sE4x4RstliO4EO5D8bHpCBF9U1PO9MKMIXbU1ZWNTU9/Re/VgjbM4nDXd/t8XrkgY4jHotFjGoqTqOCMZSzKhXOwFTQGI09rR5qulOFwOAQOsBO0Z+sbm227nEkJHPV47JB/+CoIXBCqZTslEKPFFlgj0GSyLGXLBgbxCKwRiCDMyfa8B83mHxhvRVgLMPZLNlMC3W73b0LIR9CeGE0k+uRMxjaDq/gVaI/LGQopPSiBm/RDTGZBSyi9lZ7NiMWBSCRqr6w0oLkPtIAQT4/PdzG9SHGaYQbDTWz4HYpPOMH5Gfg70+ZRCJROt1joQJE/oUjg90TcWto9fv9AljoleJoY1HPejEedEBSeGDrj7Duv91m2Spqr11u//7Og10tz8QsUCkJCuCha0CGPcjVZ9IY2Eg5PmE2mTtwf5/DZgUUGWAVwkjH0zD0Wj590BYPfFmur+l68124/juHwOawA/FgcY34nRooHrkDgk5o+OlAJvnxZB1nsJ226XYxSD/7gE1eWi9FiqBfI+WGuLI7hc4NQ6sS0Ejf6DdiO4rwS8SIUKWdsqCkQ8Hb8uwMvC1VD3GizbcREurem37qkxdPeg4sJCghV0yjJ+W6YFzeHHruSZKyx0OIkVA2xQEizlKK7B0RC2twjI++hSKibg4RUoauvTsZi1/vGx2egRIl1xB/FvCXQvkz0kAAAAABJRU5ErkJggg=="
            className="kakaoballoon"
            alt="no img"
          ></img>
          <h4 >카카오 계정 로그인</h4>
        </li>
        <br></br>
        <br></br>

    </StyledMemoryPage1>
  );
}

export default HomePage;
