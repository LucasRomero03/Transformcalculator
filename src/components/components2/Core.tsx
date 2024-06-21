import React from "react";

interface LetterEProps {
  a: number;
  depth: number;
  setPartDimensions: React.Dispatch<React.SetStateAction<string>>;
}

const LetterE: React.FC<LetterEProps> = ({ a, depth, setPartDimensions }) => {
  return (
    <>
      {/* Coluna do Primário */}
      <mesh position={[a * 0.25, a * 2, depth / 2]} onClick={() => setPartDimensions(`Coluna do Primário\nComprimento: ${a * 0.5} cm\nAltura: ${a * 3}cm\nLargura: ${depth.toFixed(2)} cm`)}>
        <boxGeometry args={[a * 0.5, a * 3, depth]} />
        <meshStandardMaterial color={"gray"} />
      </mesh>

      {/* Coluna do Secundário */}
      <mesh position={[a * 2.75, a * 2, depth / 2]} onClick={() => setPartDimensions(`Coluna do Secundário\nComprimento: ${a * 0.5} cm\nAltura: ${a * 3}cm\nLargura: ${depth.toFixed(2)} cm`)}>
        <boxGeometry args={[a * 0.5, a * 3, depth]} />
        <meshStandardMaterial color={"gray"} />
      </mesh>

      {/* Coluna Central */}
      <mesh position={[a * 1.5, a * 2, depth / 2]} onClick={() => setPartDimensions(`Coluna Central\nComprimento: ${a} cm\nAltura: ${a * 3}cm\nLargura: ${depth.toFixed(2)} cm`)}>
        <boxGeometry args={[a, a * 3, depth]} />
        <meshStandardMaterial color={"gray"} />
      </mesh>

      {/* Piso */}
      <mesh position={[a * 1.5, a * 0.25, depth / 2]} onClick={() => setPartDimensions(`Piso\nComprimento: ${a * 3} cm\nAltura: ${a * 0.5}cm\nLargura: ${depth.toFixed(2)} cm`)}>
        <boxGeometry args={[a * 3, a * 0.5, depth]} />
        <meshStandardMaterial color={"gray"} />
      </mesh>

      {/* Teto */}
      <mesh position={[a * 1.5, a * 3.75, depth / 2]} onClick={() => setPartDimensions(`Teto\nComprimento: ${a * 3} cm\nAltura: ${a * 0.5}cm\nLargura: ${depth.toFixed(2)} cm`)}>
        <boxGeometry args={[a * 3, a * 0.5, depth]} />
        <meshStandardMaterial color={"black"} />
      </mesh>
    </>
  );
};

export default LetterE;
