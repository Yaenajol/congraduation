import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";



// 내부 경로
import LoginPage from "./components/page/LoginPage";
import AlbumPage from "./components/page/AlbumPage"
import MemoryUpload from "./components/page/MemoryUpload"
import ModalPage from "./components/page/ModalPage"
import RedirectPage from "./components/page/RedirectPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/album" element={<AlbumPage />} />
        <Route path="/album/edit" element={<MemoryUpload />} />
        <Route path="/kakao/oauth" element={<RedirectPage />} />
        <Route path="/modal" element={<ModalPage />}/>
        <Route path="*" element={<Navigate replace to="/kakao/oauth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
