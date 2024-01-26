const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

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
