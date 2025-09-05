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

// --- Verificação de Variáveis de Ambiente Essenciais (CRÍTICO!) ---
// Garante que todas as variáveis de ambiente necessárias estejam configuradas.
// É CRÍTICO que estas variáveis estejam configuradas corretamente no seu arquivo .env
// Se alguma estiver faltando, o servidor não inicia para evitar erros em tempo de execução.
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
  // Logar as variáveis para depuração (remova em produção se for sensível)
  console.log(process.env.EMAIL_HOST);
  console.log(process.env.EMAIL_PORT);
  console.log(process.env.EMAIL_USER);
  // console.log(process.env.EMAIL_PASS); // Remova em produção
  console.log(process.env.TARGET_EMAIL);
  console.log(process.env.FRONTEND_URL);
  console.log(process.env.PORT);
  process.exit(1); // Encerra o processo se as variáveis essenciais estiverem faltando
}

// Configuração do CORS para permitir requisições do seu frontend React

// --- Configuração do CORS ---
// Permite requisições apenas da URL do seu frontend React definida em FRONTEND_URL.

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // **AJUSTE PARA A URL DO SEU APLICATIVO REACT EM PRODUÇÃO**
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware para parsing de JSON (se você fosse enviar JSON do frontend)
// Necessário se o seu frontend enviar dados JSON no corpo da requisição (além dos arquivos).
app.use(express.json());

// --- Configuração do Multer para upload de arquivos ---
const uploadsDir = path.join(__dirname, "uploads"); // Define o caminho absoluto para 'uploads'

// Garante que o diretório 'uploads' exista. Se não, ele será criado.
if (!fs.existsSync(uploadsDir)) {
  console.log(`Criando diretório de uploads: ${uploadsDir}`);
  fs.mkdirSync(uploadsDir, { recursive: true }); // recursive: true cria pastas aninhadas se necessário
}

