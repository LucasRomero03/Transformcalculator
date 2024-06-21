import React from "react";

const FakeGrid: React.FC = () => {
  return (
    <>
      {/* Eixos */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.11, 1000, 0.1]} />
        <meshStandardMaterial color={"gray"} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1000, 0.1, 0.1]} />
        <meshStandardMaterial color={"gray"} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.1, 0.1, 1000]} />
        <meshStandardMaterial color={"gray"} />
      </mesh>
    </>
  );
};

export default FakeGrid;
