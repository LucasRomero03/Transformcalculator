interface CalculateValuesProps {
    primaryTension: number;
    secondaryTension: number;
    chargePotency: number;
    transformerFrequency: number;
}

const bitolas = [
    {
        nome: "Fio n° 1",
        secao: 42.41,
    },
    {
        nome: "Fio n° 2",
        secao: 33.63,
    },
    {
        nome: "Fio n° 3",
        secao: 26.67,
    },
    {
        nome: "Fio n° 4",
        secao: 21.15,
    },
    {
        nome: "Fio n° 5",
        secao: 16.77,
    },
    {
        nome: "Fio n° 6",
        secao: 13.30,
    },
    {
        nome: "Fio n° 7",
        secao: 10.55,
    },
    {
        nome: "Fio n° 8",
        secao: 8.366,
    },
    {
        nome: "Fio n° 9",
        secao: 6.634,
    },
    {
        nome: "Fio n° 10",
        secao: 5.261,
    },
    {
        nome: "Fio n° 11",
        secao: 4.172,
    },
    {
        nome: "Fio n° 12",
        secao: 3.309,
    },
    {
        nome: "Fio n° 13",
        secao: 2.624,
    },
    {
        nome: "Fio n° 14",
        secao: 2.081
    },
    {
        nome: "Fio n° 15",
        secao: 1.650,
    },
    {
        nome: "Fio n° 16",
        secao: 1.309,
    },
    {
        nome: "Fio n° 17",
        secao: 1.038,
    },
    {
        nome: "Fio n° 18",
        secao: 0.823,
    },
    {
        nome: "Fio n° 19",
        secao: 0.653,
    },
    {
        nome: "Fio n° 20",
        secao: 0.518,
    },
    {
        nome: "Fio n° 21",
        secao: 0.410,
    },
    {
        nome: "Fio n° 22",
        secao: 0.326,
    },
    {
        nome: "Fio n° 23",
        secao: 0.258,
    },
    {
        nome: "Fio n° 24",
        secao: 0.205,
    },
    {
        nome: "Fio n° 25",
        secao: 0.162,
    },
    {
        nome: "Fio n° 26",
        secao: 0.129,
    },
    {
        nome: "Fio n° 27",
        secao: 0.102,
    },
    {
        nome: "Fio n° 28",
        secao: 0.081,
    },
    {
        nome: "Fio n° 29",
        secao: 0.064,
    },
    {
        nome: "Fio n° 30",
        secao: 0.051,
    },
    {
        nome: "Fio n° 31",
        secao: 0.040,
    },
    {
        nome: "Fio n° 32",
        secao: 0.032,
    },
    {
        nome: "Fio n° 33",
        secao: 0.025,
    },
    {
        nome: "Fio n° 34",
        secao: 0.020,
    },
    {
        nome: "Fio n° 35",
        secao: 0.016,
    },
    {
        nome: "Fio n° 36",
        secao: 0.013,
    },
    {
        nome: "Fio n° 37",
        secao: 0.010,
    },
    {
        nome: "Fio n° 38",
        secao: 0.008,
    },
    {
        nome: "Fio n° 39",
        secao: 0.006,
    },
    {
        nome: "Fio n° 40",
        secao: 0.005,
    },
];

const laminas = [
    {
        nome: "Lâmina 0",
        secaoJanela: 168,
        pesoPorCM: 0.095,
        comprimentoNucleo: 1.5,
    },
    {
        nome: "Lâmina 1",
        secaoJanela: 300,
        pesoPorCM: 0.17,
        comprimentoNucleo: 2,
    },
    {
        nome: "Lâmina 2",
        secaoJanela: 468,
        pesoPorCM: 0.273,
        comprimentoNucleo: 2.5,
    },
    {
        nome: "Lâmina 3",
        secaoJanela: 675,
        pesoPorCM: 0.38,
        comprimentoNucleo: 3,
    },
    {
        nome: "Lâmina 4",
        secaoJanela: 900,
        pesoPorCM: 0.516,
        comprimentoNucleo: 3.5,
    },
    {
        nome: "Lâmina 5",
        secaoJanela: 1200,
        pesoPorCM: 0.674,
        comprimentoNucleo: 4,
    },
    {
        nome: "Lâmina 6",
        secaoJanela: 1880,
        pesoPorCM: 1.053,
        comprimentoNucleo: 5,
    },
    
];
const laminas1 = [
   
    {
        nome: "Lâmina Comprida 5",
        secaoJanela: 2400,
        pesoPorCM: 1.000,
        comprimentoNucleo: 4,
    },
    {
        nome: "Lâmina comprida 6",
        secaoJanela: 3750,
        pesoPorCM: 1.580,
        comprimentoNucleo: 5,
    },
];

function getDensity(chargePotency: number): number {
    if (chargePotency > 1000 && chargePotency <= 3000) {
        return 2;
    } else if (chargePotency > 500) {
        return 2.5;
    }
    return 3;
}

