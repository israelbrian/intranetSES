const dotenv = require("dotenv"); // Carrega as variáveis de ambiente do .env
dotenv.config({ path: "./credenciais_email.env" });
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // Para manipular arquivos

const app = express();
const port = process.env.PORT || 5000;
// --- Verificação de Variáveis de Ambiente Essenciais ---
// É CRÍTICO que estas variáveis estejam configuradas corretamente no seu arquivo .env
if (
  !process.env.EMAIL_HOST ||
  !process.env.EMAIL_PORT ||
  !process.env.EMAIL_USER ||
  !process.env.EMAIL_PASS ||
  !process.env.TARGET_EMAIL ||
  !process.env.FRONTEND_URL ||
  !process.env.PORT
) {
  console.error(
    "ERRO CRÍTICO: Variáveis de ambiente de e-mail não configuradas corretamente no .env."
  );
  console.error(
    "Verifique: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, TARGET_EMAIL"
  );
  console.log(process.env.EMAIL_HOST);
  console.log(process.env.EMAIL_PORT);
  console.log(process.env.EMAIL_USER);
  console.log(process.env.EMAIL_PASS);
  console.log(process.env.TARGET_EMAIL);
  console.log(process.env.FRONTEND_URL);
  console.log(process.env.PORT);
  process.exit(1); // Encerra o processo se as variáveis essenciais estiverem faltando
}

// Configuração do CORS para permitir requisições do seu frontend React
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // **AJUSTE PARA A URL DO SEU APLICATIVO REACT EM PRODUÇÃO**
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware para parsing de JSON (se você fosse enviar JSON do frontend)
app.use(express.json());

// --- Configuração do Multer para upload de arquivos ---
const uploadsDir = path.join(__dirname, "uploads"); // Define o caminho absoluto para 'uploads'

// Garante que o diretório 'uploads' exista
if (!fs.existsSync(uploadsDir)) {
  console.log(`Criando diretório de uploads: ${uploadsDir}`);
  fs.mkdirSync(uploadsDir, { recursive: true }); // recursive: true cria pastas aninhadas se necessário
}

