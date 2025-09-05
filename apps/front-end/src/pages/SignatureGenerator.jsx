import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import icon_excel from "../icons/excel-icon.png";
import icon_signature from "../icons/signature-icon.PNG";

const SignatureGenerator = () => {
  return (
    <>
      {/* <!-- INICIO GUIA VPN --> */}
      <Navbar />
      <section className="container p-5 mt-5 bg-white rounded-3">
        <div className="row">
          <h2 className="p-2 mt-2 display-5 text-center" data-aos="fade-up">
            Gerador de assinatura de e-mail
          </h2>
          <div className="col-md-12 mt-3">
            <h3 className="lead fw-normal fs-4" data-aos="fade-up">
              Agora ficou mais fácil gerar sua assinatura de e-mail
            </h3>
            <p className="lead mt-4 pb-4">
              Hoje existe uma nova forma de gerar sua assinatura de e-mail no
              padrão SES. Chega de perder tempo formatando o tamanho da
              assinatura em seu outlook ou ter problemas com a planilha excel.
            </p>

            <h3 className="lead fw-normal fs-4" data-aos="fade-up">
              Atualização obrigatória da assinatura de e-mail
            </h3>
            <p className="lead mt-4 pb-4" data-aos="fade-up">
              A partir da data XX/XX todos os usuarios terão de atualizar a sua
              assinatura para o novo padrão de acordo com o governo XX.
              <br />
              <br />O acesso a VPN deve ser solicitado se o usuário necessitar
              utilizar o Terminal Prodemge, serviços que só funcionem dentro da
              rede governo, e acesso aos arquivos em rede.
            </p>

            <h3 className="lead fw-normal fs-4" data-aos="fade-up">
              Como faço para realizar o acesso?
            </h3>
            <p className="lead mt-4 fst-italic" data-aos="fade-up">
              Para solicitar o acesso a VPN basta:
            </p>
            <p className="lead mt-4 fst-italic" data-aos="fade-up">
              Basta acessar a aplicação atraves dos links rapidos ou acessar o
              link abaixo.
            </p>

            {/* <ul className="list-group mt-4" data-aos="fade-up">
              <li className="list-group-item">
                Basta acessar a aplicação atraves dos links rapidos ou acessar o link abaixo.
              </li>
              <li className="list-group-item">Seguir o passo a passo do manual.</li>
            </ul> */}

            {/* <p className="lead mt-4 pb-4" data-aos="fade-up">
              <span className="fw-bold me-2">OBS:</span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste in
              eum architecto sequi quis! Quas voluptatem optio excepturi,
              explicabo facilis at deleniti omnis? Recusandae quam quisquam
              mollitia similique officiis distinctio. 
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste in
              eum architecto sequi quis! Quas voluptatem optio excepturi,
              explicabo facilis at deleniti omnis? Recusandae quam quisquam
              mollitia similique officiis distinctio.
            </p> */}

            {/* <p
              className="lead mt-4 pb-4 p-3 rounded-1 bg-light text-danger"
              data-aos="fade-up"
            >
              Logo abaixo está disponibilizado os arquivos referentes a
              solicitação de acesso a VPN e a boas praticas de ultilização. Para
              realizar o download dos mesmos basta clicar nas reticencias na
              frente de cada arquivo e clicar em baixar (conforme exemplo
              abaixo).
            </p> */}

            {/* <!-- LINKS MANUAIS  --> */}

            <div className="row">
              <div className="col-4 d-flex">
                <div
                  className="p-4 d-flex justify-content-between align-items-center"
                  data-aos="fade-up"
                >
                  <img src={icon_signature} className="img-fluid icon-word" />
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
            </div>
          </div>
        </div>
      </section>
      {/* <!--FIM INICIO GUIA DE SOLUÇÕES RAPIDAS - SUPORTES SES-- > */}
      <Footer />
    </>
  );
};

export default SignatureGenerator;
