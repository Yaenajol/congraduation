import React, { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { isLoginAtom } from "../store/atom";
import axios from "axios";

function RedirectPage() {
  const navigate = useNavigate();
  const [authCode, setAuthCode] = useState(null);
  const [data, setData] = useState(null);
  const code = new URL(window.location.href);
  const kakaoCode = code.searchParams.get("code");
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom)

  useEffect(() => {
    setAuthCode(kakaoCode); // 인가 코드 상태 업데이트
    sendAuthCodeToBackend(kakaoCode); // 백엔드에 인가 코드 전송
  }, []);

  async function sendAuthCodeToBackend(authCode) {
    const apiUrl = `https://congraduation.me/backapi/kakao/callback?code=${authCode}`; // 백엔드 API URL
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authCode }), // 인가 코드를 JSON 형태로
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json(); // 백엔드에서 보낸 응답을 JSON 형태로 변환
      console.log(result);
      setData(result); // 응답 데이터를 상태에 저장
      localStorage.setItem( 'albumPK' , result.albumPk)
      localStorage.setItem( 'accessToken' , result.accessToken)
      setIsLogin(true)
    
      // axios.get(`https://congraduation.me/backapi/albums/${result.albumPk}`)
      //    .then(response => {
      //      console.log('Album Data:', response.data);    
      //    });
      console.log(isLogin)
      navigate(`/albums/${result.albumPk}`);
    } catch (error) {
      console.error("There was a problem sending the auth code:", error);
    }
  }

  return (
    <div>
      <h1>Auth Code: {authCode}</h1>

      <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
    </div>
  );
}

export default RedirectPage; 