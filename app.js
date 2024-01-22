const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração de transporte do Nodemailer (ajuste conforme necessário)
const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Rota para processar o formulário
app.post('/processar-formulario', (req, res) => {
    console.log('Recebido POST em /processar-formulario', req.body);

    const { name, phone, email, whatsapp, message } = req.body;

    // Certifique-se de que a variável mailOptions está declarada dentro deste escopo
    const mailOptions = {
        from: 'seu_email@gmail.com',
        to: 'profissional@email.com',
        subject: `Nova mensagem de contato de ${name}`,
        text: `Nome: ${name}\nTelefone: ${phone}\nEmail: ${email}\nWhatsApp: ${whatsapp}\nMensagem:\n${message}`
    };

    // Envio do e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar o email:', error);
            return res.status(500).send(error.toString());
        }
        console.log('Email enviado com sucesso:', info.response);
        res.status(200).send('success');
    });
});

// Rota padrão para o ponto de entrada ("/")
app.get('/', (req, res) => {
    res.send('Servidor Express está funcionando!');
});

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
