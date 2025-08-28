import React, { useRef } from "react";
import { tileSize } from "../utils/constants";
import Wheel from "./Wheel";
import useVehicleAnimation from "../hooks/useVehicleAnimation";
import useHitDetection from "../hooks/useHitDetection";

const Truck = ({ initialTileIndex, direction, color, rowIndex, speed }) => {
  const ref = useRef(null);
  useVehicleAnimation(ref, direction, speed);
  useHitDetection(ref, rowIndex);

  return (
    <group
      position-x={initialTileIndex * tileSize}
      rotation-z={direction ? 0 : Math.PI}
      ref={ref}
    >
      <mesh position={[-15, 0, 25]} receiveShadow castShadow>
        <boxGeometry args={[70, 35, 35]} />
        <meshLambertMaterial color={0xb4c6fc} flatShading />
      </mesh>
      <mesh position={[35, 0, 20]} receiveShadow castShadow>
        <boxGeometry args={[30, 30, 30]} />
        <meshLambertMaterial color={color} flatShading />
      </mesh>
      <Wheel x={-35} />
      <Wheel x={5} />
      <Wheel x={37} />
    </group>
  );
};

export default Truck;
