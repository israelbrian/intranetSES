import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Uma biblioteca bastante popular para implementar notificações em aplicações React é o
// React-Toastify.

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormsEmailServerless = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    ddd: "",
    setor: "",
    cargo: "",
    superintendencia: "",
    ramal: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false); // Novo estado para controlar o envio

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    if (errors[id]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Por favor, insira seu nome completo.";
      isValid = false;
    }

    // Full Setor validation
    if (!formData.setor.trim()) {
      newErrors.setor = "Por favor, insira o nome do setor.";
      isValid = false;
    }

    // Full Cargo validation
    if (!formData.cargo.trim()) {
      newErrors.cargo = "Por favor, insira o nome do cargo.";
      isValid = false;
    }

    // Full Superintendency validation
    if (!formData.superintendencia.trim()) {
      newErrors.superintendencia = "Por favor, insira o nome da Superintendência.";
      isValid = false;
    }

    // Email validation (Improved Regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = "Por favor, insira seu endereço de e-mail.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "Por favor, insira um e-mail válido (ex: nome.sobrenome@dominio.com).";
      isValid = false;
    }

    // DDD validation
    if (!formData.ddd.trim()) {
      newErrors.ddd = "Por favor, insira o DDD.";
      isValid = false;
    } else if (!/^\d{2}$/.test(formData.ddd)) {
      newErrors.ddd = "O DDD deve conter exatamente 2 dígitos numéricos.";
      isValid = false;
    }

    // Ramal validation (Improved: must be 5 digits and only numbers)
    if (!formData.ramal.trim()) {
      newErrors.ramal = "Por favor, insira o ramal.";
      isValid = false;
    } else if (!/^\d{5}$/.test(formData.ramal)) {
      newErrors.ramal = "O ramal deve conter exatamente 5 dígitos numéricos.";
      isValid = false;
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Por favor, insira o assunto do e-mail.";
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Por favor, digite uma mensagem.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (validateForm()) {
      setIsSending(true); // Indica que o envio está em andamento
      // Simulação de envio bem-sucedido (remova ou substitua pelo seu envio real)
      setTimeout(() => {
        setIsSending(false);
        // Disparar envio de e-mail aqui usando os dados do React state
        const destinatario = 'suporteti.ca@saude.mg.gov.br,central.seplag@positivo.com.br';
        const assunto = formData.subject;
        const cco = formData.email; // E-mail do remetente no campo CCO (se necessário)
        // Corpo do e-mail pode incluir outros campos, como nome, e-mail, DDD, ramal, etc.
        const corpo = 
          `Nome Completo: ${formData.fullName}.\n` +
          `Cargo: ${formData.cargo}.\n` +
          `Setor: ${formData.setor}.\n` +
          `Superintendência: ${formData.superintendencia}.\n` +
          `E-mail: ${formData.email}\n` +
          `Ramal: (${formData.ddd}) ${formData.ramal}\n\n` +
          `Nº da Estação de Trabalho (HostName): ${window.location.hostname}. \nMesa: M[SEU ANDAR] - 0000.\n` +
          `para contato imediato, favor ligar para o ramal 60031/60027.\n\n` +
          `Natureza do contato: [DESCREVA AQUI A NATUREZA DO CONTATO - EXEMPLO: SOLICITAÇÃO DE SUPORTE TÉCNICO, INSTALAÇÃO, CONFIGURAÇÃO, MANUTENÇÃO DE DISPOSITIVOS E SISTEMAS, ETC.]\n\n` +
          `Necessidade de Atendimento: [DESCREVA AQUI A NECESSIDADE DE ATENDIMENTO - EXEMPLO: URGENTE, PRIORITÁRIO, NORMAL]\n\n` +
          `Descrição do Problema: [DESCREVA AQUI O PROBLEMA ENFRENTADO - EXEMPLO: ERRO NO SISTEMA, DIFICULDADE DE ACESSO, ETC.]\n\n` +
          `Número do chamado/protocolo (se aplicável): [INSIRA AQUI O NÚMERO DO CHAMADO, SE HOUVER]\n\n` +
          `Assunto: ${formData.subject}\n` +
          `Mensagem:\n${formData.message}\n` +
          `\n\n--\n` +
          `SECRETARIA DE ESTADO DE SAÚDE DE MINAS GERAIS - SES/MG.\n` +
          `MG Cidade Administrativa - Rodovia Papa João Paulo II, Nº 4143 - Serra Verde Belo Horizonte, MG - CEP 31630-903.\n` +
          `Telefone: 391660027 - www.saude.mg.gov.br.\n` +
          `Cidade Administrativa – Prédio Minas/12º andar – Lado Ímpar- Contato da equipe técnica Ramal: 60031/60027.\n` +
          `\n\n--\n` +
          `\n--\nEsta mensagem foi enviada via Formulário de Contato T.I SES do Portfólio da T.I da SES/MG.`+
          `\nAssessoria de Tecnologia da Informação - GNIST-ATI/SES-MG.`+
          `\nData/Hora do envio: ${new Date().toLocaleString()}\n` +
          `\nAssinatura: ANEXE A SUA ASSINATURA DE E-MAIL PADRÃO SES/MG.\n`;

        const assuntoCodificado = encodeURIComponent(assunto);
        const corpoCodificado = encodeURIComponent(corpo);

        const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?to=${destinatario}&cco=${cco}&subject=${assuntoCodificado}&body=${corpoCodificado}`;

        // Abre o e-mail pré-preenchido em nova aba
        console.log("Abrindo URL: ", outlookUrl); // Útil para depuração
        window.open(outlookUrl, '_blank');
        // Exibir notificação de sucesso
        toast.success("Sua mensagem foi enviada com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Resetar formulário
        setFormData({
          fullName: "",
          email: "",
          ddd: "",
          ramal: "",
          subject: "",
          message: "",
          setor: "",
          cargo: "",
          superintendencia: "",
        });
        setErrors({});
        setValidated(false);
      }, 1000);
    } else {
      toast.error(`Formulário contém erros de validação.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Adicionado foco automático no primeiro campo inválido
      const firstInvalidField = document.querySelector(".is-invalid");
      if (firstInvalidField) {
        firstInvalidField.focus();
        firstInvalidField.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }};

  return (
    <>
      <section className="container p-5 mt-5 bg-white section-duvidas rounded-3">
        <h1 className="display-6 text-center p-3 text-uppercase">
          Preencha o formulário para contato via e-mail
        </h1>
        <div className="row">
          {/* */}
          <div className="col-md-6">
            <Link to="/vpn" className="text-decoration-none">
              <div className="link-content mt-3">
                <img src="/src/img/logo-ses.png" alt="image" className="mt-5" />
              </div>
            </Link>
          </div>
          {/* */}
          <div className="col-md-6">
            <div className="link-content">
              <h3 className="p-2 mt-2 display-6">
                Formulário de contato T.I SES
              </h3>
              <form
                enctype="multipart/form-data"
                onSubmit={handleSubmit}
                className={`mt-3 row g-3 needs-validation ${
                  validated ? "was-validated" : ""
                }`}
                noValidate // Disable browser's default validation
              >
                <div className="col-md-4">
                  <label htmlFor="fullName" className="form-label">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validated && errors.fullName
                        ? "is-invalid"
                        : validated &&
                          !errors.fullName &&
                          formData.fullName.trim()
                        ? "is-valid"
                        : ""
                    }`}
                    id="fullName"
                    placeholder="Nome Completo"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  {validated && errors.fullName ? (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  ) : (
                    validated &&
                    !errors.fullName &&
                    formData.fullName.trim() && (
                      <div className="valid-feedback">Parece bom!</div>
                    )
                  )}
                </div>
                <div className="col-md-4">
                  <label htmlFor="email" className="form-label">
                    E-mail
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      validated && errors.email
                        ? "is-invalid"
                        : validated &&
                          !errors.email &&
                          formData.email.trim() &&
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                            formData.email
                          )
                        ? "is-valid"
                        : ""
                    }`}
                    id="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {validated && errors.email ? (
                    <div className="invalid-feedback">{errors.email}</div>
                  ) : (
                    validated &&
                    !errors.email &&
                    formData.email.trim() &&
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      formData.email
                    ) && <div className="valid-feedback">Parece bom!</div>
                  )}
                </div>
                <div className="col-md-4">
                  <label htmlFor="ramal" className="form-label">
                    Ramal
                  </label>
                  <div className="input-group">
                    <span className="input-group-text" id="inputGroupPrepend2">
                      DDD
                    </span>
                    <input
                      type="tel"
                      className={`form-control ${
                        validated && errors.ddd
                          ? "is-invalid"
                          : validated &&
                            !errors.ddd &&
                            formData.ddd.trim() &&
                            /^\d{2}$/.test(formData.ddd)
                          ? "is-valid"
                          : ""
                      }`}
                      id="ddd"
                      placeholder="DDD"
                      value={formData.ddd}
                      onChange={handleChange}
                      aria-describedby="inputGroupPrepend2"
                      required
                      maxLength="2"
                    />
                    <input
                      type="tel"
                      className={`form-control ${
                        validated && errors.ramal // Use errors.ramal here
                          ? "is-invalid"
                          : validated &&
                            !errors.ramal &&
                            formData.ramal.trim() &&
                            /^\d{5}$/.test(formData.ramal)
                          ? "is-valid"
                          : ""
                      }`}
                      id="ramal"
                      placeholder="Ramal"
                      value={formData.ramal}
                      onChange={handleChange}
                      required
                      maxLength="5"
                    />
                    {validated && (errors.ddd || errors.ramal) ? ( // Combine errors for display
                      <div className="invalid-feedback">
                        {errors.ddd || errors.ramal}
                      </div>
                    ) : (
                      validated &&
                      !errors.ddd &&
                      !errors.ramal &&
                      formData.ddd.trim() &&
                      /^\d{2}$/.test(formData.ddd) &&
                      formData.ramal.trim() &&
                      /^\d{5}$/.test(formData.ramal) && (
                        <div className="valid-feedback">Parece bom!</div>
                      )
                    )}
                  </div>
                </div>
                <div className="col-md-14">
                  <label htmlFor="cargo" className="form-label">
                    Cargo
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validated && errors.cargo
                        ? "is-invalid"
                        : validated &&
                          !errors.cargo &&
                          formData.cargo.trim()
                        ? "is-valid"
                        : ""
                    }`}
                    id="cargo"
                    placeholder="Cargo na SES"
                    value={formData.cargo}
                    onChange={handleChange}
                    required
                  />
                  {validated && errors.setor ? (
                    <div className="invalid-feedback">{errors.cargo}</div>
                  ) : (
                    validated &&
                    !errors.cargo &&
                    formData.cargo.trim() && (
                      <div className="valid-feedback">Parece bom!</div>
                    )
                  )}
                </div>
                <div className="col-md-14">
                  <label htmlFor="setor" className="form-label">
                    Setor
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validated && errors.setor
                        ? "is-invalid"
                        : validated &&
                          !errors.setor &&
                          formData.setor.trim()
                        ? "is-valid"
                        : ""
                    }`}
                    id="setor"
                    placeholder="Setor na SES"
                    value={formData.setor}
                    onChange={handleChange}
                    required
                  />
                  {validated && errors.setor ? (
                    <div className="invalid-feedback">{errors.setor}</div>
                  ) : (
                    validated &&
                    !errors.setor &&
                    formData.setor.trim() && (
                      <div className="valid-feedback">Parece bom!</div>
                    )
                  )}
                </div>
                <div className="col-md-14">
                  <label htmlFor="superintendencia" className="form-label">
                    Superintendência
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validated && errors.superintendencia
                        ? "is-invalid"
                        : validated &&
                          !errors.superintendencia &&
                          formData.superintendencia.trim()
                        ? "is-valid"
                        : ""
                    }`}
                    id="superintendencia"
                    placeholder="Setor na SES"
                    value={formData.superintendencia}
                    onChange={handleChange}
                    required
                  />
                  {validated && errors.superintendencia ? (
                    <div className="invalid-feedback">{errors.superintendencia}</div>
                  ) : (
                    validated &&
                    !errors.superintendencia &&
                    formData.superintendencia.trim() && (
                      <div className="valid-feedback">Parece bom!</div>
                    )
                  )}
                </div>
                <div className="col-md-14">
                  <label htmlFor="subject" className="form-label">
                    Assunto do e-mail
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      validated && errors.subject
                        ? "is-invalid"
                        : validated &&
                          !errors.subject &&
                          formData.subject.trim()
                        ? "is-valid"
                        : ""
                    }`}
                    id="subject"
                    placeholder="Assunto"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  {validated && errors.subject ? (
                    <div className="invalid-feedback">{errors.subject}</div>
                  ) : (
                    validated &&
                    !errors.subject &&
                    formData.subject.trim() && (
                      <div className="valid-feedback">Parece bom!</div>
                    )
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Mensagem
                  </label>
                  <textarea
                    cols={3}
                    rows={9}
                    className={`form-control ${
                      validated && errors.message
                        ? "is-invalid"
                        : validated &&
                          !errors.message &&
                          formData.message.trim()
                        ? "is-valid"
                        : ""
                    }`}
                    id="message"
                    placeholder="Mensagem - descrição completa e detalhada do problema. Lembre-se de colocar a sua assinatura de e-mail simples."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  {validated && errors.message ? (
                    <div className="invalid-feedback">{errors.message}</div>
                  ) : (
                    validated &&
                    !errors.message &&
                    formData.message.trim() && (
                      <div className="valid-feedback">Parece bom!</div>
                    )
                  )}
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    value="Enviar"
                    disabled={isSending}
                  >
                    {isSending ? "Enviando..." : "Enviar Formulário"}
                  </button>
                  <button
                    className="btn btn-primary"
                    type="reset"
                    value="Limpar Formulário"
                    disabled={isSending}
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      // Resetar formulário
                      setFormData({
                        fullName: "",
                        email: "",
                        ddd: "",
                        ramal: "",
                        subject: "",
                        message: "",
                        setor: "",
                        cargo: "",
                        superintendencia: "",
                      });
                    }}
                  >
                    {isSending ? "Enviando..." : "Enviar Formulário"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Container para as notificações Toastify */}
      <ToastContainer />
    </>
  )};
