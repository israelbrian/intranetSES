import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const Siga_me = () => {
  return (
    <div>
      <Navbar />
      {/* <!-- INICIO GUIA VPN --> */}
      <section class="container p-5 mt-5 bg-white rounded-3">
        <div class="row">
          <h2 class="p-2 mt-2 display-5 text-center">Siga-me</h2>
          <br />
          <br />
          <div class="col-md-12 mt-3">
            <h3 class="lead fw-normal fs-4">
              SISTEMA DE DESVIO DE CHAMADAS - SIGA-ME
            </h3>
            <p class="lead mt-4">
              O sistema "SIGA-ME" é uma funcionalidade liberada pela PRODEMGE,
              para o uso enquanto durar a interdição dos Prédios Minas e Gerais.
            </p>

            <h3 class="lead fw-normal fs-4 mt-4">ORIENTAÇÕES</h3>

            <ul class="list-group mt-4">
              <li class="list-group-item">
                Quando alguém liga para o seu ramal, o sistema encaminha
                automaticamente a chamada para o número que você irá definir na
                sua solicitação. (Isso permite que você receba chamadas em
                diferentes locais, mantendo apenas um número de telefone).
              </li>
              <li class="list-group-item">
                O sistema SIGA-ME funciona no período de 24x7 (finais de semana
                e feriados).
              </li>
              <li class="list-group-item">
                Você só poderá receber ligações e não poderá efetua-las.
              </li>
            </ul>

            <h3 class="lead fw-normal fs-4 mt-4">
              PROCEDIMENTO PARA SOLICITAÇÃO:
            </h3>
            <p class="lead mt-4">
              A ativação do sistema deve ser solicitada a TI da SES via e-mail
              com as seguintes informações:
            </p>
            <ul class="list-group mt-4">
              <li class="list-group-item">Nome do Usuário;</li>

              <li class="list-group-item">Setor;</li>

              <li class="list-group-item">Ramal a ser desviado;</li>

              <li class="list-group-item">Celular:</li>

              <li class="list-group-item">Login de rede;</li>

              <li class="list-group-item">
                Para desativação você devera enviar os mesmos dados orientados
                acima para abertura e colocar no assunto desativação do sistema
                SIGA-ME.
              </li>
            </ul>

            <p class="lead mt-4 p-3 rounded-1 bg-light text-danger">
              Em resumo, o "Siga-me" é uma ferramenta útil para garantir que
              você não perca nenhuma chamada importante, mesmo quando estiver
              fora da SES ou indisponível em seu telefone principal.
            </p>
          </div>
        </div>
      </section>

      {/* <!-- FIM INICIO GUIA DE SOLUÇÕES RAPIDAS - SUPORTES SES  --> */}
      <Footer />
    </div>
  );
};

export default Siga_me;
