import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { isLoginAtom } from "./components/store/atom";

// 내부 경로
import LoginPage from "./components/page/LoginPage";
import AlbumPage from "./components/page/AlbumPage"
import MemoryUpload from "./components/page/MemoryUpload"
import AlbumMyPage from "./components/page/AlbumMyPage";
import RedirectPage from "./components/page/RedirectPage";
import SettingsPage from "./components/page/SettingPage";
import DragPage from "./components/page/DragPage";
import FeedbackPage from "./components/page/FeedbackPage";
import FeedbackPage2 from "./components/page/FeedbackPage2";

function App() {
  const setIsLogin = useSetRecoilState(isLoginAtom)
  
  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken')
    if (typeof(accessToken) === typeof("")) {
      setIsLogin(true)
    }
  }, [setIsLogin])
 
  return ( 
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/albums/:PK' element={<AlbumPage />} />
        <Route path="/myalbum/setting" element={<SettingsPage />} />
        <Route path="/albums/:PK/edit" element={<MemoryUpload />} />
        <Route path="/kakao/oauth" element={<RedirectPage />} />
        <Route path="/albums/drag" element={<DragPage/>} />
        <Route path="/myalbum" element={<AlbumMyPage/>} />
        <Route path="/feedback" element={<FeedbackPage/>}/>
        
        {/* <Route path="/feedback" element={<FeedbackPage2/>}/> */}

        {/* 오류페이지 만들어야됨 */}
        <Route path="*" element={<Navigate replace to="/kakao/oauth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
