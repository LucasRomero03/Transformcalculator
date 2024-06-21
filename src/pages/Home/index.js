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
        
        <p>
          Este sistema web analisa transformadores monofásicos e fornece
          informações sobre seus parâmetros, regulação de tensão e diagrama
          fasorial.
        </p>
        <p>
          Para começar, você pode ir para a página de ensaios clicando no link
          abaixo:
        </p>
        <Link to="/ensaios">Ir para Ensaios</Link>
      </div>
    </div>
  );
}

export default Home;
