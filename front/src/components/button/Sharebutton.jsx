import { useEffect } from 'react'

export default function KakaoShare({ShareUrl}) {

  const kakaoButton = () => {
    // console.log(albumPk.albumPk)
    const requestUrl =  ShareUrl;
    console.log(requestUrl)
    window.Kakao.Share.sendScrap({
      requestUrl,
    });
  };
	
	return (
		<button id='kakaotalk-sharing-btn' onClick={kakaoButton}>KakaoShare</button>
	)
}