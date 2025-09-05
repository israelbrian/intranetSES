import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import icon_excel from "../icons/excel-icon.png";
import icon_pdf from "../icons/pdf-icon.png";
import icon_word from "../icons/word-icon.png";

const VPN = () => {
  return (
    <>
      {/* <!-- INICIO GUIA VPN --> */}
      <Navbar />
      <section class="container p-5 mt-5 bg-white rounded-3">
        <div class="row">
          <h2 class="p-2 mt-2 display-5 text-center" data-aos="fade-up">
            VPN ( Acesso Remoto)
          </h2>
          <div class="col-md-12 mt-3">
            <h3 class="lead fw-normal fs-4" data-aos="fade-up">
              O que é VPN?
            </h3>
            <p class="lead mt-4 pb-4">
              Para realizar algumas demandas especificas alguns servidores
              precisam de ter o acesso remoto a sua maquina da SES e com isso se
              vê necessário a solicitação de acesso a VPN.
            </p>

            <h3 class="lead fw-normal fs-4" data-aos="fade-up">
              Todo mundo tem que usar a VPN?
            </h3>
            <p class="lead mt-4 pb-4" data-aos="fade-up">
              Não, para os usuários que usam apenas o SEI e o E-mail, não ha
              necessidade de utilização da VPN.
              <br />
              <br />O acesso a VPN deve ser solicitado se o usuário necessitar
              utilizar o Terminal Prodemge, serviços que só funcionem dentro da
              rede governo, e acesso aos arquivos em rede.
            </p>

            <h3 class="lead fw-normal fs-4" data-aos="fade-up">
              Como solicitar o acesso?
            </h3>
            <p class="lead mt-4 fst-italic" data-aos="fade-up">
              Para solicitar o acesso a VPN basta:
            </p>
            <ul class="list-group mt-4" data-aos="fade-up">
              <li class="list-group-item">
                Encaminhar um e-mail com a planilha preenchida com seus dados
                (exceto o campo MOBILIDADE) para o e-mail
                suporteti.ca@saude.mg.gov.br.
              </li>
              <li class="list-group-item">Seguir o passo a passo do manual.</li>
            </ul>

            <br />
            <p class="lead mt-4 pb-4" data-aos="fade-up">
              <sapn class="fw-bold">OBS:</sapn> A conexão de Área de Trabalho
              Remota (RDP) funciona apenas durante 8h diárias. Com isso
              aconselhamos á se desconectar da Área de Trabalho Remota em seu
              horário de almoço (1h) para que você consiga usar a mesma durante
              as 8h de serviço. Lembrando que tem a forma correta de se
              desconectar da Área de Trabalho Remota para não desligar a sua
              máquina presente na SES e ficar sem acesso. Caso tenha duvida siga
              o passo a passo no material disponibilizado “Como se desconectar
              de uma Área de Trabalho Remota em sua casa 2”.
            </p>

            <p
              class="lead mt-4 pb-4 p-3 rounded-1 bg-light text-danger"
              data-aos="fade-up"
            >
              Logo abaixo está disponibilizado os arquivos referentes a
              solicitação de acesso a VPN e a boas praticas de ultilização. Para
              realizar o download dos mesmos basta clicar nas reticencias na
              frente de cada arquivo e clicar em baixar (conforme exemplo
              abaixo).
            </p>

            {/* <!-- LINKS MANUAIS  --> */}
            <div class="row">
              <div class="col-4 d-flex">
                <div
                  class="p-4 d-flex justify-content-between align-items-center"
                  data-aos="fade-up"
                >
                  <img src={icon_excel} class="img-fluid icon-word" />
                  <a
                    href="https://saudemg.sharepoint.com/:x:/r/sites/ATI/_layouts/15/Doc.aspx?sourcedoc=%7B37747BAF-7D05-436E-8D67-0A57803A969C%7D&file=Planilha_Solicita%C3%A7%C3%A3o_de_acesso_VPN.xlsx&action=default&mobileredirect=true"
                    class="text-decoration-none"
                    target="_blank"
                  >
                    <button
                      type="button"
                      class="btn btn-outline-success fs-7 ms-2"
                    >
                      Solicitação de acesso VPN
                    </button>
                  </a>
                  <i class="fa-solid fa-chevron-right ms-5 text-success"></i>
                </div>
              </div>

              <div class="col-4 d-flex">
                <div
                  class="p-4 d-flex justify-content-between align-items-center"
                  data-aos="fade-up"
                >
                  <img src={icon_pdf} class="img-fluid icon-word" />
                  <a
                    href="https://saudemg.sharepoint.com/sites/ATI/Documentos%20Compartilhados/Forms/Sistema%20Reserva%20de%20Estaes.aspx?id=%2Fsites%2FATI%2FDocumentos%20Compartilhados%2FVPN%2FManual%20de%20acesso%20a%20VPN%2DCA%2EPDF&parent=%2Fsites%2FATI%2FDocumentos%20Compartilhados%2FVPN"
                    class="text-decoration-none"
                    target="_blank"
                  >
                    <button
                      type="button"
                      class="btn btn-outline-danger fs-7 ms-2"
                    >
                      Manual de acesso a VPN
                    </button>
                  </a>
                  <i class="fa-solid fa-chevron-right ms-5 text-danger"></i>
                </div>
              </div>

              <div class="col-4 d-flex">
                <div
                  class="p-4 d-flex justify-content-between align-items-center"
                  data-aos="fade-up"
                >
                  <img src={icon_word} class="img-fluid icon-word" />
                  <a
                    href="https://saudemg.sharepoint.com/sites/ATI/Documentos%20Compartilhados/Forms/Sistema%20Reserva%20de%20Estaes.aspx?id=%2Fsites%2FATI%2FDocumentos%20Compartilhados%2FVPN%2FManual%20de%20acesso%20a%20VPN%2DCA%2EPDF&parent=%2Fsites%2FATI%2FDocumentos%20Compartilhados%2FVPN"
                    class="text-decoration-none"
                    target="_blank"
                  >
                    <button
                      type="button"
                      class="btn btn-outline-primary fs-7 ms-2"
                    >
                      Como desconectar da VPN
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--FIM INICIO GUIA DE SOLUÇÕES RAPIDAS - SUPORTES SES-- > */}
      <Footer />
    </>
  );
};

export default VPN;
