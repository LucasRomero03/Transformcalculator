import { AlignJustify, NotebookPen, NotebookText } from "lucide-react";
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import ResultField from "./ResultField";
import Title from "./Title";
import calculateValues from "./CalculateValues";

interface DimensionFormProps {
  onDimensionsChange: (dimensions: { a: number; z_thickness: number }) => void;
  onCalculate: (data: {
    potenciaCarga: number;
    correntePrimaria: number;
    tensaoPrimaria: number;
    tensaoSecundaria: number;
    frequencia: number;
    secaoEspira: number;
    lm: number;
  }) => void;
}

const DimensionForm: React.FC<DimensionFormProps> = ({
  onDimensionsChange,
  onCalculate,
}) => {
  const [primaryTension, setPrimaryTension] = useState(120);
  const [secondaryTension, setSecondaryTension] = useState(220);
  const [chargePotency, setChargePotency] = useState(300);
  const [transformerFrequency, setTransformerFrequency] = useState(50);
  const [isOpen, setOpen] = useState<boolean>(true);

  const {
    BitolaCaboPrimario,
    BitolaCaboSecundario,
    NumEspirasPrimario,
    NumEspirasSecundario,
    PesoCU,
    PesoFE,
    a,
    z_thickness,
    tipoLamina,
    qt_laminas,
    correntePrimaria,
    lm,
  } = calculateValues({
    primaryTension,
    secondaryTension,
    chargePotency,
    transformerFrequency,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDimensionsChange({ a, z_thickness });
    onCalculate({
      correntePrimaria: correntePrimaria,
      tensaoPrimaria: primaryTension,
      frequencia: transformerFrequency,
      potenciaCarga: chargePotency,
      tensaoSecundaria: secondaryTension,
      secaoEspira: BitolaCaboPrimario.secao,
      lm: lm,
    });
  };

  useEffect(() => {
    onDimensionsChange({ a, z_thickness });
  }, []);

  return (
    <div className="bg-slate-600 text-white">
      <div className="flex justify-end w-full">
        <AlignJustify className="sticky w-fit px-2 py-1 cursor-pointer" size={32} onClick={() => setOpen(!isOpen)} />
      </div>
      <div className={`gap-y-8 ${!isOpen ? 'hidden' : ''}`}>
        <form
          onSubmit={handleSubmit}
          className="px-2 py-1"
        >
          <Title title="Configuração" svg={<NotebookPen />} />

          <InputField
            label="Tensão primária:"
            controlledValue={[primaryTension, setPrimaryTension]}
          />
          <InputField
            label="Tensão secundária:"
            controlledValue={[secondaryTension, setSecondaryTension]}
          />
          <InputField
            label="Potência de carga:"
            controlledValue={[chargePotency, setChargePotency]}
          />
          <InputField
            label="Frequência do transformador:"
            controlledValue={[transformerFrequency, setTransformerFrequency]}
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded bg-green-500 border-gray-800 border-[2px] mt-2 hover:bg-gradient-to-r from-green-500 to-neutral-400 px-2 text-black font-semibold"
            >
              Atualizar
            </button>
          </div>
        </form>

        <div className="bg-blue-500 text-white w-[270px]">
          <Title title="Resultados" svg={<NotebookText />} />

          <ResultField
            label="Bitola Prim."
            value={`[${BitolaCaboPrimario?.nome || "N/A"}] - ${BitolaCaboPrimario?.secao || "N/A"
              }`}
            unit="a/cm²"
            className="bg-opacity-50 bg-gray-500"
          />
          <ResultField
            label="Bitola Secun."
            value={`[${BitolaCaboSecundario?.nome || "N/A"}] - ${BitolaCaboSecundario?.secao || "N/A"
              }`}
            unit="a/cm²"
          />
          <ResultField
            label="Nº Espiras Prim."
            value={NumEspirasPrimario.toString()}
            className="bg-opacity-50 bg-gray-500"
          />
          <ResultField
            label="Nº Espiras Secun."
            value={NumEspirasSecundario.toString()}
          />
          <ResultField
           label="Peso do Cobre"
           value={(parseFloat(PesoCU)).toFixed(2)}
           unit="kg"
           className="bg-opacity-50 bg-gray-500"
          />
         
          <ResultField
            label="Peso do Núcleo de Ferro."
            value={(parseFloat(PesoFE)).toFixed(2)}
            unit="kg"
            
          />
           <ResultField
            label="Peso Total da Peça"
            value={(parseFloat(PesoFE) + parseFloat(PesoCU)).toFixed(2)}
            unit="kg"
            className="bg-opacity-50 bg-gray-500"
          />
          <ResultField label="Tipo de Lâmina" value={tipoLamina} />
          <ResultField
            label="Qtd. de Lâminas"
            value={qt_laminas.toFixed(0)}
            className="bg-opacity-50 bg-gray-500"
          />
        </div>
      </div >
    </div >
  );
};

export default DimensionForm;