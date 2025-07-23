import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios"; // Importa a biblioteca Axios

const Forms_email = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    ddd: "",
    ramal: "",
    subject: "",
    message: "",
    file: null,
  });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false); // Novo estado para controlar o envio

  // Define allowed file types and max size
  const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
  ];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

  const handleChange = (e) => {
    const { id, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "file" ? files[0] : value,
    }));
    // Clear individual error when user starts typing again
    if (errors[id]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Por favor, insira seu nome completo.";
      isValid = false;
    }

    // Email validation (Improved Regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = "Por favor, insira seu endereço de e-mail.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "Por favor, insira um e-mail válido (ex: seu.nome@dominio.com).";
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

    // Ramal validation (Improved: must be 4 digits and only numbers)
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

    // File validation
    if (formData.file) {
      // Only validate if a file is selected
      if (!ALLOWED_FILE_TYPES.includes(formData.file.type)) {
        newErrors.file =
          "Tipo de arquivo não permitido. Apenas JPG, PNG, PDF, DOC, DOCX, XLS, XLSX, TXT são aceitos.";
        isValid = false;
      }
      if (formData.file.size > MAX_FILE_SIZE) {
        newErrors.file = `Arquivo muito grande. O tamanho máximo permitido é ${
          MAX_FILE_SIZE / (1024 * 1024)
        } MB.`;
        isValid = false;
      }
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
      try {
        const formDataToSend = new FormData(); // Usar FormData para enviar arquivos
        for (const key in formData) {
          // 1. Adicionar os campos de texto ao FormData
          formDataToSend.append(key, formData[key]);
        }
        // No caso do arquivo, `formData.file` será um objeto File.
        // O Multer no backend saberá como lidar com ele.
        // Se `formData.file` for null, ele será appended como 'null' string.
        // O backend precisa lidar com isso se o campo for opcional.

        // Supondo que 'formData' contenha os seus dados de texto do formulário (nome, email, etc.)
        // e que 'selectedFiles' seja um array de objetos File (obtidos de um input type="file" multiple)

        // <input type="file" name="files" multiple>
        // Quando o usuário seleciona arquivos, eles geralmente vêm como um FileList
        // Você precisaria converter isso para um Array se for iterar

        if (formData.file) {
          const selectedFiles = formData.file ? Array.from(formData.file) : []; // Transforma FileList em Array;
          if (selectedFiles.length > 0) {
            selectedFiles.forEach((file) => {
              formDataToSend.append("file", file);
              console.log(formDataToSend);
            });
          } else {
            console.log("Nenhum arquivo selecionado para upload.");
          }
        }

        // Para inspecionar o FormData (você não verá os arquivos diretamente no console.log)
        // Você pode iterar sobre ele para ver as chaves e valores:
        console.log("Conteúdo do FormData:");
        for (let pair of formDataToSend.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        const response = await axios.post(
          "http://localhost:5000/send-email",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Axios pode definir isso automaticamente com FormData, mas explicitar é bom.
            },
          }
        );

        // Axios lança um erro para status 4xx/5xx, então `response.data` já é o que você quer no sucesso.
        console.log("Formulário enviado com sucesso!", response.data);
        alert("Sua mensagem foi enviada com sucesso!");
        // Resetar formulário
        setFormData({
          fullName: "",
          email: "",
          ddd: "",
          ramal: "",
          subject: "",
          message: "",
          file: null,
        });
        setErrors({});
        setValidated(false);
      } catch (error) {
        console.error("Erro ao enviar formulário:", error);
        // Axios coloca a resposta de erro em `error.response.data`
        if (error.response) {
          // Erro de resposta do servidor (status 4xx ou 5xx)
          console.error("Dados do erro do servidor:", error.response.data);
          alert(
            `Ocorreu um erro ao enviar sua mensagem: ${
              error.response.data.message || "Erro desconhecido do servidor."
            }`
          );
        } else if (error.request) {
          // A requisição foi feita, mas nenhuma resposta foi recebida
          console.error("Erro de requisição (sem resposta):", error.request);
          alert(
            "Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde."
          );
        } else {
          // Algo aconteceu na configuração da requisição que disparou um erro
          console.error("Erro de configuração Axios:", error.message);
          alert(`Ocorreu um erro inesperado: ${error.message}`);
        }
      } finally {
        setIsSending(false); // Finaliza o estado de envio
      }
    } else {
      console.log("Formulário contém erros de validação.");
      // Adicionado foco automático no primeiro campo inválido
      const firstInvalidField = document.querySelector(".is-invalid");
      if (firstInvalidField) {
        firstInvalidField.focus();
        firstInvalidField.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

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
                <img src="src/img/logo-ses.png" alt="image" className="mt-5" />
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
                <div className="mb-3">
                  <label htmlFor="file" className="form-label">
                    Anexar Arquivo (Opcional - Max 5MB, JPG, PNG, PDF, DOC,
                    DOCX, XLS, XLSX, TXT)
                  </label>
                  <input
                    type="file"
                    multiple
                    className={`form-control ${
                      validated && errors.file
                        ? "is-invalid"
                        : validated &&
                          !errors.file &&
                          formData.file &&
                          ALLOWED_FILE_TYPES.includes(formData.file.type) &&
                          formData.file.size <= MAX_FILE_SIZE
                        ? "is-valid"
                        : ""
                    }`}
                    id="file"
                    name="file"
                    aria-label="file example"
                    onChange={handleChange}
                  />
                  {validated && errors.file ? (
                    <div className="invalid-feedback">{errors.file}</div>
                  ) : (
                    validated &&
                    !errors.file &&
                    formData.file &&
                    ALLOWED_FILE_TYPES.includes(formData.file.type) &&
                    formData.file.size <= MAX_FILE_SIZE && (
                      <div className="valid-feedback">Arquivo válido!</div>
                    )
                  )}
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSending}
                  >
                    {isSending ? "Enviando..." : "Enviar Formulário"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Forms_email;
