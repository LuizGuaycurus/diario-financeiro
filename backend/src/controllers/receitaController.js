const prisma = require('../config/prismaClient');

// função criar nova receita

exports.criarReceita = async(req,res) =>{
    try{
        const{descricao,valor} = req.body;

        if(!descricao || !valor){
            return res.status(400).json({error:'Todos os campos são obrigatórios!' });
        }

        const novaReceita = await prisma.receita.create({
            data:{
                descricao,
                valor: parseFloat(valor),
            },
        });

        res.status(201).json(novaReceita);


    } catch (error){
        res.status(500).json({error:'Ocorreu um erro ao criar a receita!'});
    }
};

//função listar todas as receitas
exports.listaReceitas = async (req,res) =>{
    try{
        const todasAsReceitas = await prisma.receita.findMany();
        res.json(todasAsReceitas);
    } catch(error) {
        res.status(500).json({error:'Ocorreu um erro ao listar as receitas!'});
    }
};

// função buscar uma receita por id

exports.listarUmaReceita = async(req,res) =>{
    try{
        const { id } = req.params;

        const receita  = await prisma.receita.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if(!receita){
            return res.status(404).json({error: 'Receita não encontrada!'});
        }
        res.json(receita);
    } catch(error) {
        res.status(500).json({error:'Ocorreu um erro ao buscar a receita.'});
    }
};

// função apagar uma receita
exports.deletarReceita = async(req,res) =>{
    try{
        const { id } = req.params;

        await prisma.receita.delete({
            where: {
                id: parseInt(id),
            },
        });

        res.status(204).send();
    } catch(error){
        if(error.code === 'P2025'){
            return res.status(404).json({error: 'Receita não foi encontrada!'});
        }
        res.status(500).json({error:'Ocorreu um erro ao deletar a receita.'});
    }
};

// atualizar receita por ID

exports.updateReceita = async (req,res) => {
    try{
    const {id} = req.params;
    const{descricao,valor} = req.body;

    if(!descricao || !valor){
        return res.status(400).json({error:'Todos os campos são obrigatórios!'});
    }

    const receitaAtualizada = await prisma.receita.update({
        where: {
            id: parseInt(id),
        },
        data: {
            descricao: descricao,
            valor: parseFloat(valor),
        },
    });

    res.status(200).json(receitaAtualizada);

    }catch(error){
        if(error.code === 'P2025'){
            return res.status(404).json({error: 'Receita não encontrada!'});
        }
        
        res.status(500).json({error: 'Ocorreu um erro ao atualizar a Receita!'});
    }
};