export default function calculateValues({
    primaryTension,
    secondaryTension,
    chargePotency,
    transformerFrequency,
}: CalculateValuesProps) {
    const W1 = 1.1 * chargePotency; // Potência primária
    const I1 = W1 / primaryTension; // Corrente primária
    const I2 = chargePotency / secondaryTension; // Corrente secundária
    // Densidade de corrente (A/mm^2)

    const d = getDensity(chargePotency);

    const S1 = I1 / d; // Seção do condutor primário (mm^2)
    const S2 = I2 / d; // Seção do condutor secundário (mm^2)

    // Verifica se a potência de carga é maior que 800
    let Sm: number, Sg: number, Esp_volt: number, z_thickness: number, Np: number, Ns: number, Scu: number;
    let tipoLamina: any, nomeTipoLamina: string, a: number, pi: number, lm: number, peso_lamina: number, Pfe: number, Pcu: number, Pcu_kg: number, qt_laminas: number;
    let BitolaCaboPrimario: any, BitolaCaboSecundario: any;
    if (chargePotency > 800) {
        // Ajustes para potências maiores que 800
        Sm = 6.5 * Math.sqrt(chargePotency / transformerFrequency); // cm^2
        Sg = 1.1 * Sm; // cm^2
        Esp_volt = 40 / Sm; // Exemplo de ajuste

       

        Np = parseInt((0.98*Esp_volt * primaryTension).toFixed(0));
        Ns = parseInt((Esp_volt * secondaryTension * 1.1).toFixed(0)); // acrescidas de 10%
     
        Scu = Np * S1 + Ns * S2; // mm^2

        tipoLamina = laminas1.find(({ secaoJanela }) => {
            return secaoJanela / Scu > 3;
        });

        nomeTipoLamina = tipoLamina
            ? tipoLamina.nome
            : "Não há tipo de Lâmina para estes valores";

        a = tipoLamina?.comprimentoNucleo ?? 5; // cm

        
        z_thickness = Sg / a;
    
        pi = Math.PI;
        lm = 2 * a + 2 * z_thickness + 0.5 * a * pi; // cm

        peso_lamina = tipoLamina?.pesoPorCM ?? 1; // kg/cm
        Pfe = peso_lamina * z_thickness;

        Pcu = (Scu / 100) * lm * 9; // g -> 1 g = 0.001 kg
        Pcu_kg = Pcu / 1000; // kg

        
        qt_laminas = Pfe / peso_lamina;

        BitolaCaboPrimario = bitolas.filter(bitola => bitola.secao >= S1).sort((a, b) => a.secao - b.secao)[0];
        BitolaCaboSecundario = bitolas.filter(bitola => bitola.secao >= S2).sort((a, b) => a.secao - b.secao)[0];
    } else {
        // Cálculos padrão
        Sm = 7.5 * Math.sqrt(chargePotency / transformerFrequency); // cm^2
        Sg = 1.1 * Sm; // cm^2
        Esp_volt = 40 / Sm;

        

        Np = parseInt((Esp_volt * primaryTension).toFixed(0));
        Ns = parseInt((Esp_volt * secondaryTension * 1.1).toFixed(0)); // acrescidas de 10%
    
        Scu = Np * S1 + Ns * S2; // mm^2

        tipoLamina = laminas.find(({ secaoJanela }) => {
            return secaoJanela / Scu > 3;
        });

        nomeTipoLamina = tipoLamina
            ? tipoLamina.nome
            : "Não há tipo de Lâmina para estes valores";

        a = tipoLamina?.comprimentoNucleo ?? 5; // cm
        z_thickness = Sg / a;
        pi = Math.PI;
        lm = 2 * a + 2 * z_thickness + 0.5 * a * pi; // cm

        peso_lamina = tipoLamina?.pesoPorCM ?? 1; // kg/cm
        Pfe = peso_lamina *z_thickness;

        Pcu = (Scu / 100) * lm * 9; // g -> 1 g = 0.001 kg
        Pcu_kg = Pcu / 1000; // kg

       
        qt_laminas = Pfe / peso_lamina;

        BitolaCaboPrimario = bitolas.filter(bitola => bitola.secao >= S1).sort((a, b) => a.secao - b.secao)[0];
        BitolaCaboSecundario = bitolas.filter(bitola => bitola.secao >= S2).sort((a, b) => a.secao - b.secao)[0];
    }

    return {
        NumEspirasPrimario: Np,
        NumEspirasSecundario: Ns,
        BitolaCaboPrimario: BitolaCaboPrimario,
        BitolaCaboSecundario: BitolaCaboSecundario,
        PesoFE: Pfe.toFixed(2),
        PesoCU: Pcu_kg.toFixed(2),
        a: tipoLamina?.comprimentoNucleo ?? 5,
        qt_laminas: qt_laminas,
        z_thickness: z_thickness,
        tipoLamina: nomeTipoLamina,
        correntePrimaria: I1,
        lm: lm,
    };
}
