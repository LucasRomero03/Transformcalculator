import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables, ChartData, ChartDataset } from "chart.js";
import calculateValues from "../CalculateValues";
import {
  curvaMagnetizacaoComHistereseInferior,
  curvaMagnetizacaoComHistereseSuperior,
  curvaMagnetizacaoSemHisterese,
} from "../data/curvaMagnetizacao";
Chart.register(...registerables);

interface DiagramViewProps {
  data: {
    potenciaCarga: number;
    correntePrimaria: number;
    tensaoPrimaria: number;
    tensaoSecundaria: number;
    frequencia: number;
    secaoEspira: number;
  };
  dimensions: {
    a: number;
    z_thickness: number;
  };
}

export const DiagramaView = (props: DiagramViewProps) => {
  const data: ChartData<'line', (number | undefined)[], number> = {
    labels: Array.from({ length: 10000 }, (_, i) => i / 10000), // Exemplo de eixo X de -5 a 5
    datasets: [
      {
        label: "Corrente de excitação (e)",
        data: tensaoExcitacao(
          props.data.correntePrimaria,
          props.data.frequencia
        ),
        fill: false,
        borderColor: "#fffb1f",
        tension: 0.1,
        yAxisID: "y",
        cubicInterpolationMode: "monotone", // Use 'default' ou 'monotone'
      },
      {
        label: "Fluxo",
        data: fluxo(props.data),
        fill: false,
        borderColor: "#2c91cc",
        tension: 0.1,
        yAxisID: "y1",
        cubicInterpolationMode: "default", // Use 'default' ou 'monotone'
      },
      {
        label: "MMP sem histerese",
        data: mmpSemHisterese(props.data),
        fill: false,
        borderColor: "red",
        tension: 0.1,
        yAxisID: "y2",
        cubicInterpolationMode: "monotone", // Use 'default' ou 'monotone'
      },
      {
        label: "MMP com histerese inferior",
        data: mmpComHistereseInferior(props.data),
        fill: false,
        borderColor: "green",
        tension: 0.1,
        yAxisID: "y2",
        cubicInterpolationMode: "monotone", // Use 'default' ou 'monotone'
      },
      {
        label: "MMP com histerese superior",
        data: mmpComHistereseSuperior(props.data),
        fill: false,
        borderColor: "purple",
        tension: 0.1,
        yAxisID: "y2",
        cubicInterpolationMode: "monotone", // Use 'default' ou 'monotone'
      },
    ] as ChartDataset<'line', (number | undefined)[]>[]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tempo (s)",
        },
      },
      y: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Corrente (A)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y1: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Fluxo (Wb)",
        },
      },
      y2: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "MMF (V)",
        },
      },
    },
  };

  return <Line data={data} options={options as never} />;
};

const tensaoExcitacao = (emax: number, frequencia: number) => {
  console.log(emax);
  const e = Array.from(
    { length: 10000 },
    (_, i) => emax * Math.cos((frequencia * i * 2 * Math.PI) / 10000)
  );
  return e;
};

const fluxo = (data: {
  potenciaCarga: number;
  correntePrimaria: number;
  tensaoPrimaria: number;
  tensaoSecundaria: number;
  frequencia: number;
  secaoEspira: number;
}) => {
  const { NumEspirasPrimario, BitolaCaboPrimario, lm, correntePrimaria } =
    calculateValues({
      chargePotency: data.potenciaCarga,
      primaryTension: data.tensaoPrimaria,
      secondaryTension: data.tensaoSecundaria,
      transformerFrequency: data.frequencia,
    });
  const permeabilidadeCobre = 4 * Math.PI * 10 ** -7;
  const indutancia =
    (permeabilidadeCobre * NumEspirasPrimario ** 2 * BitolaCaboPrimario.secao) /
    lm;
  const e = Array.from(
    { length: 10000 },
    (_, i) =>
      correntePrimaria *
      indutancia *
      Math.cos((data.frequencia * i * 2 * Math.PI) / 10000)
  );
  return e;
};

const mmpSemHisterese = (data: {
  potenciaCarga: number;
  correntePrimaria: number;
  tensaoPrimaria: number;
  tensaoSecundaria: number;
  frequencia: number;
  secaoEspira: number;
}) => {
  const { NumEspirasPrimario, BitolaCaboPrimario, lm, correntePrimaria } =
    calculateValues({
      chargePotency: data.potenciaCarga,
      primaryTension: data.tensaoPrimaria,
      secondaryTension: data.tensaoSecundaria,
      transformerFrequency: data.frequencia,
    });
  const permeabilidadeCobre = 4 * Math.PI * 10 ** -7;
  const indutancia =
    (permeabilidadeCobre * NumEspirasPrimario ** 2 * BitolaCaboPrimario.secao) /
    lm;

  const e = Array.from(
    { length: 10000 },
    (_, i) =>
      correntePrimaria *
      indutancia *
      Math.cos((data.frequencia * i * 2 * Math.PI) / 10000)
  );
  return e.map(
    (v) => curvaMagnetizacaoSemHisterese.find((w) => w.fluxo >= v)?.mmf
  );
};

const mmpComHistereseInferior = (data: {
  potenciaCarga: number;
  correntePrimaria: number;
  tensaoPrimaria: number;
  tensaoSecundaria: number;
  frequencia: number;
  secaoEspira: number;
}) => {
  const { NumEspirasPrimario, BitolaCaboPrimario, lm, correntePrimaria } =
    calculateValues({
      chargePotency: data.potenciaCarga,
      primaryTension: data.tensaoPrimaria,
      secondaryTension: data.tensaoSecundaria,
      transformerFrequency: data.frequencia,
    });
  const permeabilidadeCobre = 4 * Math.PI * 10 ** -7;
  const indutancia =
    (permeabilidadeCobre * NumEspirasPrimario ** 2 * BitolaCaboPrimario.secao) /
    lm;

  const e = Array.from(
    { length: 10000 },
    (_, i) =>
      correntePrimaria *
      indutancia *
      Math.cos((data.frequencia * i * 2 * Math.PI) / 10000)
  );
  return e.map(
    (v) => curvaMagnetizacaoComHistereseSuperior.find((w) => w.fluxo >= v)?.mmf
  );
};

const mmpComHistereseSuperior = (data: {
  potenciaCarga: number;
  correntePrimaria: number;
  tensaoPrimaria: number;
  tensaoSecundaria: number;
  frequencia: number;
  secaoEspira: number;
}) => {
  const { NumEspirasPrimario, BitolaCaboPrimario, lm, correntePrimaria } =
    calculateValues({
      chargePotency: data.potenciaCarga,
      primaryTension: data.tensaoPrimaria,
      secondaryTension: data.tensaoSecundaria,
      transformerFrequency: data.frequencia,
    });
  const permeabilidadeCobre = 4 * Math.PI * 10 ** -7;
  const indutancia =
    (permeabilidadeCobre * NumEspirasPrimario ** 2 * BitolaCaboPrimario.secao) /
    lm;

  const e = Array.from(
    { length: 10000 },
    (_, i) =>
      correntePrimaria *
      indutancia *
      Math.cos((data.frequencia * i * 2 * Math.PI) / 10000)
  );
  return e.map(
    (v) => curvaMagnetizacaoComHistereseInferior.find((w) => w.fluxo >= v)?.mmf
  );
};
