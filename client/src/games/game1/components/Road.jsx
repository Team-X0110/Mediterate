import React from "react";
import { tilePerRow, tileSize } from "../utils/constants";

const Road = ({ rowIndex, children }) => {
  return (
    <group position-y={rowIndex * tileSize}>
      <mesh receiveShadow>
        <planeGeometry args={[tilePerRow * tileSize, tileSize]} />
        <meshLambertMaterial color={0x454a59} flatShading />
      </mesh>
      {children}
    </group>
  );
};

export default Road;
