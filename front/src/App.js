import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import RouteChangeTracker from "./components/page/RouteChangeTracker";
// 내부 경로
import LoginPage from "./components/page/LoginPage";
import AlbumPage from "./components/page/AlbumPage";
import MemoryUpload from "./components/page/MemoryUpload";
import AlbumMyPage from "./components/page/AlbumMyPage";

import RedirectPage from "./components/page/RedirectPage";
import SettingsPage from "./components/page/SettingPage";
import DragPage from "./components/page/DragPage";
import { isLoginAtom } from "./components/store/atom";
import RollingPaper from "./components/page/RollingPaper";
import UnlinkRedirect from "./components/page/UnlinkRedirect";

function App() {
  const setIsLogin = useSetRecoilState(isLoginAtom);
  RouteChangeTracker();
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (typeof accessToken === typeof "") {
      setIsLogin(true);
    }
  }, [setIsLogin])

  return ( 
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path='/albums/:PK' element={<AlbumPage />} />
      <Route path="/myalbum/setting" element={<SettingsPage />} />
      <Route path="/albums/:PK/edit" element={<MemoryUpload />} />
      <Route path="/kakao/oauth" element={<RedirectPage />} />
      <Route path="/albums/drag" element={<DragPage/>} />
      <Route path="/myalbum" element={<AlbumMyPage/>} />
      <Route path="/myalbum/download" element={<RollingPaper/>}/>
      <Route path="/kakao/unlink" element={<UnlinkRedirect/>}/>

      {/* 오류페이지 만들어야됨 */}
      {/* <Route path="*" element={<Navigate replace to="/kakao/oauth" />} /> */}
    </Routes>
    
  );
}

export default App;
