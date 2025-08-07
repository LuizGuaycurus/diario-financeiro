const express = require('express');
const router = express.Router();
const despesaController = require('../controllers/despesaController');

// rotas da api p/ despesas

//nova despesa
router.post('/', despesaController.criarDespesa);

//listar TODAS as despesas
router.get('/',despesaController.listaDespesas);

//listar uma unica despesa por id
router.get('/:id',despesaController.listarUmaDespesa);

//atualizar uma despesa por id
router.put('/:id',despesaController.updateDespesa);

//deletar despesa por id
router.delete('/:id',despesaController.deletarDespesa);


module.exports = router;
