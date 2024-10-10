import React, { useState } from "react";
import "../../css/logoExplanation.css";

export default function LogoWithAnimation() {
    const [isLogoHovered, setIsLogoHovered] = useState(false);
  
    const handleMouseEnter = () => {
      setIsLogoHovered(true); // 로고 위에 마우스가 올려질 때 상태 변경
  };

  const handleMouseLeave = () => {
      setIsLogoHovered(false); // 로고에서 마우스가 벗어날 때 상태 변경
  };
  
    return (
      <div 
        className="logo-container" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
            {!isLogoHovered && (
                <div className="logo" />
            )}
            {isLogoHovered && (
                <div className="service-description">
                    <p className="service-text">
                        ‘엠브릿지(M-bridge)’는 전 세계 음악 팬들을 위한 혁신적인 가사 번역 서비스입니다. 
                        언어의 장벽을 허물고, 다양한 문화권의 음악을 이해하고 즐길 수 있도록 돕기 위해 만들어졌습니다.
                    </p>
                    <img src="https://i.postimg.cc/RCDnxmHN/Group-26.png" alt="Service" className="service-image" />
                </div>
            )}
        </div>
    );
  }