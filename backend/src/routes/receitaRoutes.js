const express = require('express');
const router = express.Router();
const receitaController = require('../controllers/receitaController');

// rotas api receita

//nova receita
router.post('/',receitaController.criarReceita);

// listar todas as receitas
router.get('/', receitaController.listaReceitas);

// listar receita por id
router.get('/:id',receitaController.listarUmaReceita);

//atualizar despesa por id
router.put('/:id', receitaController.updateReceita);

// deletar despesa por id
router.delete('/:id', receitaController.deletarReceita);

module.exports = router;