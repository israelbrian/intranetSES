import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you have react-router-dom for the Link component
import "../App.css";

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

  // Define allowed file types and max size
  const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "text/plain", // .txt
    // Add more types as needed, but avoid executable types
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
      newErrors.validationDefault01 = "Por favor, insira seu nome completo.";
      isValid = false;
    }

    // Email validation (Improved Regex)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = "Por favor, insira seu endereço de e-mail.";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "Por favor, insira um e-mail válido (ex: seu.nome@dominio.gov.br).";
      isValid = false;
    } else {
      newErrors.email =
        "Por favor, insira um e-mail (ex: nome.sobrenome@dominio.gob.br).";
      isValid = false;
    }

    // DDD validation
    if (!formData.ddd.trim() || !/^\d{2}$/.test(formData.ddd)) {
      newErrors.ddd = "Por favor, insira um DDD válido (2 dígitos).";
      isValid = false;
    }

    // Ramal validation
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
      newErrors.validationDefault03 = "Por favor, insira o assunto do e-mail.";
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.validationTextarea = "Por favor, digite uma mensagem.";
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

    // If you want to make the file field required, uncomment this:
    /*
    else {
      newErrors.file = "Por favor, selecione um arquivo.";
      isValid = false;
    }
    */

    // File validation (optional, adjust as needed)
    // if (!formData.file) {
    //   newErrors.file = "Por favor, selecione um arquivo.";
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    event.stopPropagation(); // Stop event propagation

    setValidated(true); // Set validated to true to show validation feedback

    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log("Formulário enviado com sucesso!", formData);
      // Here you would typically send the data to a server
      alert("Formulário enviado com sucesso!");
      // Optionally reset the form
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
    } else {
      console.log("Formulário contém erros de validação.");
    }
  };

  return (
    <>
      <section className="container p-5 mt-5 bg-white section-duvidas rounded-3">
        <h1 className="display-6 text-center p-3 text-uppercase">
          Preencha o formulário para contato via e-mail
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
          {/* <!-- E-MAIL FORM  --> */}
          <div className="col-md-6">
            <div className="link-content">
              <h3 className="p-2 mt-2 display-6">
                Formulário de contato T.I SES
              </h3>
              <form
                action=""
                method="post"
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
                      validated && errors.validationDefault01
                        ? "is-invalid"
                        : validated &&
                          !errors.validationDefault01 &&
                          formData.fullName.trim()
                        ? "is-valid"
                        : ""
                    }`}
                    required
                    id="fullName"
                    placeholder="Nome Completo"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {validated && errors.validationDefault01 ? (
                    <div className="invalid-feedback">
                      {errors.validationDefault01}
                    </div>
                  ) : (
                    validated &&
                    !errors.validationDefault01 &&
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
                      validated && errors.validationDefault02
                        ? "is-invalid"
                        : validated &&
                          !errors.validationDefault02 &&
                          formData.email.trim() &&
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                        ? "is-valid"
                        : ""
                    }`}
                    id="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {validated && errors.validationDefault02 ? (
                    <div className="invalid-feedback">
                      {errors.validationDefault02}
                    </div>
                  ) : (
                    validated &&
                    !errors.validationDefault02 &&
                    formData.email.trim() &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                      <div className="valid-feedback">Parece bom!</div>
                    )
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
                      id="ddd" // Separate DDD field for easier validation
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
                        validated && errors.validationDefaulRamal
                          ? "is-invalid"
                          : validated &&
                            !errors.validationDefaulRamal &&
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
                    {validated &&
                    (errors.ddd || errors.validationDefaulRamal) ? (
                      <div className="invalid-feedback">
                        {errors.ddd || errors.validationDefaulRamal}
                      </div>
                    ) : (
                      validated &&
                      !errors.ddd &&
                      !errors.validationDefaulRamal &&
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
                      validated && errors.validationDefault03
                        ? "is-invalid"
                        : validated &&
                          !errors.validationDefault03 &&
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
                  {validated && errors.validationDefault03 ? (
                    <div className="invalid-feedback">
                      {errors.validationDefault03}
                    </div>
                  ) : (
                    validated &&
                    !errors.validationDefault03 &&
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
                      validated && errors.validationTextarea
                        ? "is-invalid"
                        : validated &&
                          !errors.validationTextarea &&
                          formData.message.trim()
                        ? "is-valid"
                        : ""
                    }`}
                    id="message"
                    placeholder="Mensagem"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                  {validated && errors.validationTextarea ? (
                    <div className="invalid-feedback">
                      {errors.validationTextarea}
                    </div>
                  ) : (
                    validated &&
                    !errors.validationTextarea &&
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
                    aria-label="file example"
                    onChange={handleChange}
                  />
                  {validated && errors.file ? (
                    <div className="invalid-feedback">{errors.file}</div>
                  ) : (
                    validated &&
                    !errors.file &&
                    formData.file && (
                      <div className="valid-feedback">Parece bom!</div>
                    )
                  )}
                </div>
                <div className="col-12">
                  <button className="btn btn-primary" type="submit">
                    Enviar Formulário
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
