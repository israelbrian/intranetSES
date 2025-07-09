import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import icon from "../icons/word-icon.png";
import "./fhemig.css";

const Fhemig = () => {
  return (
    <>
      <Navbar />
      {/* <!-- INICIO GUIA VPN --> */}
      <section className="container p-5 mt-5 bg-white rounded-3">
        <div className="row">
          <h2 className="p-2 mt-2 display-5 text-center" data-aos="fade-up">
            Sistema Reserva de Estações Co-Working FHEMIG
          </h2>
          <div className="col-md-12 mt-3" data-aos="fade-up">
            <h3 className="lead fw-normal fs-4" data-aos="fade-up">
              Em quais casos se vê necessario o Co-working Fhemig?
            </h3>
            <p className="lead mt-4 " data-aos="fade-up">
              Com o fechamento do prédio da cidade administrativa temos a
              possibilidade de trabalhar presencialmente no prédio da Fhemig.
              Porém quem precisar trabalhar nas estações alocadas na Fhemig terá
              de fazer reservas pelo nosso sistema de reservas.
            </p>

            <p
              className="lead mt-4 p-3 rounded-1 bg-light text-danger"
              data-aos="fade-up"
            >
              Em resumo o CO-WORKING só se faz necessario caso haja a
              impossibilidade de utilizar o espaço presente no predio da CAMG{" "}
              <br />
              <span className="fw-bold">
                (10°, 12° e 13° andar - Prédio Minas).
              </span>
            </p>

            <p className="fs-5 fw-bolder text-danger mt-4" data-aos="fade-up">
              Para realizar a reserva basta seguir o passo a passo do manual
              abaixo:
            </p>

            {/* <!-- LINKS MANUAIS  --> */}
            <div className="row">
              <div className="col-md-12 d-flex" data-aos="fade-up">
                <div className="p-4 d-flex justify-content-between align-items-center">
                  <img src={icon} className="img-fluid icon-word" />
                  <a
                    href="https://saudemg.sharepoint.com/:x:/r/sites/ATI/_layouts/15/Doc.aspx?sourcedoc=%7B37747BAF-7D05-436E-8D67-0A57803A969C%7D&file=Planilha_Solicita%C3%A7%C3%A3o_de_acesso_VPN.xlsx&action=default&mobileredirect=true"
                    className="text-decoration-none"
                    target="_blank"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-primary fs-7 ms-2"
                    >
                      Manual reserva Co-Working FHEMIG
                    </button>
                  </a>
                  {/* <!-- <i className="fa-solid fa-chevron-right ms-5 text-danger"></i> --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- FIM INICIO GUIA DE SOLUÇÕES RAPIDAS - SUPORTES SES  --> */}
      <Footer />
    </>
  );
};

export default Fhemig;
