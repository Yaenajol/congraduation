import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from 'recoil';

// 내부 경로
import LoginPage from "./components/page/LoginPage";
import AlbumPage from "./components/page/AlbumPage"
import MemoryUpload from "./components/page/MemoryUpload"
import AlbumMyPage from "./components/page/AlbumMyPage";

import RedirectPage from "./components/page/RedirectPage";
import SettingsPage from "./components/page/SettingPage";
import DragPage from "./components/page/DragPage";
// outlet을 통해서 컴포넌트를 특정 페이지에서 안보이게 하기위한 코드 
import AlbumLayout from "./AlbumLayout";
import { isLoginAtom } from "./components/store/atom";

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


        {/* 이부분은 NAVBAR가 보이는 곳 ( 추가하려면 Route안에 주소를 추가하면됨 ) */}
        {/* <Route element={<AlbumLayout />}>
          <Route path="/albums" element={<AlbumPage />} />  
          
        </Route> */}
        
        {/* 오류페이지 만들어야됨 */}
        <Route path="*" element={<Navigate replace to="/kakao/oauth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
