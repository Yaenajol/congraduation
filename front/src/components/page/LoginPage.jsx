import React from 'react'
import { useNavigate } from 'react-router-dom'


// 내부 경로
import Main from "../../assets/Main.jpg"

function HomePage() {

  const REST_API_KEY = "84ab5e5983965b20edb2ba58cbf759b9";    // 박성인 api key ( 추후에 백엔드와 협의 후 바꿔야 함 )
  const REDIRECT_URI = 	"http://localhost:3000/kakao/oauth";

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`

  const LoginHandler = () => {
    window.location.href = KAKAO_AUTH_URL
  }
  
  
  return (
    <div>
      <h1>얘들아 나 졸업해</h1>
      <img src={Main}></img>
      <br></br>
      <button onClick={LoginHandler}>kakao 로그인</button>
    </div>
  )
}

export default HomePage