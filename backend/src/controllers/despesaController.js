const prisma = require('../config/prismaClient');

// função para criar uma nova despesa
exports.criarDespesa = async(req, res) => {
    try{
        const{descricao,valor,categoria} = req.body;
        
        if(!descricao || !valor || !categoria){
            return res.status(400).json({error:'Todos os campos são obrigatórios!' });
        }

        const novaDespesa = await prisma.despesa.create({
            data: {
                descricao,
                valor: parseFloat(valor),
                categoria,
            },
        });
        res.status(201).json(novaDespesa);
    } catch (error) {
        res.status(500).json({error:'Ocorreu um erro ao criar a despesa!'});
    }
};

// função pra listar todas as despesas
exports.listaDespesas = async (req,res) =>{
    try{
        const todasAsDespesas = await prisma.despesa.findMany();
        res.json(todasAsDespesas);
    } catch(error) {
        res.status(500).json({error:'Ocorreu um erro ao listar as despesas!'});
    }
};

//função pra listar uma despesa by id
exports.listarUmaDespesa = async(req,res) =>{
    try{
        const { id } = req.params;

        const despesa  = await prisma.despesa.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if(!despesa){
            return res.status(404).json({error: 'Despesa não encontrada!'});
        }
        res.json(despesa);
    } catch(error) {
        res.status(500).json({error:'Ocorreu um erro ao buscar a despesa.'});
    }

};

// função para apagar uma despesa
exports.deletarDespesa = async(req,res) =>{
    try{
        const { id } = req.params;

        await prisma.despesa.delete({
            where: {
                id: parseInt(id),
            },
        });

        res.status(204).send();
    } catch(error){
        if(error.code === 'P2025'){
            return res.status(404).json({error: 'Despesa não foi encontrada!'});
        }
        res.status(500).json({error:'Ocorreu um erro ao deletar a despesa.'});
    }
};

//função para atualizar uma despesa

exports.updateDespesa = async (req,res) => {
    try{
    const {id} = req.params;
    const{descricao,valor,categoria} = req.body;

    if(!descricao || !valor || !categoria){
        return res.status(400).json({error:'Todos os campos são obrigatórios!'});
    }

    const despesaAtualizada = await prisma.despesa.update({
        where: {
            id: parseInt(id),
        },
        data: {
            descricao: descricao,
            valor: parseFloat(valor),
            categoria: categoria,
        },
    });

    res.status(200).json(despesaAtualizada);

    }catch(error){
        if(error.code === 'P2025'){
            return res.status(404).json({error: 'Despesa não encontrada!'});
        }
        
        res.status(500).json({error: 'Ocorreu um erro ao atualizar a despesa!'});
    }
};
