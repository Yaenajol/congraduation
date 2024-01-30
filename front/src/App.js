import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";



// 내부 경로
import LoginPage from "./components/page/LoginPage";
import AlbumPage from "./components/page/AlbumPage"
import MemoryUpload from "./components/page/MemoryUpload"

import RedirectPage from "./components/page/RedirectPage";
import SettingsPage from "./components/page/SettingPage";
import TestPage from "./components/page/TestPage"
import DragPage from "./components/page/DragPage";
// outlet을 통해서 컴포넌트를 특정 페이지에서 안보이게 하기위한 코드 
import AlbumLayout from "./AlbumLayout";


function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/test" element={<TestPage/>}/>
        <Route path="/" element={<LoginPage />} />
        <Route path='/albums/:PK' element={<AlbumPage />} />
        <Route path="/albums/setting" element={<SettingsPage />} />
        <Route path="/albums/edit" element={<MemoryUpload />} />
        <Route path="/kakao/oauth" element={<RedirectPage />} />
        <Route path="/albums/drag" element={<DragPage/>} />
        {/* 이부분은 NAVBAR가 보이는 곳 ( 추가하려면 Route안에 주소를 추가하면됨 ) */}
        {/* <Route element={<AlbumLayout />}>
          <Route path="/albums" element={<AlbumPage />} />  
          
        </Route> */}
        
        
        <Route path="*" element={<Navigate replace to="/kakao/oauth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
