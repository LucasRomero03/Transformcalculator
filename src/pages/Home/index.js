import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <div className="container">
      <div className="home">
        <img
          src={"eletric.png"}
          alt="ftransformador"
          style={{ height: 100, width: 100 }}
        />
        <h1>Transform calculator</h1>
        <h2>Bem-vindo ao Transform calculator!</h2>
        <p>
          No Transform calculator estão disponíveis as funcionalidades de calcular os parâmetros do transformador monofásico, calcular regulação de tensão e gerar diagrama fasorial.
        </p>
        <p>
          Para começar, você pode ir para a página de ensaios clicando no link
          abaixo:
        </p>
        <Link to="/parametros">Ir para Calcular Parâmetros</Link>
        <br></br>
        <Link to="/calculate-regulacao">Ir para Calcular Regulação de Tensão</Link>
        <br></br>
        <Link to="/modelo">Ir para Gerar Modelo 3D</Link>
      </div>
    </div>
  );
}

export default Home;
