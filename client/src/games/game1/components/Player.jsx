import { Bounds } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import usePlayerAnimation from "../hooks/usePlayerAnimation";
import { useThree } from "@react-three/fiber";
import DirectionalLight from "./DirectionalLight";
import { setRef } from "../stores/player";

const Player = () => {
  const ref = useRef(null);
  const lightref = useRef(null);
  const camera = useThree((state) => state.camera);

  usePlayerAnimation(ref);

  useEffect(() => {
    if (!ref.current) return;
    if (!lightref.current) return;

    ref.current.add(camera);
    lightref.current.target = ref.current;

    setRef(ref.current);
  });

  return (
    <Bounds fit clip observe margin={10}>
      <group ref={ref}>
        <group>
          <mesh position={[0, 0, 10]} castShadow receiveShadow>
            <boxGeometry args={[15, 15, 20]} />
            <meshLambertMaterial color={0xffffff} flatShading />
          </mesh>

          <mesh position={[0, 0, 21]} castShadow receiveShadow>
            <boxGeometry args={[2, 4, 2]} />
            <meshLambertMaterial color={0xf0619a} flatShading />
          </mesh>
        </group>
        <DirectionalLight ref={lightref} />
      </group>
    </Bounds>
  );
};
export default Player;
