import React from 'react'
// import { useNavigate } from 'react-router-dom'

import "./AllPage.css" ;

// 내부 경로
import Main from "../../assets/Main.jpg"
import KakaoLoginButton from '../button/KakaoLoginButton';
import Title from '../text/Title';

function HomePage() {

  const REST_API_KEY = "84ab5e5983965b20edb2ba58cbf759b9";    // 박성인 api key ( 추후에 백엔드와 협의 후 바꿔야 함 )
  const REDIRECT_URI = 	"http://localhost:3000/kakao/oauth";

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`

  const LoginHandler = () => {
    window.location.href = KAKAO_AUTH_URL
  }
  
  
  return (
    <div className='container'>
      <div className='box'>
        <br></br>
        <br></br>
        <br></br>
        <h1 className='csstitle'>얘들아 나 졸업해!!</h1>
        {/* <Title text={"얘들아 나 졸업해"} className ='csstitle' /> */}
        <br></br>
        <br></br>
        <img src={Main} alt="logo"></img>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <li className='kakaobutton'>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM+SURBVHgB7ZdfSFNRHMd/59xNN2NgPVS4fw/6kvpSVhCJ/SMoHwKLPQWFgdJjbxURSNAfqIfoz0NETxIE1WMP/ZGGudayPySm6ENzG5sa4XRT29zdOf1udefm3fRO3a7gPnA5v/Pv3u/9nT+/cwBKlNAWAsugvaFB3z8xcYCK4i6gtBYYq8ZiMxCy6f87J9EeRWOME9JPCekyJZO9L/z+MORJXgL3W631CUJOYafTmN0M+RHBfq8J53e6A4FutZ1UCTxotVbHKb1AGGtFzwiwUjj36Bg75wwGPyzVdEmBTTbbeUbIJXypCVYXhs9dbjRedg0NRXM1yimwoaqqwqjT3UazDQoICugVDYYW9/BwMEe9kqM1NeXTicRjzvkJKAK4iAaNAIde+nyjirpsHVDctWKJk2Ccb5vh/Okei8W4sE4x4RstliO4EO5D8bHpCBF9U1PO9MKMIXbU1ZWNTU9/Re/VgjbM4nDXd/t8XrkgY4jHotFjGoqTqOCMZSzKhXOwFTQGI09rR5qulOFwOAQOsBO0Z+sbm227nEkJHPV47JB/+CoIXBCqZTslEKPFFlgj0GSyLGXLBgbxCKwRiCDMyfa8B83mHxhvRVgLMPZLNlMC3W73b0LIR9CeGE0k+uRMxjaDq/gVaI/LGQopPSiBm/RDTGZBSyi9lZ7NiMWBSCRqr6w0oLkPtIAQT4/PdzG9SHGaYQbDTWz4HYpPOMH5Gfg70+ZRCJROt1joQJE/oUjg90TcWto9fv9AljoleJoY1HPejEedEBSeGDrj7Duv91m2Spqr11u//7Og10tz8QsUCkJCuCha0CGPcjVZ9IY2Eg5PmE2mTtwf5/DZgUUGWAVwkjH0zD0Wj590BYPfFmur+l68124/juHwOawA/FgcY34nRooHrkDgk5o+OlAJvnxZB1nsJ226XYxSD/7gE1eWi9FiqBfI+WGuLI7hc4NQ6sS0Ejf6DdiO4rwS8SIUKWdsqCkQ8Hb8uwMvC1VD3GizbcREurem37qkxdPeg4sJCghV0yjJ+W6YFzeHHruSZKyx0OIkVA2xQEizlKK7B0RC2twjI++hSKibg4RUoauvTsZi1/vGx2egRIl1xB/FvCXQvkz0kAAAAABJRU5ErkJggg==" className='kakaoballoon'></img>
          {/* <KakaoLoginButton text={"카카오 로그인 버튼"} onClick={LoginHandler}/> */}
          <h4 onClick={LoginHandler}>카카오 계정 로그인</h4>
          {/* <button onClick={LoginHandler}>kakao 로그인</button> */} 
        </li>

      </div>

    </div>
  )
}

export default HomePage