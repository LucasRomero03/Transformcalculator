import { BookOpenText, Square, Grid3X3, CircleAlert, X } from "lucide-react";
import Title from "./Title";
import { Dimensions } from "../App";
import { useEffect, useState } from "react";

interface Props {
    dimensions?: Dimensions;
    partDimensions: string;
}


export default function InfoGrid({ dimensions, partDimensions }: Props) {
    const [isOpen, setOpen] = useState<boolean>(true);
    const [dimensionsChanged, setDimensionsChanged] = useState<boolean>(false);
    useEffect(() => {
        setDimensionsChanged(true);
        setTimeout(() => { setDimensionsChanged(false) }, 3000)
    }, [partDimensions]);

    return (
        <div className="absolute right-0 bg-gray-500 px-2 py-1 rounded text-white font-semibold z-10">
            <button className={`relative top-0 left-0 m-1 ${isOpen ? 'p-0.5 hover:text-red-500' : ''}`} onClick={() => setOpen(!isOpen)}>
                {isOpen
                    ? <X size={16} />
                    : <CircleAlert className={`${dimensionsChanged ? 'text-gray-700 animate-pulse' : ''}`} />
                }
            </button>
            <Title title="Informações do Grid " svg={<BookOpenText />} className={!isOpen ? 'hidden' : ''}>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <Square /> 0.5cm
                    </div>
                    <div className="flex flex-row gap-2">
                        <Grid3X3 /> 5.0cm
                    </div>

                    <div className="flex flex-row gap-2">
                        Dimensão da peça selecionada:
                        <div className="flex flex-col items-end">
                            {partDimensions.split("\n").map((part, index) => (
                                <p
                                    key={part}
                                    className={`${index === 0
                                        ? "text-lg rounded-md px-1 bg-white text-black w-fit"
                                        : "text-sm"
                                        }`}
                                >
                                    {part}
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-row gap-2">
                        <p className="w-full">Dimensões Totais:</p>
                        <div className="flex flex-col items-end">
                            {`Transformador\nComprimento: ${(dimensions?.a ?? 5) * 3
                                }cm\nAltura: ${(dimensions?.a ?? 5) * 4
                                }cm\nLargura: ${dimensions?.z_thickness.toFixed(
                                    2
                                )} cm\nEspaçamento: ${(dimensions?.a ?? 5) / 2}cm`
                                .split("\n")
                                .map((part, index) => (
                                    <p
                                        key={part}
                                        className={`${index === 0
                                            ? "min-w-[190px] text-lg rounded-md px-1 bg-white text-black w-fit"
                                            : "text-sm"
                                            }`}
                                    >
                                        {part}
                                    </p>
                                ))}
                        </div>
                    </div>
                </div>
            </Title>
        </div>
    )
}