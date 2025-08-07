const express = require('express');
const cors = require('cors');
require('dotenv').config();

const despesaRoutes = require('./routes/despesaRoutes');
const receitaRoutes = require('./routes/receitaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// rota teste da raiz api

app.get('/', (req,res) =>{
    res.send('API Diário Financeiro ');
});

// usa as rotas com os prefixos

app.use('/despesas', despesaRoutes);
app.use('/receitas', receitaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor rodando na porta ${PORT}');
});