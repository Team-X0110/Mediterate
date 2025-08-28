// import useStore from "../stores/game";
import { useNavigate } from "react-router-dom";
import useStore from "../../stores/game";
// import "./Result.css";

export function Result() {
  const status = useStore((state) => state.status);
  const score = useStore((state) => state.score);
  const reset = useStore((state) => state.reset);
  const navigate = useNavigate();

  if (status === "running") return null;

  return (
    <div id="result-container">
      <div id="result">
        <h1>Game Over</h1>
        <p>Your score: {score}</p>
        <div id="button-container">
          <button onClick={reset}>Retry</button>
          <button
            onClick={() => {
              navigate(`/`);
            }}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
