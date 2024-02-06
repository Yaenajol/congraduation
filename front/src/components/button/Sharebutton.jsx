import { useEffect } from 'react'

export default function KakaoShare() {
	useEffect(() => {
    kakaoButton()
  }, [])

  const kakaoButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao

      if (!kakao.isInitialized()) {
        kakao.init('af383ec5bb0eb61c3e696c2b66f15fb7')
      }

      kakao.Share.createDefaultButton({
        container: '#kakaotalk-sharing-btn',
        objectType: 'text',
        text: '링크 공유',
        link: {
          mobileWebUrl: 'https://localhost:3000',
          webUrl: 'https://localhost:3000',
        },   
      });
    }
  }
	
	return (
		<button id='kakaotalk-sharing-btn' onClick={kakaoButton}>KakaoShare</button>
	)
}