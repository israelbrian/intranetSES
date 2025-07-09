import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Index from "./pages/index";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Importa os estilos do AOS

import { useState } from "react";
import Loader from "./components/loading";

function App() {
  const [isLoading, setIsLoading] = useState(true); // variáveis de estado para o controle do loading das páginas web

  // Animação com a biblioteca AOS js
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duração da animação em milissegundos
      once: true, // Anima apenas uma vez ao rolar
    });

    // Simula um carregamento (ex: chamada de API)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 segundos

    return () => clearTimeout(timer); // Limpa o timer
  }, []);

  return (
    <body class="bg-light">
      <div>
        {isLoading ? (
          <div className="loading">
            <Loader />
          </div>
        ) : null}
      </div>
      <div className="App">
        <Navbar />
        <Index />
        <Footer />
      </div>
    </body>
  );
}
export default App;
