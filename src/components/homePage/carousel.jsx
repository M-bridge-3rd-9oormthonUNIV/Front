import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import "../../css/carousel.css";

gsap.registerPlugin(MotionPathPlugin, Draggable);

const Carousel = () => {
  const wrapperRef = useRef(null);
  const itemsRef = useRef([]);
  const svgRef = useRef(null);
  const tracker = { item: 0 };
  const numItems = 10;
  const itemStep = 1 / numItems;

  const [viewBox, setViewBox] = useState("0 0 500 500");
  const [circleCx, setCircleCx] = useState(120);
  const [circleCy, setCircleCy] = useState(200);
  const [circleR, setCircleR] = useState(320);

  const targetIndex = Math.floor(numItems / 2);

  const images = [
    "https://i.postimg.cc/fRhvw6bs/image.png",
    "https://i.postimg.cc/Y9j6n7d6/image-1.png",
    "https://i.postimg.cc/prFDvZby/image-2.png",
    "https://i.postimg.cc/fRhvw6bs/image.png",
    "https://i.postimg.cc/Y9j6n7d6/image-1.png",
    "https://i.postimg.cc/prFDvZby/image-2.png",
    "https://i.postimg.cc/fRhvw6bs/image.png",
    "https://i.postimg.cc/Y9j6n7d6/image-1.png",
    "https://i.postimg.cc/prFDvZby/image-2.png",
    "https://i.postimg.cc/fRhvw6bs/image.png",
  ];

  const texts = [
    "Lover <br> Taylor Swift <br> 2019.8.23",
    "Eternal Sunshine <br> Ariana Grande <br> 2024.3.8",
    "SOS <br> SZA <br> 2022.12.9",
    "Lover <br> Taylor Swift <br> 2019.8.23",
    "Eternal Sunshine <br> Ariana Grande <br> 2024.3.8",
    "SOS <br> SZA <br> 2022.12.9",
    "Lover <br> Taylor Swift <br> 2019.8.23",
    "Eternal Sunshine <br> Ariana Grande <br> 2024.3.8",
    "SOS <br> SZA <br> 2022.12.9",
    "Lover <br> Taylor Swift <br> 2019.8.23",
  ];

  useEffect(() => {
    const items = itemsRef.current;
    
    // Convert SVG circle to a motion path
    const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0];
    circlePath.id = "circlePath";
    svgRef.current.prepend(circlePath);

    const wrapProgress = gsap.utils.wrap(0, 1);
    const snap = gsap.utils.snap(itemStep);
    const wrapTracker = gsap.utils.wrap(0, numItems);

    gsap.set(items, {
      motionPath: {
        path: circlePath,
        align: circlePath,
        alignOrigin: [0.5, 0.5],
        end: (i) => gsap.utils.wrap(0, 1, i / items.length + 0.25),
        autoRotate: false,
      },
      scale: 0.8,
    });

    const tl = gsap.timeline({ paused: true, reversed: true });

    tl.to(wrapperRef.current, {
        rotation: 360, // 시계 방향으로 회전하도록 설정
        transformOrigin: "center",
        duration: 1,
        ease: "none",
      });

    tl.to(
      items,
      {
        rotation: 0, // 아이템 자체가 회전하지 않도록 설정
        transformOrigin: "center center",
        duration: 1,
        ease: "none",
      },
      0
    );

    tl.to(
      tracker,
      {
        item: numItems,
        duration: 1,
        ease: "none",
        modifiers: {
          item: (value) => wrapTracker(numItems - Math.round(value)),
        },
      },
      0
    );
    

    Draggable.create(wrapperRef.current, {
        type: "rotation", // 회전 드래그 설정
        inertia: true, // 드래그 후 관성 적용
        throwResistance: 1000, // 드래그 저항값, 더 부드럽게
        snap: (endValue) => gsap.utils.snap(45, endValue), // 45도 단위로 스냅
        onDrag() {
          const progress = wrapProgress(snap(this.rotation / 360));
          tl.progress(progress);
        },
        onThrowUpdate() {
          const progress = wrapProgress(snap(this.rotation / 360));
          tl.progress(progress);

        },
        onThrowUpdate() {
          const progress = wrapProgress(snap(this.rotation / 360));
          tl.progress(progress);
        }
      });

    const moveWheel = (amount) => {
      let progress = tl.progress();
      tl.progress(wrapProgress(snap(tl.progress() + amount)));
      const next = tracker.item;
      tl.progress(progress);

      gsap.to(tl, {
        progress: snap(tl.progress() + amount),
        modifiers: {
          progress: wrapProgress,
        }
      });
    };

    items.forEach((el, i) => {
        if (el) {
          el.addEventListener("click", () => {
            const current = tracker.item;
  
            if (i === current) return;
  
            // 클릭한 아이템이 화면의 중앙(세 번째 위치)로 오도록 계산
            const diff = targetIndex - i;
            moveWheel(diff * itemStep);
          });
        }
      });
    }, [itemStep, numItems]);

  return (
    <div>
      <div className="container">
        <div className="wrapper" ref={wrapperRef}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`item ${index === 0 ? "active" : ""}`}
              ref={(el) => (itemsRef.current[index] = el)}
            >
              <div className="hover-overlay">
                <span className="hover-text">
                  {texts[index].split('<br>').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </span>
              </div>
               <img src={image} alt={`Item ${index}`} />
            </div>
          ))}
          <svg viewBox={viewBox} ref={svgRef}> {/* viewBox 크기를 늘림 */}
            <circle id="holder" className="st0"  cx={circleCx} cy={circleCy} r={circleR} /> 
        </svg>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
