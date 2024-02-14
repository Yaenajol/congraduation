import { useEffect } from 'react'

export default function KakaoShare({ShareUrl}) {

  const kakaoButton = () => {
    const requestUrl =  ShareUrl;
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '얘들아 나 졸업해!!',
        description: '나만의 졸업앨범을 어쩌고 저쩌고',
        imageUrl: 'https://ifh.cc/g/O5Yb9r.png',
        link: {
          mobileWebUrl: requestUrl,
          webUrl: requestUrl
        }
      }
    });
  };
	
	return (
		<button id='kakaotalk-sharing-btn' onClick={kakaoButton}>KakaoShare</button>
	)
}