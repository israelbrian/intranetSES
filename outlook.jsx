import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import img_error_outlook from "../img/erro_outlook.png";
import icon_excel from "../icons/excel-icon.png";
import icon_pdf from "../icons/pdf-icon.png";
import icon_word from "../icons/word-icon.png";

const Outlook = () => {
  return (
    <>
      <Navbar />
      {/* <!-- INICIO GUIA VPN --> */}
      <section className="container p-5 mt-5 bg-white rounded-3">
        <div className="row">
          <h2 className="p-2 mt-2 display-5 text-center" data-aos="fade-up">
            Erros ao logar no Outlook / Teams / Sharepoint
          </h2>
          <br />
          <br />
          <div className="col-md-12 mt-3" data-aos="fade-up">
            <h3 className="lead fw-normal fs-4" data-aos="fade-up">
              Erros frequentes
            </h3>

            <img
              src={img_error_outlook}
              alt="Image"
              className="img_error_outlook"
            />

            {/* <p className="lead mt-4 pb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              incidunt ad magnam quasi tempora quos corrupti quod autem
              voluptas, porro fuga ab perspiciatis voluptates magni. Non
              excepturi rerum maxime consequuntur.
            </p> */}

            <h3 className="lead fw-normal fs-4">Possíveis causas</h3>

            <ul className="list-group mt-4">
              <li className="list-group-item">
                Credenciais Incorretas ou Expiradas
              </li>
              <li className="list-group-item">
                O usuário pode ter digitado a senha errada ou a sessão expirou.
              </li>
              <li className="list-group-item">
                A conta pode estar bloqueada ou desativada.
              </li>
              <li className="list-group-item">
                Dados locais corrompidos (OST/PST) ou cache de autenticação
                inválido.
              </li>
            </ul>

            <h3 className="lead fw-normal fs-4 mt-4">
              Possíveis resoluções simples
            </h3>

            <ul className="list-group mt-4">
              <li className="list-group-item">
                Teste em um navegador anônimo (Ctrl+Shift+N no Chrome) para
                descartar conflitos de extensões.
              </li>
              <li className="list-group-item">
                Extensões (como bloqueadores de anúncios) podem interferir.
                Teste no Edge, Firefox ou Safari.
              </li>
              <li className="list-group-item">
                Limpe o cache do navegador (veja como limpar o cache no Chrome
                logo abaixo).
              </li>
            </ul>

            <h3 className="lead fw-normal fs-4 mt-4">
              Como Limpar o Cache do Google Chrome (Passo a Passo)
            </h3>
            <br />

            <ol className="list-group list-group-numbered">
              <li className="list-group-item">
                Abra o Google Chrome - Clique no ícone do Chrome no seu
                computador (área de trabalho, menu Iniciar ou barra de tarefas).
              </li>
              <li className="list-group-item">
                Acesse o Menu de Configurações - No canto superior direito da
                tela, clique nos três pontos verticais (⋮) para abrir o menu.{" "}
                <br />
                No menu que aparecer, selecione "Configurações" (ou "Settings").
              </li>
              <li className="list-group-item">
                Vá até a Seção "Privacidade e Segurança" No lado esquerdo da
                tela, clique em "Privacidade e segurança". <br />
                No lado direito, localize e clique em "Limpar dados de
                navegação" (ou "Clear browsing data").
              </li>
              <li className="list-group-item">
                Selecione o Que Deseja Limpar Uma nova janela será aberta com
                opções de limpeza. <br />
                Marque a caixa ao lado de "Imagens e arquivos em cache" (ou
                "Cached images and files").
              </li>

              <p className="lead mt-4 pb-4 p-3 rounded-1 border border-danger bg-light text-danger">
                (Opcional) Se quiser, marque também:
                <br />
                "Histórico de navegação" (apaga os sites visitados).
                <br />
                "Cookies e outros dados do site" (limpa logins e preferências
                salvas).
              </p>

              <li className="list-group-item">
                Escolha o Intervalo de Tempo - No campo "Intervalo de tempo",
                selecione: "Todo o período" para limpar tudo ou escolha um
                período específico (última hora, dia, semana, etc.).
              </li>
              <li className="list-group-item">
                Confirme a Limpeza - Clique no botão "Limpar dados" (ou "Clear
                data"). Aguarde alguns segundos enquanto o Chrome remove os
                arquivos.
              </li>
              <li className="list-group-item">
                Reinicie o Chrome - Feche e abra o navegador novamente para
                garantir que as alterações tenham efeito.
              </li>
            </ol>
            <br />
            <br />
            <h3 className="lead fw-normal fs-4">Como solicitar o acesso?</h3>
            <p className="lead mt-4 fst-italic">
              Para solicitar o acesso a VPN basta:
            </p>
            <ul className="list-group mt-4">
              <li className="list-group-item">
                Encaminhar um e-mail com a planilha preenchida com seus dados
                (exceto o campo MOBILIDADE) para o e-mail
                suporteti.ca@saude.mg.gov.br.
              </li>
              <li className="list-group-item">
                Seguir o passo a passo do manual.
              </li>
            </ul>

            <p className="lead mt-4 pb-4">
              <sapn className="fw-bold">OBS:</sapn> A conexão de Área de
              Trabalho Remota (RDP) funciona apenas durante 8h diárias. Com isso
              aconselhamos á se desconectar da Área de Trabalho Remota em seu
              horário de almoço (1h) para que você consiga usar a mesma durante
              as 8h de serviço. Lembrando que tem a forma correta de se
              desconectar da Área de Trabalho Remota para não desligar a sua
              máquina presente na SES e ficar sem acesso. Caso tenha duvida siga
              o passo a passo no material disponibilizado “Como se desconectar
              de uma Área de Trabalho Remota em sua casa 2”.
            </p>

            <p className="lead mt-4 pb-4 p-3 rounded-1 bg-light text-danger">
              Logo abaixo está disponibilizado os arquivos referentes a
              solicitação de acesso a VPN e a boas praticas de ultilização. Para
              realizar o download dos mesmos basta clicar nas reticencias na
              frente de cada arquivo e clicar em baixar (conforme exemplo
              abaixo).
            </p>

            {/* <!-- LINKS MANUAIS  --> */}
            <div className="row">
              <div className="col-4 d-flex">
                <div className="p-4 d-flex justify-content-between align-items-center">
                  <img src={icon_excel} className="img-fluid icon-word" />
                  <a
                    href="https://saudemg.sharepoint.com/:x:/r/sites/ATI/_layouts/15/Doc.aspx?sourcedoc=%7B37747BAF-7D05-436E-8D67-0A57803A969C%7D&file=Planilha_Solicita%C3%A7%C3%A3o_de_acesso_VPN.xlsx&action=default&mobileredirect=true"
                    className="text-decoration-none"
                    target="_blank"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-success fs-7 ms-2"
                    >
                      Solicitação de acesso VPN
                    </button>
                  </a>
                  <i className="fa-solid fa-chevron-right ms-5 text-success"></i>
                </div>
              </div>

              <div className="col-4 d-flex">
                <div className="p-4 d-flex justify-content-between align-items-center">
                  <img src={icon_pdf} className="img-fluid icon-word" />
                  <a
                    href="https://saudemg.sharepoint.com/sites/ATI/Documentos%20Compartilhados/Forms/Sistema%20Reserva%20de%20Estaes.aspx?id=%2Fsites%2FATI%2FDocumentos%20Compartilhados%2FVPN%2FManual%20de%20acesso%20a%20VPN%2DCA%2EPDF&parent=%2Fsites%2FATI%2FDocumentos%20Compartilhados%2FVPN"
                    className="text-decoration-none"
                    target="_blank"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-danger fs-7 ms-2"
                    >
                      Manual de acesso a VPN
                    </button>
                  </a>
                  <i className="fa-solid fa-chevron-right ms-5 text-danger"></i>
                </div>
              </div>

              <div className="col-4 d-flex">
                <div className="p-4 d-flex justify-content-between align-items-center">
                  <img src={icon_word} className="img-fluid icon-word" />
                  <a
                    href="https://saudemg.sharepoint.com/sites/ATI/Documentos%20Compartilhados/Forms/Sistema%20Reserva%20de%20Estaes.aspx?id=%2Fsites%2FATI%2FDocumentos%20Compartilhados%2FVPN%2FManual%20de%20acesso%20a%20VPN%2DCA%2EPDF&parent=%2Fsites%2FATI%2FDocumentos%20Compartilhados%2FVPN"
                    className="text-decoration-none"
                    target="_blank"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-primary fs-7 ms-2"
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
      {/* <!-- FIM INICIO GUIA DE SOLUÇÕES RAPIDAS - SUPORTES SES  --> */}
      <Footer />
    </>
  );
};

export default Outlook;
