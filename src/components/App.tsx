import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import E from "./components2/Core";
import DimensionForm from "./components2/DimensionForm";
import FakeGrid from "./components2/FakeGrid";
import { Header } from "./components2/Header";
import { DiagramaView } from "./components2/views/DiagramaView";
import InfoGrid from "../components/components2/infoGrid";

export interface Dimensions {
  a: number;
  z_thickness: number;
}

interface Data {
  potenciaCarga: number;
  correntePrimaria: number;
  tensaoPrimaria: number;
  tensaoSecundaria: number;
  frequencia: number;
  secaoEspira: number;
}

const App: React.FC = () => {
  const [dimensions, setDimensions] = useState<Dimensions>();
  const [data, setData] = useState<Data>();
  const [partDimensions, setPartDimensions] = useState<string>(
    "Nenhuma peça selecionada"
  );
  const [view, setView] = useState<"Modelo 3D" | "Diagrama">("Modelo 3D");

  return (
    <>
      <Header onClick={(x) => setView(x)} />
      <div className="flex relative">
        <InfoGrid dimensions={dimensions} partDimensions={partDimensions} />
        <DimensionForm
          onDimensionsChange={(dims) => setDimensions(dims)}
          onCalculate={(a) => setData(a)}
        />
        {view === "Modelo 3D" && dimensions ? (
          <>
            <Canvas style={{ height: "100vh", width: "100vw" }}>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              {data && (
                <E
                  a={dimensions.a}
                  depth={dimensions.z_thickness}
                  setPartDimensions={setPartDimensions}
                  chargePotency={data.potenciaCarga}
                />
              )}
              <FakeGrid />
              <OrbitControls />
              <Grid
                position={[0, 0, 0]} // Adjust the position to be below your objects
                infiniteGrid={true} // Makes the grid infinite
                cellSize={0.5} // Size of each cell
                cellThickness={0.5} // Thickness of the cell lines
                sectionSize={5} // Size of each section (subdivision)
                sectionThickness={1} // Thickness of the section lines
                sectionColor="#444" // Color of the section lines
                fadeDistance={50} // Distance over which the grid fades out
                fadeStrength={1} // Strength of the fade effect
              />
            </Canvas>
          </>
        ) : (
          !!data &&
          !!dimensions && <DiagramaView data={data} dimensions={dimensions} />
        )}
      </div>
    </>
  );
};

export default App;
