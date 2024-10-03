import React, { useState } from "react";
import "../../css/contentPage.css";
import searchMusicApi from "./searchMusicApi";

export default function SubSearchDisplay() {
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가

  const handleSearch = (e) => {
    e.preventDefault();

    // searchQuery.trim()이 빈 문자열인지 확인
    if (searchQuery.trim() === "") {
      alert("검색어를 입력하세요."); // 아무 것도 입력되지 않았을 때의 처리
    } else {
      // 가수-제목 또는 가수 - 제목 형식 확인
      const regex = /^[^\s-]+ ?- ?[^\s-]+$/; // 공백이 있을 수 있고, -로 구분된 두 단어를 요구하는 정규 표현식
      if (!regex.test(searchQuery)) {
        alert(
          "형식이 올바르지 않습니다. \n'가수-제목' 또는 '가수 - 제목' 형태로 입력해 주세요."
        ); // 형식이 맞지 않을 때의 처리
      } else {
        // searchMusicApi 호출
        // searchMusicApi(artist.trim(), title.trim()); // 트림하여 공백 제거
      }
    }
  };

  return (
    <div className="subSearchDisplay">
      <div className="vector-image"></div>
      <div className="sub-logo"></div>

      <form className="sub-search-box" onSubmit={handleSearch}>
        {/* 검색창 */}
        <input
          className="sub-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            fontSize: "25px",
          }}
        />
        <button type="submit" className="sub-search-bt"></button>
      </form>
    </div>
  );
}
