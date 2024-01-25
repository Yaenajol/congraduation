import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";



// 내부 경로
import LoginPage from "./components/page/LoginPage";
import AlbumPage from "./components/page/AlbumPage"
import MemoryUpload from "./components/page/MemoryUpload"
import ModalPage from "./components/page/ModalPage"
import RedirectPage from "./components/page/RedirectPage";
import SettingsPage from "./components/page/SettingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/albums" element={<AlbumPage />} />
        <Route path="/albums/setting" element={<SettingsPage />} />
        <Route path="/albums/edit" element={<MemoryUpload />} />
        <Route path="/kakao/oauth" element={<RedirectPage />} />
        <Route path="/modal" element={<ModalPage />}/>
        <Route path="*" element={<Navigate replace to="/kakao/oauth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
