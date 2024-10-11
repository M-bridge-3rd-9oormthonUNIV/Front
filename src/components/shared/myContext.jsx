// MyContext.js
import React, { createContext, useState } from 'react';

export const MyContext = createContext(); // Context 생성

export const MyProvider = ({ children }) => {
  const [originalLyrics, setOriginalLyrics] = useState();
  const [translatedLyrics, setTranslatedLyrics] = useState();
  const [galleryImageUrl, setGalleryImageUrl] = useState();
  const [lyricsState, setLyricsState] = useState();

  return (
    <MyContext.Provider value={{ originalLyrics, setOriginalLyrics, translatedLyrics, setTranslatedLyrics,galleryImageUrl,setGalleryImageUrl,lyricsState, setLyricsState }}>
      {children}
    </MyContext.Provider>
  );
};
