import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function RedirectPage() {
  const navigate = useNavigate()
  const [authCode, setAuthCode] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const code = new URL(window.location.href);
    const kakaoCode = code.searchParams.get("code");
    setAuthCode(kakaoCode);            // 인가 코드 상태 업데이트
    
    sendAuthCodeToBackend(kakaoCode);  // 백엔드에 인가 코드 전송
    console.log(authCode)
  }, []);

  const BACK_URL = 'https://congraduation.me/backapi'
  async function sendAuthCodeToBackend(authCode) {
    
    const apiUrl = `${BACK_URL}/kakao/callback?code=${authCode}`; // 백엔드 API URL
    try {
      const response = await axios.post(apiUrl, { authCode})
      //   // method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ authCode }), // 인가 코드를 JSON 형태로 
      // });
      if (response.status !==  200) {
        throw new Error(`HTTP error : ${response.status}`)
      }
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      const result = response.data // 백엔드에서 보낸 응답을 JSON 형태로 변환
      console.log(result);                  
      setData(result);                      // 응답 데이터를 상태에 저장
      

    } catch (error) {
      console.error('There was a problem sending the auth code:', error);
    }
  }
  
  useEffect(() => {
    if (data) {
      navigate(`${BACK_URL}/backapi/albums/${data.albumPk}`)
    }
  },[data,navigate])
  return (
    <div>
      <h1>Auth Code: {authCode}</h1>
      
      <pre>{data ? JSON.stringify(data, null, 2) : 'Loading...'}</pre>
    </div>
  );
}

export default RedirectPage;
