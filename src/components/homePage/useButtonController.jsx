import React, { useEffect, useState } from "react";

const useButtonController = () => {
  const [leftButtonPosition, setLeftButtonPosition] = useState(0);
  const [rightButtonPosition, setRightButtonPosition] = useState(0);
  const [leftSubPageVisible, setLeftSubPageVisible] = useState(false);
  const [rightSubPageVisible, setRightSubPageVisible] = useState(false);

  // 서브페이지 표시 여부 결정
  useEffect(() => {
    const limit = window.innerWidth * 0.7;
    setLeftSubPageVisible(leftButtonPosition >= limit);
    setRightSubPageVisible(rightButtonPosition >= limit);
  }, [leftButtonPosition, rightButtonPosition]);

  // 버튼 클릭 시 위치 설정
  const moveButton = (isLeft) => {
    const limit = window.innerWidth * 0.7;
    if (isLeft) {
      setLeftButtonPosition(leftButtonPosition === 0 ? limit : 0);
    } else {
      setRightButtonPosition(rightButtonPosition === 0 ? limit : 0);
    }
  };

  return {
    leftButtonPosition,
    rightButtonPosition,
    leftSubPageVisible,
    rightSubPageVisible,
    moveButton,
  };
};

export default useButtonController;
