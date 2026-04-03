import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default async function init(videoRef, landmarkerRef) {

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
  );

  landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
    numFaces: 1,
  });

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  videoRef.current.srcObject = stream;
}

export function detect(videoRef, landmarkerRef, animationRef, detectExpression) {

  if (!videoRef.current || !landmarkerRef.current) return;

  const runDetection = () => {

    const results = landmarkerRef.current.detectForVideo(
      videoRef.current,
      Date.now()
    );

    if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
      const blendshapes = results.faceBlendshapes[0].categories;
      detectExpression(blendshapes);
    }

    animationRef.current = requestAnimationFrame(runDetection);
  };

  runDetection();
}