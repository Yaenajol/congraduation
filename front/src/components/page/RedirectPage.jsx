// react
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// recoil
import { useRecoilState } from 'recoil';
import { isLoginAtom } from "../store/atom";

/**
 * 카카오 소셜 로그인 리디렉션 페이지 입니다.
 * @returns 
 */
function RedirectPage() {
  // 전역 상태 변수 목록
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom)

  // 상태 변수 목록
  const [authCode, setAuthCode] = useState(null);
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  const code = new URL(window.location.href);
  const kakaoCode = code.searchParams.get("code");
  
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
      sessionStorage.setItem( 'accessToken' , result.accessToken)
      setIsLogin(true)
    

      const localpk = sessionStorage.getItem('lookingPk');
      console.log(localpk);
      if (localpk) {
        navigate(`/albums/${localpk}`);
      } else {
        
        navigate(`/myalbum`);
      }
    } catch (error) {
      console.error("There was a problem sending the auth code:", error);
    }
  }

  return (
    <div>

    </div>
  );
}

export default RedirectPage; 