import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import icon_excel from "../icons/excel-icon.png";
import icon_pdf from "../icons/pdf-icon.png";

const Jabber = () => {
  return (
    <>
      <Navbar />
      {/* <!-- INICIO GUIA VPN --> */}
      <section className="container p-5 mt-5 bg-white rounded-3">
        <div className="row">
          <h2 className="p-2 mt-2 display-5 text-center" data-aos="fade-up">
            Jabber
          </h2>
          <div className="col-md-12 mt-3">
            <h3 className="lead fw-normal fs-4" data-aos="fade-up">
              O que é o Jabber?
            </h3>
            <p className="lead mt-4" data-aos="fade-up">
              Bom, com a situação atual do prédio todos os servidores foram
              alocados em teletrabalho e com isso vem a utilização do Jabber
              para realizar as ligações. Ele é instalado em smartphones, e é
              possível virtualizar o ramal utilizado na CA, permitindo realizar
              e receber ligações em qualquer localidade, tendo como requisito
              uma conexão de internet (wi-fi ou dados móveis).
            </p>

            <h3 className="lead fw-normal fs-4 mt-4" data-aos="fade-up">
              Para solicitar o acesso ao Jabber basta:
            </h3>
            <ul className="list-group mt-4" data-aos="fade-up">
              <li className="list-group-item">
                Encaminhar um e-mail com a Planilha preenchida com seus dados
                para suporteti.ca@saude.mg.gov.br.
              </li>
              <li className="list-group-item">
                Seguir o passo a passo do Manual.
              </li>
            </ul>

            <p
              className="lead mt-4 p-3 rounded-1 bg-light text-danger"
              data-aos="fade-up"
            >
              Logo abaixo está disponibilizado os arquivos referentes a
              solicitação de acesso ao Jabber. Para realizar o download dos
              mesmos basta clicar nas reticencias na frente de cada arquivo e
              clicar em baixar.
            </p>

            {/* <!-- LINKS MANUAIS  --> */}
            <div className="row">
              <div className="col-4 d-flex">
                <div
                  className="p-4 d-flex justify-content-between align-items-center"
                  data-aos="fade-up"
                >
                  <img src={icon_excel} className="img-fluid icon-word" />
                  <a
                    href="https://saudemg.sharepoint.com/:x:/r/sites/ATI/_layouts/15/Doc.aspx?sourcedoc=%7B775C19F8-DA48-4D7F-9677-FB6DE2CF902C%7D&file=Planilha_Cadastro_Jabber%20.xlsx&action=default&mobileredirect=true"
                    className="text-decoration-none"
                    target="_blank"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-success fs-7 ms-2"
                    >
                      Planilha cadastro Jabber
                    </button>
                  </a>
                  <i className="fa-solid fa-chevron-right ms-5 text-success"></i>
                </div>
              </div>

              <div className="col-4 d-flex">
                <div
                  className="p-4 d-flex justify-content-between align-items-center"
                  data-aos="fade-up"
                >
                  <img src={icon_pdf} className="img-fluid icon-word" />
                  <a
                    href="https://saudemg.sharepoint.com/sites/ATI/Documentos%20Compartilhados/Forms/Sistema%20Reserva%20de%20Estaes.aspx?id=%2Fsites%2FATI%2FDocumentos%20Compartilhados%2FJABBER%2FMANUAL%20JABBER%2Epdf&parent=%2Fsites%2FATI%2FDocumentos%20Compartilhados%2FJABBER"
                    className="text-decoration-none"
                    target="_blank"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-danger fs-7 ms-2"
                    >
                      Manual Jabber
                    </button>
                  </a>
                  <i className="fa-solid fa-chevron-right ms-5 text-danger"></i>
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

export default Jabber;
