import { useNavigate } from "react-router-dom";
import useStore from "../../stores/game";
import { useRef, useState } from "react";
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

  if (status === "running") return null;

  return (
    <div id="result-container">
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
            controls
            onEnded={() => {
              setShowVideo(false);
              markVideoWatched(); //  mark as completed
              navigate("/game/1");
            }}
          >
            <source src="/assets/videos/Media-Literacy-01.mp4" type="video/mp4" />
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
            {/* Retry only if BOTH tasks are done */}
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
                onClick={() => setShowVideo(true)}
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
