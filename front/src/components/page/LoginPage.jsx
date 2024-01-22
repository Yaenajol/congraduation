import React from 'react'
// import { useNavigate } from 'react-router-dom'


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
    <div>
      {/* <h1>얘들아 나 졸업해</h1> */}
      <Title text={"얘들아 나 졸업해"}/>
      <img src={Main} alt="logo"></img>
      <br></br>
      <KakaoLoginButton text={"카카오 로그인 버튼"} onClick={LoginHandler}/>
      {/* <button onClick={LoginHandler}>kakao 로그인</button> */}
    </div>
  )
}

export default HomePage