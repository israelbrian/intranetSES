import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import "./contato.css";
import "../App.css";
import { Link } from "react-router-dom";
import Forms_email from "../components/forms_email";
import Arcodeao_teams from "../components/arcodeao_teams";

const Contato = () => {
  return (
    <>
      <Navbar />
      {/* <!-- INICIO DUVIDAS FREQUENTES --> */}
      <section className="container p-5 mt-5 bg-white section-duvidas rounded-3">
        <h1 className="display-4 text-center p-3 text-uppercase">
          Entre em contato conosco
        </h1>

        <div className="row">
          {/* <!-- Logo SES  --> */}
          <div className="col-md-6">
            <Link to="/vpn" className="text-decoration-none">
              <div className="link-content mt-3">
                <img src="src/img/logo-ses.png" alt="image" className="mt-5" />
              </div>
            </Link>
          </div>
          {/* <!-- CO WORKING  --> */}
          <div className="col-md-6">
            <div className="link-content">
              {/* <!-- <h3 className="p-2 mt-2 display-6">E-mail equipe TI</h3>
                        <p className="lead mt-4 text-primary ms-3">suporteti.ca@saude.mg.gov.br</p> --> */}
              <h3 className="p-2 mt-2 display-6">
                Equipe Técnica / E-mail / Ramal{" "}
              </h3>
              <small>
                ChatBot_ATI_SES:{" "}
                <a
                  href="https://app.chatvolt.ai/@chat_bot_ti_ses"
                  target="_blank"
                >
                  Clique Aqui!
                </a>
              </small>
              <ul className="list-group mt-4">
                <li className="list-group-item">
                  Alexander Spelta /
                  <a href="mailto:alexander.spelta@saude.mg.gov.br">
                    alexander.spelta@saude.mg.gov.br
                  </a>
                  / 31 3916-0031
                </li>
                <li className="list-group-item">
                  Edinei Goncalves Araujo /
                  <a href="mailto:edinei.araujo@saude.mg.gov.br">
                    edinei.araujo@saude.mg.gov.br
                  </a>
                  / 31 3916-0031
                </li>
                <li className="list-group-item">
                  Wesley Francisco Soares Fernandes /
                  <a href="mailto:wesley.fernandes@saude.mg.gov">
                    wesley.fernandes@saude.mg.gov
                  </a>
                  / 31 3916-0817
                </li>
                <li className="list-group-item">
                  Pedro Nascimento Rodrigues /
                  <a href="mailto:pedro.nascimento@saude.mg.gov">
                    pedro.nascimento@saude.mg.gov
                  </a>
                  / 31 3916-0817
                </li>
                <li className="list-group-item">
                  Israel Brian Pimenta Gonçalves Araújo /
                  <a href="mailto:israel.goncalves@saude.mg.gov">
                    israel.goncalves@saude.mg.gov
                  </a>
                  / 31 3916-0031
                </li>
                <li className="list-group-item">
                  João Victor Parreiras Soares /
                  <a href="mailto:joao.soares@saude.mg.gov.br">
                    joao.soares@saude.mg.gov.br
                  </a>
                  / 31 3916-0031
                </li>
                <li className="list-group-item">
                  E-mail equipe TI:{" "}
                  <a href="mailto:suporteti.ca@saude.mg.gov.br">
                    suporteti.ca@saude.mg.gov.br
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <br />
          <div className="col-md-6">
            <div className="link-content">
              <h3 className="p-2 mt-2 display-6">
                Equipe Técnica Microsoft Teams App
              </h3>
              <br />
              <Arcodeao_teams />
            </div>
          </div>
        </div>
      </section>
      <br />
      <Forms_email />
      <br />
      <section className="container p-5 mt-5 bg-white section-duvidas rounded-3">
        <h1 className="display-6 text-center p-3 text-uppercase">
          ASSINATURA DE E-MAIL CORPORATIVO PADRÃO SES - MG
        </h1>
        <div className="row">
          <div className="col-md-6">
            <div className="link-content">
              <h4 className="p-2 mt-2 display-8 flex justify-content-center align-items-center">
                Caso não possua uma assinatura de e-mail corporativa da SES -
                MG. Clique aqui para gerar uma!
              </h4>
              <a
                href="http://assinaturaemail.saude.mg.gov.br/"
                target="_blank"
                className="btn btn-primary p-2 m-3"
              >
                Criar Assinatura Digital
              </a>
              <br />
            </div>
          </div>
        </div>
      </section>
      <br />
      <Footer />
    </>
  );
};

export default Contato;
