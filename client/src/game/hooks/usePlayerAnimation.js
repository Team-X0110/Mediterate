import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { state, stepCompleted } from "../stores/player";
import { tileSize } from "../utils/constants";

export default function usePlayerAnimation(ref) {
  const moveClock = new THREE.Clock(false);

  useFrame(() => {
    if (!ref.current) return;
    if (!state.movesQueue.length) return;
    const player = ref.current;

    if (!moveClock.running) moveClock.start();

    const stepTime = 0.2; // Seconds it takes to take a step
    const progress = Math.min(1, moveClock.getElapsedTime() / stepTime);

    setPosition(player, progress);
    setRotation(player, progress);

    // Once a step has ended
    if (progress >= 1) {
      stepCompleted();
      moveClock.stop();
    }
  });
}

function setPosition(player, progress) {
  const startX = state.currentTile * tileSize;
  const startY = state.currentRow * tileSize;
  let endX = startX;
  let endY = startY;

  if (state.movesQueue[0] === "left") endX -= tileSize;
  if (state.movesQueue[0] === "right") endX += tileSize;
  if (state.movesQueue[0] === "forward") endY += tileSize;
  if (state.movesQueue[0] === "backward") endY -= tileSize;

  player.position.x = THREE.MathUtils.lerp(startX, endX, progress);
  player.position.y = THREE.MathUtils.lerp(startY, endY, progress);
  player.children[0].position.z = Math.sin(progress * Math.PI) * 10;
}

function setRotation(player, progress) {
  let endRotation = 0;
  if (state.movesQueue[0] == "forward") endRotation = 0;
  if (state.movesQueue[0] == "left") endRotation = Math.PI / 2;
  if (state.movesQueue[0] == "right") endRotation = -Math.PI / 2;
  if (state.movesQueue[0] == "backward") endRotation = Math.PI;

  player.children[0].rotation.z = THREE.MathUtils.lerp(
    player.children[0].rotation.z,
    endRotation,
    progress
  );
}
