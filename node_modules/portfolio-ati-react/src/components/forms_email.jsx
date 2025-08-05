import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios"; // Importa a biblioteca Axios

// Uma biblioteca bastante popular para implementar notificações em aplicações React é o
// React-Toastify.

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forms_email = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    ddd: "",
    ramal: "",
    subject: "",
    message: "",
    // CORREÇÃO: file agora será um array para múltiplos arquivos
    file: [], // inicializado como array vazio
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
      // CORREÇÃO: Se for input de arquivo, armazena TODOS os arquivos em 'files'
      [id]: type === "file" ? Array.from(files) : value, // Array.from(files) para pegar todos  --- Transforma FileList em Array
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
    // Validação para múltiplos arquivos
    if (formData.file && formData.file.length > 0) {
      // Only validate if a file is selected
      formData.file.forEach((file) => {
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          newErrors.file =
            "Tipo de arquivo não permitido. Apenas JPG, PNG, PDF, DOC, DOCX, XLS, XLSX, TXT são aceitos.";
          isValid = false;
        }
        if (file.size > MAX_FILE_SIZE) {
          newErrors.file = `Arquivo muito grande. O tamanho máximo permitido é ${
            MAX_FILE_SIZE / (1024 * 1024)
          } MB.`;
          isValid = false;
        }
      });
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

        // Adicionar campos de texto ao FormData
        for (const key in formData) {
          // 1. Adicionar os campos de texto ao FormData

          // Excluir a chave 'files' por enquanto, ela será tratada separadamente
          if (key !== "file") {
            formDataToSend.append(key, formData[key]);
          }
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

        // Adicionar múltiplos arquivos ao FormData
        // O nome do campo "file" (singular) DEVE ser o mesmo que você configurou no Multer no backend:
        // upload.array("file", 5)
        if (formData.file && formData.file.length > 0) {
          formData.file.forEach((file) => {
            //  Iterar sobre o array de arquivos
            formDataToSend.append("file", file);
            console.log(formDataToSend);
          });
        }

        // Para inspecionar o FormData (você não verá os arquivos diretamente no console.log)
        // Você pode iterar sobre ele para ver as chaves e valores:
        console.log("Conteúdo do FormData:\n");
        for (let pair of formDataToSend.entries()) {
          console.log(
            pair[0] + ": " + (pair[1] instanceof File ? pair[1].name : pair[1])
          ); // Para arquivos, pair[1] será um objeto File, então logar o nome.
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
        // alert("Sua mensagem foi enviada com sucesso!");
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
          files: [],
        });
        const fileInput = document.getElementById("file");
        if (fileInput) {
          fileInput.value = "";
        }
        setErrors({});
        setValidated(false);
      } catch (error) {
        console.error("Erro ao enviar formulário:", error);
        // Axios coloca a resposta de erro em `error.response.data`
        if (error.response) {
          // Erro de resposta do servidor (status 4xx ou 5xx)
          console.error("Dados do erro do servidor:", error.response.data);
          // alert(
          //   `Ocorreu um erro ao enviar sua mensagem: ${
          //     error.response.data.message || "Erro desconhecido do servidor."
          //   }`
          // );
          toast.error(
            `Ocorreu um erro ao enviar sua mensagem: ${
              error.response.data.message || "Erro desconhecido do servidor."
            }`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        } else if (error.request) {
          // A requisição foi feita, mas nenhuma resposta foi recebida
          console.error("Erro de requisição (sem resposta):", error.request);
          // alert(
          //   "Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde."
          // );
          toast.error(
            "Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        } else {
          // Algo aconteceu na configuração da requisição que disparou um erro
          console.error("Erro de configuração Axios:", error.message);
          // alert(`Ocorreu um erro inesperado: ${error.message}`);
          toast.error(`Ocorreu um erro inesperado: ${error.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } finally {
        setIsSending(false); // Finaliza o estado de envio
      }
    } else {
      console.log("Formulário contém erros de validação.");
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
                          formData.file.length > 0 && // Verificação para múltiplos arquivos
                          // Validação para cada arquivo na lista
                          formData.file.every(
                            (f) =>
                              ALLOWED_FILE_TYPES.includes(f.type) &&
                              f.size <= MAX_FILE_SIZE
                          )
                        ? "is-valid"
                        : ""
                    }`}
                    id="file" // ID 'file' para corresponder ao name="file" no backend
                    name="file" // Nome 'file' para corresponder ao 'upload.array("file", 5)' no backend com o Multer
                    aria-label="file example"
                    onChange={handleChange}
                  />
                  {validated && errors.file ? (
                    <div className="invalid-feedback">{errors.file}</div>
                  ) : (
                    validated &&
                    !errors.file &&
                    formData.file.length > 0 &&
                    formData.file.every(
                      (f) =>
                        ALLOWED_FILE_TYPES.includes(f.type) &&
                        f.size <= MAX_FILE_SIZE
                    ) && <div className="valid-feedback">Arquivo válido!</div>
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
      {/* Container para as notificações Toastify */}
      <ToastContainer />
    </>
  );
};

export default Forms_email;

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
