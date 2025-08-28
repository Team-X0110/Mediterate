import React from "react";

const DirectionalLight = ({ ref }) => {
  return (
    <directionalLight
      ref={ref}
      position={[-100, -100, 200]}
      up={[0, 0, 1]}
      castShadow
      shadow-mapSize={[2040, 2040]}
      shadow-camera-left={-400}
      shadow-camera-right={400}
      shadow-camera-top={400}
      shadow-camera-bottom={-400}
      shadow-camera-near={50}
      shadow-camera-far={400}
    />
  );
};

export default DirectionalLight;