// Configuração do Multer para upload de arquivos
// Este é um exemplo simples. Em produção, você pode querer armazenar arquivos em um serviço de nuvem (S3, GCS)
// Configuração principal do Multer
try {
  const upload = multer({
    dest: uploadsDir, // Usa o caminho absoluto // Diretório temporário para armazenar arquivos ----->   // Diretório onde os arquivos temporários serão armazenados
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB // Limite de 5MB, igual ao frontend ------->    // Limite de 5MB por arquivo (individualmente)
    fileFilter: (req, file, cb) => {
      // Validação de tipo de arquivo no backend (CRÍTICO!)
      // Validação de tipo de arquivo (CRÍTICO para segurança!)
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
    upload.array("file", 5), // deve ser "file" se for esse nome no front-end <input type="file" name="file" multiple /> // <--- ALTERADO AQUI: 'file' é o nome do campo no seu frontend, 5 é o limite de arquivos
    // nome deve coincidir
    // Lembre-se: o nome do campo aqui ("file") DEVE coincidir com o atributo 'name' do seu input de arquivo no frontend.
    async (req, res) => {
      // Dados do formulário estão em req.body
      const { fullName, email, ddd, ramal, subject, message } = req.body;
      const attachedFiles = req.files; // Arquivos enviado via Multer
      if (Array.isArray(attachedFiles)) {
        attachedFiles.map((item) => console.log(item));
      }
      // --- ADICIONE ESTA LINHA PARA DEPURAR ---     // LOG DE VERIFICAÇÃO PARA DEBUG

      // --- IMPORTANTE PARA DEPURAR ---
      // Este log mostrará o array de arquivos recebidos.
      // Se nenhum arquivo foi enviado ou o nome do campo não coincide, será um array vazio: []

      console.log("Arquivos recebidos do frontend:", attachedFiles);
      console.log(attachedFiles);

      console.log("Número de arquivos:", attachedFiles.length);

      // Esta é a forma correta de verificar se há arquivos para processar.
      if (attachedFiles.length > 0) {
        console.log("Há arquivos para processar!");
        // O map para console.log é bom para inspecionar os detalhes de cada arquivo.
        attachedFiles.map((item) => console.log(item));
      } else {
        console.log("Nenhum arquivo recebido ou o nome do campo não coincide.");
      }

      // --- Validação de dados (REPETIR VALIDAÇÕES DO FRONTEND AQUI É CRÍTICO PARA SEGURANÇA) ---
      const validationErrors = {};
      // --- Validação de Dados do Formulário (CRÍTICO para segurança e integridade) ---

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

      // Se houver erros de validação, responde com 400 e remove arquivos temporários.
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

      // --- Configuração da Assinatura HTML e Imagem Inline ---
      // Caminho para a imagem da sua assinatura (ajuste se necessário)
      // Certifique-se de que o arquivo 'logo_assinatura.png' exista nesta pasta (ex: backend/assets/)
      const signatureImagePath = path.join(
        __dirname,
        "assets",
        "logo_assinatura.png"
      );
      const signatureImageCid = "signature_logo@yourdomain.com"; // ID único para a imagem inline

      // --- Construção do corpo do e-mail ---
      const mailOptions = {
        from: process.env.EMAIL_USER, // O remetente do e-mail (pode ser o seu e-mail do servidor)
        to: process.env.TARGET_EMAIL, // O e-mail setorial da SES
        replyTo: email, // Permite responder diretamente ao e-mail do remetente do formulário
        cc: email, // E-mail para ser copiado
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
              ${
                fs.existsSync(signatureImagePath)
                  ? `<img src="cid:${signatureImageCid}" alt="Logo da Empresa" width="250" style="vertical-align: middle; margin-top: 20px;">`
                  : `<img src="https://th.bing.com/th/id/OIP.wWimqECAVD5y34hl6Ouj7gHaC6?w=344&h=137&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="logo_SES" width="250" style="vertical-align: middle; margin-top: 20px;">`
              }>
            </a>
          </td>
        </tr>
      </table>
      <p><strong>Anexos:</strong></p>
      ${
        attachedFiles && attachedFiles.length > 0 // Lista os nomes e tamanhos dos arquivos anexados no corpo do e-mail
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

      // --- Anexar Múltiplos Arquivos do Frontend ---
      // Cria o array de anexos para o Nodemailer.

      // Sempre inicializar mailOptions.attachments como um array vazio
      mailOptions.attachments = [];

      // Anexar Múltiplos Arquivos do Frontend
      if (attachedFiles && attachedFiles.length > 0) {
        attachedFiles.forEach((file) => {
          mailOptions.attachments.push({
            filename: file.originalname, // Nome original do arquivo
            path: file.path, // Caminho temporário do arquivo no servidor
          });
        });
      }

      // --- Adicionar a Imagem da Assinatura como Anexo Inline (CID) ---
      // A imagem deve ser um arquivo local no seu servidor.
      if (fs.existsSync(signatureImagePath)) {
        mailOptions.attachments.push({
          filename: "logo_assinatura.png", // Nome do arquivo para referência interna
          path: signatureImagePath, // Caminho completo para a imagem no seu servidor
          cid: signatureImageCid, // O Content-ID que você usará na tag <img> do HTML
        });
      } else {
        console.warn(
          `Aviso: Imagem da assinatura não encontrada em ${signatureImagePath}. A assinatura no e-mail pode não exibir a imagem.`
        );
      }

      // --- Envio do E-mail ---
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
          fileNames: attachedFiles
            ? attachedFiles.map((f) => f.originalname)
            : ["N/A"], // <--- ALTERADO AQUI ----> // Lista os nomes dos arquivos enviados
        };
        console.log("LOG [SUCESSO]:", logEntry);
        // Em um sistema real, você salvaria isso em um banco de dados ou serviço de log externo.

        // Responde ao frontend com sucesso e encerra a requisição.
        res.status(200).json({
          message: "E-mail enviado com sucesso!",
          messageId: info.messageId,
        });
      } catch (error) {
        // --- Tratamento de Erros no Envio do E-mail ---
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

        // Responde ao frontend com erro e encerra a requisição.
        // Evita expor detalhes sensíveis do erro em produção.
        res.status(500).json({
          message:
            "Erro interno do servidor ao enviar o e-mail. Tente novamente mais tarde.",
          error:
            process.env.NODE_ENV !== "production" ? error.message : undefined, // Não expor detalhes de erro em produção
        });
      } finally {
        // Remover o arquivo temporário SEMPRE após o processamento (sucesso ou falha)
        // Itera sobre attachedFiles para remover TODOS os arquivos temporários,
        // garantindo que não fiquem lixos no diretório 'uploads'.

        // --- Limpeza: Remover TODOS os arquivos temporários SEMPRE ---
        // Essencial para evitar acúmulo de lixo no servidor.

        if (attachedFiles && attachedFiles.length > 0) {
          attachedFiles.forEach((file) => {
            if (fs.existsSync(file.path)) {
              try {
                fs.unlinkSync(file.path);
                console.log(`Arquivo temporário removido: ${file.path}`);
              } catch (unlinkError) {
                console.error(
                  `Erro ao remover arquivo temporário ${file.path}:`,
                  unlinkError
                );
              }
            }
          });
        }
      }
    }
  );
} catch (error) {
  // Erro na configuração inicial do Multer (ex: problema com o diretório)
  console.log(`ERRO NA CONFIGURAÇÃO DO MULTER: ${error}`);
}

// --- Iniciar o servidor ---
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
  console.log(`Modo de ambiente: ${process.env.NODE_ENV || "development"}`);
});

// Obs.:
// Pontos Essenciais:
// Correspondência name="file" (Frontend) <-> upload.array("file", 5) (Backend):

// No seu forms_email.jsx, o input type="file" deve ter name="file" e id="file".

// No server.js, a linha upload.array("file", 5) usa "file".

// Isso garante que o Multer reconheça os arquivos enviados pelo seu formulário.

// Diretório de Ativos para Assinatura:

// Crie uma pasta assets na raiz do seu projeto backend (ex: backend_portfolio_ATI_react/assets/).

// Coloque a imagem da sua assinatura (ex: logo_assinatura.png) dentro desta pasta assets.

// O código usa path.join(__dirname, 'assets', 'logo_assinatura.png') para encontrar essa imagem.

// Variáveis de Ambiente (.env):

// Certifique-se de que o arquivo credenciais_email.env (ou .env se você renomear) está na raiz do seu projeto backend
// e contém todas as variáveis necessárias: EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, TARGET_EMAIL, FRONTEND_URL, PORT.
// Sem elas, o servidor não iniciará.
