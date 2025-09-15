import React from "react";

const GuiaSolucoesRapidasSuporteti = () => {
  return (
    <>
      {/* <!-- INICIO SOLUÇÕES RAPIDAS - SUPORTES SES --> */}
      <section className="container p-5 mt-5 bg-white rounded-3">
        <div className="row">
          <h3 className="p-2 mt-2 display-5 text-center" data-aos="fade-up">
            GUIA DE SOLUÇÕES RAPIDAS
          </h3>
          <br />
          <br />
          <br />
          <br />
          <div className="col-md-12 mt-3">
            {/* <!-- <img src="src/img/notebook.jpg" alt="" className="img-1"> -->
                <!-- <p className="lead text-secondary mt-4">O sistema "SIGA-ME" é uma funcionalidade liberada pela PRODEMGE,
                        para o uso enquanto durar a interdição dos Prédios Minas e Gerais ...</p>
                    <p>LER MAIS</p> --> */}
            {/* <!-- 1 --> */}
            <h2 className="lead fw-normal fs-4" data-aos="fade-up">
              1 - Procedimento VPN - Máquina desligada/Erro no CISCO:
            </h2>
            <p className="lead mt-4 pb-4" data-aos="fade-up">
              Lembre-se: O CISCO conectou normalmente?
              <br /> <br />
              Se aparecer "Login Failed" é senha incorreta ou expirada. (Ir para
              o segundo tópico) Se aparecer uma tela vermelha escrito{" "}
              <a className="text-decoration-none text-danger fw-bolder">
                Untrusted server blocked!
              </a>{" "}
              Deve-se clicar em{" "}
              <a className="text-decoration-none text-danger fw-bolder">
                Change Options
              </a>{" "}
              desmarcando a última opção{" "}
              <a className="text-decoration-none text-danger fw-bolder">
                Block untrusted servers
              </a>
              . Agora é só clicar em Connect Anyway que irá acessar normalmente.
              <br />
              <br /> Estando tudo certo com o Cisco será necessário: <br />
              <a className="text-decoration-none fw-bolder text-dark">
                Abrir chamado no 0800 595 2001 - Positivo
              </a>{" "}
              Informando Hostname ou mesa e andar. Sem estes dados não
              localizamos sua estação. <br />
              <br />A SES disponibiliza o trabalho presencial no prédio GERAIS
              DA CAMG ou no Coworking da Fhemig em BH para os servidores com
              trabalho que seja ESSENCIAL uso da rede do governo. Necessário
              realizar o agendamento do PC no SERVICOSCA para a CAMG ou no
              Android\powerapps para os pcs da Fhemig.
            </p>
          </div>
          <br />
          {/* <!-- 2 --> */}
          <div className="col-md-12 mt-3">
            <h2 className="lead fw-normal fs-4" data-aos="fade-up">
              2 - PROCEDIMENTO PARA SOLICITAR TROCA DE SENHA DE REDE OU E-MAIL
            </h2>
            <p className="lead mt-4" data-aos="fade-up">
              <ol className="list-group list-group-numbered">
                <li className="list-group-item">
                  Abrir chamado no 0800 - 595 2001 (Positivo), se estiver
                  presencial ligar no 9;
                </li>

                <li className="list-group-item">
                  Informar ao atendente para abrir chamado de troca de senha de
                  rede e/ou de e-mail (Lembre-se de anotar o número do chamado).
                </li>

                <li className="list-group-item">
                  Para a maior segurança dos usuários o reset de senha é feito
                  APENAS na mesa do Suporte TI ao informar o numero do chamado.
                </li>

                <li className="list-group-item">
                  O proprio usuário irá escolher a sua nova senha seguinto o
                  padrão de: (1 letra maiuscula, 1 caractere especial, 1 numero,
                  minimo de 8 caracteres).
                </li>
              </ol>
            </p>
            <p className="fw-normal fs-4 text-danger mt-4">
              Saiba mais:
              <a
                className="text-decoration-none"
                target="_blank"
                href="https://br.norton.com/blog/how-to/how-to-secure-your-passwords"
              >
                <button type="button" className="btn btn-outline-primary ms-2">
                  Proteção de senhas
                </button>
              </a>
            </p>
          </div>
          {/* <!-- 3 --> */}
          <div className="col-md-12 mt-3">
            <h2 className="lead fw-normal fs-4" data-aos="fade-up">
              3 - PROCEDIMENTO PARA REDEFINIÇÃO DO AUTHENTICATOR
            </h2>
            <p className="lead mt-4" data-aos="fade-up">
              Importante: A Intendência da CAMG, responsável pelo PORTAL CA,
              implantou a autenticação de múltiplos fatores. Ou seja, quando
              acessar sua conta x ou m em um novo dispositivo deve ser
              habilitado no app Authenticator da Microsoft. A senha é a mesma do
              computador da CAMG e não pode estar expirada.
              <br />
              Passo a passo:
              <ol className="list-group list-group-numbered">
                <li className="list-group-item">
                  Solicitar o reset do seu usuário de rede do Microsoft
                  Authenticator para a Intendência através do ramal 9 (0800 595
                  2001);
                </li>

                <li className="list-group-item">
                  Desinstalar o aplicativo Microsoft Authenticator do celular e
                  logo após instalar novamente;
                </li>

                <li className="list-group-item">
                  Após a instalação o usuário deve abrir uma janela anônima no
                  Chrome e ir para o seguinte endereço: office.com e no campo
                  entrar digitar seu usuário de rede exemplo: x........ ou
                  m...... e sua senha do computador
                </li>

                <li className="list-group-item">
                  Após deverá seguir os passos solicitados pelo Authenticator e
                  ler o QRCode.
                </li>

                <li className="list-group-item">
                  Inclua o seu usuário via leitura do QRCode ou pelo sinal de +
                  no aplicativo no canto superior direito.
                </li>
              </ol>
              <p className="fw-normal fs-4 text-danger mt-4" data-aos="fade-up">
                Saiba mais:
                <a
                  className="text-decoration-none"
                  target="_blank"
                  href="https://www.youtube.com/shorts/-nrmPY4I668"
                >
                  <button
                    type="button"
                    className="btn btn-outline-primary ms-2"
                  >
                    Tutorial Authenticator
                  </button>
                </a>
              </p>
            </p>
          </div>
          {/* <!-- 4 --> */}
          <div className="col-md-12 mt-3">
            <h2 className="lead fw-normal fs-4" data-aos="fade-up">
              4 - PROCEDIMENTO DE CRIAÇÃO DE CAIXA COMPARTILHADA
            </h2>
            <p className="lead mt-4" data-aos="fade-up">
              Para prosseguir com a criação de uma caixa compartilhada, por
              favor, forneça as seguintes informações:
              <ul className="list-group">
                <li className="list-group-item">
                  O nome que você gostaria de atribuir à nova caixa
                  compartilhada. <br />
                  Certifique-se de que o nome seja claro e representativo para
                  facilitar a identificação e o uso.
                </li>

                <li className="list-group-item">
                  Administradores da caixa compartilhada: Indique o nome de dois
                  usuários que serão responsáveis pela administração da caixa
                  compartilhada. Os administradores terão permissões para
                  gerenciar a caixa, incluindo a adição e remoção de usuários.
                </li>

                <li className="list-group-item">
                  Usuários da caixa compartilhada: Liste os nomes dos usuários
                  que terão acesso à caixa compartilhada. Esses usuários serão
                  capazes de visualizar e interagir com o conteúdo da caixa
                  conforme as permissões estabelecidas pelos administradores.
                  Certifique-se de fornecer todas as informações de forma
                  completa para garantir que a configuração da caixa atenda às
                  suas necessidades de forma eficiente. IMPORTANTE: Para
                  retirada ou inserção de novos membros no e-mail compartilhado
                  o adm. da conta deve enviar a solicitação ou estar copiado no
                  e-mail.
                </li>
              </ul>
            </p>

            <p className="fw-normal fs-4 text-danger mt-4" data-aos="fade-up">
              Saiba mais:
              <a
                className="text-decoration-none"
                target="_blank"
                href="https://www.youtube.com/watch?v=ZNLGsSn31T4"
              >
                <button type="button" className="btn btn-outline-primary ms-2">
                  Tutorial Caixa Compartilhada
                </button>
              </a>
            </p>
          </div>
          {/* <!-- 5 --> */}
          <div className="col-md-12 mt-3">
            <h2 className="lead fw-normal fs-4" data-aos="fade-up">
              5 - PROCEDIMENTO ERRO NO APP JABBER:
            </h2>
            <p className="lead mt-4 pb-4" data-aos="fade-up">
              Primeiro passo deve ser verificado se a senha de login da CAMG
              está correta e não expirada. Para isto deve-se tentar entrar no
              cisco VPN ou no PORTAL CA. Se não conseguir acesso deve-se abrir
              chamado 0800 595 2001 solicitando reset de senha de rede.
              <br />
              <br />
              Se não resolver deve-se apagar os dados ou reinstalar o
              aplicativo. Se mesmo assim conectar e não ficar status verde no
              nome do usuario e exibir o ramal e o login será necessário abrir
              um chamado na Positivo para verificar a conta Jabber do Usuario.
              0800 595 2001
            </p>

            <p className="fw-normal fs-4 text-danger" data-aos="fade-up">
              Saiba mais:
              <a
                className="text-decoration-none"
                target="_blank"
                href="https://www.youtube.com/watch?v=JAdEmoU6_o4"
              >
                <button
                  type="button"
                  className="btn btn-outline-primary ms-2 ms-2"
                >
                  Tutorial Jabber
                </button>
              </a>
              <a
                className="text-decoration-none"
                target="_blank"
                href="https://saudemg.sharepoint.com/sites/ATI/Documentos%20Compartilhados/Forms/Sistema%20Reserva%20de%20Estaes.aspx?id=%2Fsites%2FCentraldeComunicadosSuporteTI%2FDocumentos%20Compartilhados%2FJABBER%2FMANUAL%20JABBER%2Epdf&parent=%2Fsites%2FCentraldeComunicadosSuporteTI%2FDocumentos%20Compartilhados%2FJABBER"
              >
                <button type="button" className="btn btn-outline-primary ms-2">
                  Manual Jabber
                </button>
              </a>
              <a
                className="text-decoration-none"
                target="_blank"
                href="https://saudemg.sharepoint.com/:x:/r/sites/ATI/_layouts/15/Doc.aspx?sourcedoc=%7BFD169C1D-72BA-4E00-A13B-FCBBCE02557B%7D&file=Planilha_Cadastro_Jabber.xlsx&action=default&mobileredirect=true"
              >
                <button type="button" className="btn btn-outline-primary ms-2">
                  Planilha Solicitação Jabber
                </button>
              </a>
            </p>
          </div>
        </div>
      </section>
      {/* <!-- FIM GUIA DE SOLUÇÕES RAPIDAS  --> */}
    </>
  );
};

export default GuiaSolucoesRapidasSuporteti;
