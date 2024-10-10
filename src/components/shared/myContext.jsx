// MyContext.js
import React, { createContext, useState } from 'react';

export const MyContext = createContext(); // Context 생성

export const MyProvider = ({ children }) => {
  const [originalLyrics, setOriginalLyrics] = useState();
  const [translatedLyrics, setTranslatedLyrics] = useState();

  return (
    <MyContext.Provider value={{ originalLyrics, setOriginalLyrics, translatedLyrics, setTranslatedLyrics }}>
      {children}
    </MyContext.Provider>
  );
};
