require('dotenv').config();
const express = require('express');
const tarefaController = require('./controller/tarefaController');
const usuarioController = require('./controller/usuarioController');
const token = require('./util/token');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const key = process.env.KEY;
const router = express.Router()

app.use('/', router.get('/', async (req,res) => {
	res.status(200).send("<h1> API-TAREFAS <h1>");
}))

app.use('/sobre', router.get('/sobre', async (req,res) =>{
    res.status(200).send({
        "version": "1.0.0",
        "name": "API - Tarefas",
        "Description": "API responsável por fornecer os serviços necessários para manter a plicação de gestão de tarefas individuais"
    });
}))

app.use('/login', router.post('/login', async (req, res) =>{
    let resp = await usuarioController.login(req.body.email, req.body.senha);
    res.status(200).send(resp);
}))

app.use('/listarTarefas', router.get('/listarTarefas', async (req, res) =>{
    if(await token.checkToken(req.headers.token, req.headers.iduser, key)){
        let resp = await tarefaController.listarTarefas(req.headers.iduser);
        res.status(200).send(resp); 
    }else{
		res.status(400).send({msg:"Erro ao listar tarefas"});
	}   
}))

app.use('/criarTarefa', router.post('/criarTarefa', async (req, res) =>{
    if(await token.checkToken(req.headers.token, req.headers.iduser, key)){
        let resp = await tarefaController.criarTarefa(req.body.titulo, req.body.descricao, req.body.status, req.headers.iduser)
        res.status(200).send(resp);
    }else{
		res.status(400).send({msg:"Erro ao criar tarefa"});
	}  
}))

app.use('/tarefa/:id', router.get('/tarefa/:id', async (req, res) =>{
    if(await token.checkToken(req.headers.token, req.headers.iduser, key)){
        const tarefaId = req.params.id;
        let resp = await tarefaController.buscarTarefa(req.headers.iduser, tarefaId);
        res.status(200).send(resp);
    }else{
		res.status(400).send({msg:"Erro ao buscar tarefa"});
	} 
}))

app.use('/tarefa/:id', router.delete('/tarefa/deletar/:id', async (req, res) => {
    if(await token.checkToken(req.headers.token, req.headers.iduser, key)){
        const tarefaId = req.params.id;
        let resp = await tarefaController.deletarTarefa(req.headers.iduser, tarefaId);
        res.status(200).send(resp);
    }else{
        res.status(400).send({msg:"Erro ao deletar tarefa"});
    }
}))

app.use('/tarefa/:id', router.put('/tarefa/alterar/:id', async (req, res) => {
    if(await token.checkToken(req.headers.token, req.headers.iduser, key)){
        const tarefaId = req.params.id;
        let resp = await tarefaController.alterarTabela(req.headers.iduser, tarefaId, req.body.titulo, req.body.descricao, req.body.status);
        res.status(200).send(resp);
    }else{
        res.status(400).send({msg: "Erro ao alterar tabela"});
    }
}))

module.exports=app;