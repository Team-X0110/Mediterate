import React from "react";
import { tilePerRow, tileSize } from "../utils/constants";

const Grass = ({ rowIndex, children }) => {
  return (
    <group position-y={rowIndex * tileSize}>
      <mesh receiveShadow>
        <boxGeometry args={[tilePerRow * tileSize, tileSize, 3]} />
        <meshLambertMaterial color={0xbaf455} flatShading />
      </mesh>
      {children}
    </group>
  );
};

export default Grass;
