require("dotenv").config(); // Carrega as variáveis de ambiente do .env
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Para manipular arquivos

const app = express();
const port = process.env.PORT || 5000;

// Configuração do CORS para permitir requisições do seu frontend React
app.use(
  cors({
    origin: "http://localhost:5173", // **AJUSTE PARA A URL DO SEU APLICATIVO REACT**
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware para parsing de JSON (se você fosse enviar JSON do frontend)
// app.use(express.json());

// Configuração do Multer para upload de arquivos
// CUIDADO: Este é um exemplo simples. Em produção, você pode querer armazenar arquivos em um serviço de nuvem (S3, GCS)
const upload = multer({
  dest: "uploads/", // Diretório temporário para armazenar arquivos
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB, igual ao frontend
  fileFilter: (req, file, cb) => {
    // Validação de tipo de arquivo no backend (CRÍTICO!)
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de arquivo não permitido no servidor."), false);
    }
  },
});

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: process.env.EMAIL_PORT === "465", // true para 465, false para outras portas como 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Em alguns ambientes de desenvolvimento, pode ser útil. Em produção, use true.
  },
});

// Rota para o envio de e-mail
app.post("/contact_email", upload.single("file"), async (req, res) => {
  // Dados do formulário estão em req.body
  const { fullName, email, ddd, ramal, subject, message } = req.body;
  const attachedFile = req.file; // Arquivo enviado via Multer

  // ** Validação de dados (REPETIR VALIDAÇÕES DO FRONTEND AQUI É CRÍTICO PARA SEGURANÇA) **
  // Exemplo simples:
  if (!fullName || !email || !subject || !message || !ddd || !ramal) {
    console.error("Erro de validação: Campos obrigatórios faltando.");
    if (attachedFile && fs.existsSync(attachedFile.path)) {
      fs.unlinkSync(attachedFile.path); // Remover arquivo temporário
    }
    return res
      .status(400)
      .json({ message: "Por favor, preencha todos os campos obrigatórios." });
  }

  // Validação de e-mail no backend
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    console.error("Erro de validação: Formato de e-mail inválido.");
    if (attachedFile && fs.existsSync(attachedFile.path)) {
      fs.unlinkSync(attachedFile.path);
    }
    return res.status(400).json({ message: "Formato de e-mail inválido." });
  }

  // Validação de DDD e Ramal
  if (!/^\d{2}$/.test(ddd)) {
    console.error("Erro de validação: DDD inválido.");
    if (attachedFile && fs.existsSync(attachedFile.path)) {
      fs.unlinkSync(attachedFile.path);
    }
    return res
      .status(400)
      .json({ message: "DDD inválido. Deve ter 2 dígitos." });
  }
  if (!/^\d{5}$/.test(ramal)) {
    console.error("Erro de validação: Ramal inválido.");
    if (attachedFile && fs.existsSync(attachedFile.path)) {
      fs.unlinkSync(attachedFile.path);
    }
    return res
      .status(400)
      .json({ message: "Ramal inválido. Deve ter 5 dígitos." });
  }

  // Construção do corpo do e-mail
  const mailOptions = {
    from: process.env.EMAIL_USER, // O remetente do e-mail (pode ser o seu e-mail do servidor)
    to: process.env.TARGET_EMAIL, // O e-mail setorial da SES
    replyTo: email, // Permite responder diretamente ao e-mail do remetente do formulário
    subject: `Contato TI SES - ${subject}`,
    html: `
      <h2>Nova Mensagem do Formulário de Contato</h2>
      <p><strong>Nome Completo:</strong> ${fullName}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Ramal:</strong> (${ddd}) ${ramal}</p>
      <p><strong>Assunto:</strong> ${subject}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
      <br>
      <small>Este e-mail foi enviado automaticamente pelo formulário de contato.</small>
    `,
  };

  // Anexar arquivo se existir
  if (attachedFile) {
    mailOptions.attachments = [
      {
        filename: attachedFile.originalname,
        path: attachedFile.path, // Caminho temporário do arquivo
      },
    ];
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail enviado:", info.messageId);

    // Sistema de Logs (exemplo simples)
    const logEntry = {
      timestamp: new Date().toISOString(),
      status: "success",
      senderEmail: email,
      subject: subject,
      messageId: info.messageId,
      // Você pode adicionar mais detalhes aqui, como o nome do arquivo, etc.
    };
    console.log("LOG:", logEntry);
    // Em um sistema real, você salvaria isso em um banco de dados ou serviço de log.

    res.status(200).json({
      message: "E-mail enviado com sucesso!",
      messageId: info.messageId,
      // Você pode retornar mais detalhes, como o status de entrega (se o serviço suportar)
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    // Sistema de Logs para erros
    const errorLogEntry = {
      timestamp: new Date().toISOString(),
      status: "failure",
      senderEmail: email,
      subject: subject,
      error: error.message,
    };
    console.error("LOG ERRO:", errorLogEntry);

    res.status(500).json({
      message: "Erro ao enviar o e-mail. Tente novamente mais tarde.",
      error: error.message,
    });
  } finally {
    // Remover o arquivo temporário após o envio (ou falha)
    if (attachedFile && fs.existsSync(attachedFile.path)) {
      fs.unlinkSync(attachedFile.path);
    }
  }
});

app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});
