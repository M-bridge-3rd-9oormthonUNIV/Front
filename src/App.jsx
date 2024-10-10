import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage/homePage";
import MusicLyricsPage from "./components/homePage/musicLyricsPage";
import { createContext,useState } from "react";
import { MyProvider } from './components/shared/myContext'; // MyContext에서 MyProvider import


const App = () => {

  return (
    <MyProvider>
      <Router>
        <Routes>
          {/* 홈 페이지 */}
          <Route path="/" element={<HomePage />} />
          {/* 음악 가사 페이지 */}
          <Route path="/music-lyrics" element={<MusicLyricsPage />} />
        </Routes>
      </Router>
    </MyProvider>
  );
};

export default App;
