// Importação de módulos e configuração inicial
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 3000; // Utilize a porta definida pelo ambiente do Netlify ou 3000

// Configuração do middleware CORS para permitir requisições de diferentes origens
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração de transporte do Nodemailer para enviar e-mails
const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Aceita certificados autoassinados
  },
});

// Configuração para servir arquivos estáticos (assumindo que o build do Netlify está na pasta "public")
app.use(express.static("public"));

// Rota para processar o formulário
app.post("/processar-formulario", (req, res) => {
  console.log("Recebido POST em /processar-formulario");

  // Extração dos dados do corpo da requisição
  const { name, phone, email, message } = req.body;
  console.log("Dados do formulário:", { name, phone, email, message });

  // Configuração do objeto mailOptions com os dados do formulário
  const mailOptions = {
    from: "rodrigofullbuster@outlook.com",
    to: "apkspro6@gmail.com",
    subject: `Nova mensagem de contato de ${name}`,
    text: `Nome: ${name}\nTelefone: ${phone}\nEmail: ${email}\nMensagem:\n${message}`,
  };

  console.log("Enviando e-mail...");

  // Envio do e-mail utilizando o transporte do Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erro ao enviar o email:", error);
      return res.status(500).send(error.toString());
    }
    console.log("Email enviado com sucesso:", info.response);
    res.status(200).send("success");
  });
});

// Rota padrão para o ponto de entrada ("/")
app.get("/", (req, res) => {
  res.send("Servidor Express está funcionando!");
});

// Middleware para configurar cabeçalhos CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo deu errado no servidor!");
});

// Inicialização do servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
