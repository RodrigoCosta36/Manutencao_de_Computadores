const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

app.use(express.static("public"));

app.post('https://rodrigocosta36.netlify.app/enviarforms', (req, res) => {
    console.log('Recebido POST em /enviarforms');

    const { name, phone, email, message } = req.body;
    console.log('Dados do formulário:', { name, phone, email, message });

    const mailOptions = {
        from: 'rodrigofullbuster@outlook.com',
        to: 'apkspro6@gmail.com',
        subject: `Nova mensagem de contato de ${name}`,
        text: `Nome: ${name}\nTelefone: ${phone}\nEmail: ${email}\nMensagem:\n${message}`
    };

    console.log('Enviando e-mail...');

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar o email:', error);
            return res.status(500).json({ error: error.toString() });
        }
        console.log('Email enviado com sucesso:', info.response);
        res.status(200).json({ message: 'success' });
    });
});

app.get('/', (req, res) => {
    res.send('Servidor Express está funcionando!');
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado no servidor!' });
});

app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});

// Função Netlify com configuração CORS
exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Permitir solicitações de qualquer origem
            "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ message: "Hello World" }),
    };
};
