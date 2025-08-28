import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import DirectionalLight from "./DirectionalLight";
import Particles from "../../components/Particles";

const Scene = ({ children }) => {
  return (
    <Canvas
      orthographic={true}
      shadows={true}
      camera={{
        up: [0, 0, 1],
        position: [300, -300, 300],
      }}
    >
      {/* <OrbitControls /> */}
      <ambientLight />

      <Particles count={80} />
      {/* <directionalLight position={[-100, -100, 200]} /> */}
      {/* <DirectionalLight /> */}
      {children}
    </Canvas>
  );
};
export default Scene;
