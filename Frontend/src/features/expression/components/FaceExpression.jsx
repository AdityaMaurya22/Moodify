import { useEffect, useRef, useState } from "react";
import init, { detect } from "../utils/utils.jsx";

export default function FaceExpression() {

  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const [expression, setExpression] = useState("Click to Detect");

  const detectExpression = (blendshapes) => {

    const getScore = (name) =>
      blendshapes.find((b) => b.categoryName === name)?.score || 0;

    const smile = getScore("mouthSmileLeft") + getScore("mouthSmileRight");
    const frown = getScore("mouthFrownLeft") + getScore("mouthFrownRight");
    const browDown = getScore("browDownLeft") + getScore("browDownRight");
    const browInnerUp = getScore("browInnerUp");
    const eyeSquint = getScore("eyeSquintLeft") + getScore("eyeSquintRight");
    const jawOpen = getScore("jawOpen");
    const eyeWide = getScore("eyeWideLeft") + getScore("eyeWideRight");

    if (smile > 0.35) {
      setExpression("😊 Happy");
    } else if (jawOpen > 0.3 && browInnerUp>0.2) {
      setExpression("😲 Surprised");
    } else if (browInnerUp > 0.25 && frown > 0.12) {
      setExpression("😟 Sad");
    } else if (browDown > 0.25 && eyeSquint > 0.2) {
      setExpression("😠 Angry");
    } else {
      setExpression("😐 Neutral");
    }
  };

  useEffect(() => {
    init(videoRef, landmarkerRef);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <video ref={videoRef} autoPlay playsInline width="700" />
      <h2>{expression}</h2>

      <button
        onClick={() =>
          detect(videoRef, landmarkerRef, animationRef, detectExpression)
        }
      >
        Start Detection
      </button>
    </div>
  );
}