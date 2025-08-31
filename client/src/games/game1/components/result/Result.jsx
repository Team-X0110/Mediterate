import { useNavigate } from "react-router-dom";
import useStore from "../../stores/game";
import { useRef, useState, useEffect } from "react";
import VariableProximity from "../../../../blocks/TextAnimations/VariableProximity/VariableProximity";

export function Result() {
  const status = useStore((state) => state.status);
  const score = useStore((state) => state.score);
  const reset = useStore((state) => state.reset);
  const markVideoWatched = useStore((state) => state.markVideoWatched);
  const markQuizCompleted = useStore((state) => state.markQuizCompleted);
  const videoWatched = useStore((state) => state.videoWatched);
  const quizCompleted = useStore((state) => state.quizCompleted);

  const ref = useRef();
  const navigate = useNavigate();

  const [showVideo, setShowVideo] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(false);

  const videoSrc =
    "https://res.cloudinary.com/duct224qr/video/upload/f_auto,q_auto,w_1280/video_2025-08-31_22-20-49_pc6fs6.mp4";

  const thumbnail = videoSrc.replace(".mp4", ".jpg");

  useEffect(() => {
    let timer;
    if (loadingVideo) {
      timer = setTimeout(() => {
        setShowVideo(true);
        setLoadingVideo(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [loadingVideo]);

  if (status === "running") return null;

  return (
    <div id="result-container">
      {loadingVideo && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.95)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            zIndex: 2000,
          }}
        >
          <img
            src={thumbnail}
            alt="Video thumbnail"
            style={{
              maxWidth: "70%",
              borderRadius: "12px",
              marginBottom: "20px",
              boxShadow: "0 0 20px rgba(0,0,0,0.6)",
            }}
          />
          <p style={{ color: "white", fontSize: "1.5rem" }}>Loading...</p>
        </div>
      )}

      {showVideo ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <video
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "12px",
              boxShadow: "0 0 20px rgba(0,0,0,0.8)",
            }}
            autoPlay
            preload="none"
            controls
            onEnded={() => {
              setShowVideo(false);
              markVideoWatched();
              navigate("/game/1");
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <button
            onClick={() => setShowVideo(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              fontSize: "2rem",
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            ✖
          </button>
        </div>
      ) : (
        <div id="result" ref={ref}>
          <h1>
            <VariableProximity
              label={"Game Over"}
              className={"variable-proximity-demo"}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 4000, 'opsz' 40"
              containerRef={ref}
              radius={100}
              falloff="gaussian"
            />
          </h1>

          <p>Your score: {score}</p>
          <div id="button-container">
            <div id="first-btn">
              {videoWatched && quizCompleted && (
                <button
                  className="btn-gradient-text"
                  onClick={() => {
                    reset();
                    navigate(0);
                  }}
                >
                  Retry
                </button>
              )}

              <button
                className="btn-gradient-text"
                onClick={() => navigate(`/`)}
              >
                Home
              </button>
            </div>

            <div id="second-btn">
              <button
                className="btn-gradient-text"
                onClick={() => {
                  markQuizCompleted();
                  window.open("https://forms.gle/8sYQTfNyAR4ZVUdg9", "_blank");
                  navigate(`/game/1`);
                }}
              >
                Take Quiz
              </button>

              <button
                className="btn-gradient-text"
                onClick={() => setLoadingVideo(true)}
              >
                Watch Video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