// Exporta o componente FormsEmailServerless
// export default FormsEmailServerless;
export default FormsEmailServerless;

// Obs.: Antes: file: null e type === "file" ? files[0] : value. Isso só pegava o primeiro arquivo.
// O estado foi mudado para files: [] (um array vazio) e no handleChange, quando type === "file", agora é Array.from(files).
// Isso garante que todos os arquivos selecionados pelo usuário sejam armazenados no estado formData.files.

// O id do input de arquivo é "file" e o name também é "file". No backend (server.js), o Multer está configurado com upload.array("file", 5).
// Essa correspondência é crucial para que o Multer receba os arquivos corretamente em req.files

// Validação de Arquivos (Múltiplos):
// - O arquivo deve ser válido (ALLOWED_FILE_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE) para que o formulário seja válido.
// - O arquivo deve ser válido (f.type === "image/jpeg" && f.size <= 1024 * 1024 * 5) // 5MB

// Antes: A validação (if (formData.file)) verificava apenas o formData.file, que era um único objeto (ou null).

// Depois: A validação agora itera sobre formData.files usando forEach e every para garantir que todos os arquivos selecionados (se houver) estejam dentro dos ALLOWED_FILE_TYPES e MAX_FILE_SIZE.
// Se qualquer arquivo falhar na validação, um erro é registrado.

// Construção do FormData para Envio:

// Antes: O loop for (const key in formData) incluía formData.file sem tratamento específico para múltiplos arquivos, o que poderia enviar [Object File] como string ou apenas o primeiro arquivo
// Depois: Agora, o loop for (const key in formData) exclui a chave files inicialmente.
// Em seguida, um novo loop if (formData.files && formData.files.length > 0) itera sobre formData.files e
// usa formDataToSend.append("file", file) para adicionar cada arquivo individualmente com a chave "file" ao FormData.
// Isso é o que o Multer espera para upload.array("file", 5).

// Substituição dos alerts por toasts:
// Todas as chamadas alert("Sua mensagem foi enviada com sucesso!"); e alert("Erro ao enviar formulário!"); e as mensagens de erro detalhadas
// foram substituídas por chamadas diretas a toast.success(), toast.error().

// Limpeza do Input de Arquivo após Envio:
// Adicionei fileInput.value = ""; após o sucesso do envio. Isso é necessário porque o React não zera automaticamente o valor de inputs de type="file".

// ToastContainer no JSX:
// Confirmei que ToastContainer está presente no seu JSX, o que é essencial para que as notificações sejam renderizadas na tela.
// Ele é o componente que "segura" e exibe os toasts.