// Configuração do Multer para upload de arquivos
// CUIDADO: Este é um exemplo simples. Em produção, você pode querer armazenar arquivos em um serviço de nuvem (S3, GCS)
try {
  const upload = multer({
    dest: uploadsDir, // Usa o caminho absoluto // Diretório temporário para armazenar arquivos
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB // Limite de 5MB, igual ao frontend
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
        console.warn(
          `Tentativa de upload de tipo de arquivo não permitido: ${file.mimetype}`
        );
        cb(new Error("Tipo de arquivo não permitido."), false);
      }
    },
  });

  // --- Configuração do Nodemailer ---
  // A configuração secure deve ser true para porta 465 (SSL) e false para porta 587 (TLS/STARTTLS)
  const isSecurePort = parseInt(process.env.EMAIL_PORT, 10) === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    secure: isSecurePort, // Use 'true' para porta 465, 'false' para porta 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      // Para produção, defina como 'true' ou remova a linha para usar o padrão seguro.
      // Apenas use 'false' para depuração local se tiver problemas com certificados.
      rejectUnauthorized: process.env.NODE_ENV === "production" ? true : false,
    },
    // Em alguns ambientes de desenvolvimento, pode ser útil. Em produção, use true.
  });

  // --- Rota para o envio de e-mail ---
  app.post(
    "/send-email",
    upload.array("file", 5), // deve ser "file" se for esse nome no front-end <input type="file" name="file" multiple /> // <--- ALTERADO AQUI: 'files' é o nome do campo no seu frontend, 5 é o limite de arquivos
    // nome deve coincidir
    // Lembre-se: o nome do campo aqui ("file") DEVE coincidir com o atributo 'name' do seu input de arquivo no frontend.
    async (req, res) => {
      // Dados do formulário estão em req.body
      const { fullName, email, ddd, ramal, subject, message } = req.body;
      const attachedFiles = req.files; // Arquivos enviado via Multer
      if (Array.isArray(attachedFiles)) {
        attachedFiles.map((item) => console.log(item));
      }
      console.log(attachedFiles);
      // --- Validação de dados (REPETIR VALIDAÇÕES DO FRONTEND AQUI É CRÍTICO PARA SEGURANÇA) ---
      const validationErrors = {};

      if (!fullName || !fullName.trim())
        validationErrors.fullName = "Nome completo é obrigatório.";
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email || !emailRegex.test(email))
        validationErrors.email = "E-mail inválido.";
      if (!ddd || !/^\d{2}$/.test(ddd))
        validationErrors.ddd = "DDD deve ter 2 dígitos numéricos.";
      if (!ramal || !/^\d{5}$/.test(ramal))
        validationErrors.ramal = "Ramal deve ter 5 dígitos numéricos.";
      if (!subject || !subject.trim())
        validationErrors.subject = "Assunto é obrigatório.";
      if (!message || !message.trim())
        validationErrors.message = "Mensagem é obrigatória.";

      if (Object.keys(validationErrors).length > 0) {
        console.error("Erro de validação no backend:", validationErrors);
        if (attachedFiles && fs.existsSync(attachedFiles.path)) {
          if (attachedFiles.length > 0) {
            attachedFiles.forEach((file) => {
              if (fs.existsSync(file.path)) {
                fs.unlinkSync(attachedFiles.path); // Remover arquivo temporário em caso de erro de validação
              }
            });
          }
          fs.unlinkSync(attachedFiles.path);
        }
        return res.status(400).json({
          message: "Dados do formulário inválidos.",
          errors: validationErrors,
        });
      }

      // --- Construção do corpo do e-mail ---
      const mailOptions = {
        from: email, // O remetente do e-mail (pode ser o seu e-mail do servidor)
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
      <hr>
      <table style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #333; width: 45%; height: auto; background: #ffffff; border-radius: 25px; padding: 20px; border: .5px solid #ddd;">
        <tr>
          <td style=width: 100%; height: 100%; line-height: 1.5>
            <strong style="font-size: 16px; color: #0078D7;">${fullName}</strong><br>
            <span style="color: #555;">Seu Cargo</span><br>
            <span style="color: #555;">SECRETARIA DE ESTADO DE SAÚDE DE MINAS DE GERAIS</span><br>
            <a href="mailto:${email}" style="color: #0078D7; text-decoration: none;">${email}</a><br>
            <a href="tel:+55${ddd}${ramal}" style="color: #0078D7; text-decoration: none;">+55 (${ddd}) ${ramal}</a><br>
            <span style="color: #555; font-size: 12px; font-style: italic;">MG Cidade Administrativa - Rodovia
              Papa João Paulo II, 3777 - Serra Verde
              Belo Horizonte, MG - CEP 31630903.</span>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 10px;">
            <a href="https://www.saude.mg.gov.br/" style="margin-right: 10px;">
              <img src="https://th.bing.com/th/id/OIP.wWimqECAVD5y34hl6Ouj7gHaC6?w=344&h=137&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="logo_SES" width="250" style="vertical-align: middle; margin-top: 20px;">
            </a>
          </td>
        </tr>
      </table>
      <p><strong>Anexos:</strong></p>
      ${
        attachedFiles && attachedFiles.length > 0
          ? `<ul>${attachedFiles
              .map(
                (file) =>
                  `<li>${file.originalname} (${(file.size / 1024).toFixed(
                    2
                  )} KB)</li>`
              )
              .join("")}</ul>`
          : "<p>Nenhum arquivo anexado.</p>"
      }
      <br>
      <small>Este e-mail foi enviado automaticamente pelo formulário de contato.</small>
    `,
      };

      // Anexar arquivos se existir // <--- ALTERADO AQUI: Anexar múltiplos arquivos se existirem ---
      // Anexar múltiplos arquivos se existirem
      if (attachedFiles && attachedFiles.length > 0) {
        mailOptions.attachments = attachedFiles.map((file) => ({
          filename: file.originalname,
          path: file.path, // Caminho temporário do arquivo
        }));
      }

      try {
        // --- Testar conexão SMTP antes de enviar (opcional, mas robusto) ---
        await transporter.verify();
        console.log("Servidor SMTP pronto para receber mensagens.");

        const info = await transporter.sendMail(mailOptions);
        console.log("E-mail enviado:", info.messageId);

        // Sistema de Logs (exemplo simples)
        const logEntry = {
          timestamp: new Date().toISOString(),
          status: "success",
          senderEmail: email,
          subject: subject,
          messageId: info.messageId,
          fileName: attachedFiles
            ? attachedFiles.map((f) => f.originalname)
            : ["N/A"], // <--- ALTERADO AQUI
        };
        console.log("LOG [SUCESSO]:", logEntry);
        // Em um sistema real, você salvaria isso em um banco de dados ou serviço de log externo.

        res.status(200).json({
          message: "E-mail enviado com sucesso!",
          messageId: info.messageId,
        });
      } catch (error) {
        console.error("Erro ao enviar e-mail:", error); // Log detalhado do erro
        // Sistema de Logs para erros
        const errorLogEntry = {
          timestamp: new Date().toISOString(),
          status: "failure",
          senderEmail: email,
          subject: subject,
          error_message: error.message,
          error_stack: error.stack, // Adiciona o stack trace para depuração
          smtp_response: error.response, // Resposta do servidor SMTP se disponível
        };
        console.error("LOG [ERRO]:", errorLogEntry);

        res.status(500).json({
          message:
            "Erro interno do servidor ao enviar o e-mail. Tente novamente mais tarde.",
          error:
            process.env.NODE_ENV !== "production" ? error.message : undefined, // Não expor detalhes de erro em produção
        });
      } finally {
        // Remover o arquivo temporário SEMPRE após o processamento (sucesso ou falha)
        // CORREÇÃO: Itera sobre attachedFiles para remover TODOS os arquivos temporários,
        // garantindo que não fiquem lixos no diretório 'uploads'.
        if (
          attachedFiles &&
          attachedFiles.length > 0 &&
          fs.existsSync(attachedFiles.path)
        ) {
          attachedFiles.forEach((file) => {
            try {
              fs.unlinkSync(file.path);
              console.log(`Arquivo temporário removido: ${file.path}`);
            } catch (unlinkError) {
              console.error(
                `Erro ao remover arquivo temporário ${file.path}:`,
                unlinkError
              );
            }
          });
        }
      }
    }
  );
} catch (error) {
  console.log(`ERRO NO MULTER: ${error}`);
}

// --- Iniciar o servidor ---
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
  console.log(`Modo de ambiente: ${process.env.NODE_ENV || "development"}`);
});


// --- Iniciar o servidor ---
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
  console.log(`Modo de ambiente: ${process.env.NODE_ENV || "development"}`);
});
