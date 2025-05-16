import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../../Assets/Styles/Pages/HomePage.css"; // ajusta path se necessário

const HomePage = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/db_iscternship/verEmpresas/")
      .then(res => {
        let lista = res.data || [];
        // Só empresas com imagem válida
        lista = lista.filter(emp => !!emp.imagem);
        lista = lista.slice(0, 3);
        setEmpresas(lista);
      });
  }, []);

  return (
    <div className="home-main-bg">
      <div className="home-carousel-container">
        <div id="empresasCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {empresas.length === 0 ? (
              <div className="carousel-item active">
                <img
                  src="/static/profile_pics/default.png"
                  className="d-block w-100 carousel-img"
                  alt="Empresa"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Empresa exemplo</h5>
                  <p>Adiciona empresas para aparecerem aqui!</p>
                </div>
              </div>
            ) : (
              empresas.map((empresa, idx) => (
                <div key={empresa.id} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
                  <img
                    src={
                      empresa.imagem.startsWith("http")
                        ? empresa.imagem
                        : `http://localhost:8000${empresa.imagem}`
                    }
                    className="d-block w-100 carousel-img"
                    alt={empresa.nome_empresa}
                  />
                </div>
              ))
            )}
          </div>
          {empresas.length > 1 && (
            <>
              <button className="carousel-control-prev" type="button" data-bs-target="#empresasCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#empresasCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Próxima</span>
              </button>
            </>
          )}
        </div>
        <div className="home-description">
          <h2>Bem-vindo ao Iscternship!</h2><br />
          Aqui encontra e gere estágios de forma simples.<br />
          <span style={{ fontSize: "0.97em", color: "#cad6fa" }}>
            Empresas podem publicar vagas e acompanhar candidaturas. <br />
            Candidatos podem explorar oportunidades e gerir candidaturas num só local.
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
