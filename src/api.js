const express = require('express');
const tarefaController = require('./controller/tarefaController');
const usuarioController = require('./controller/usuarioController');
const token = require('./util/token');
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

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

app.use('/listarTarefas', router.get('/listarTarefas', async (req, res) =>{
    if(await token.checkToken(req.headers.token, req.headers.iduser, req.headers.nome)){
        let resp = await tarefaController.listarTarefas(req.headers.iduser);
        res.status(200).send(resp);
    }else{
		res.status(400).send({msg:"Erro ao listar tarefas"});
	}   
}))

app.use('/login', router.post('/login', async (req, res) =>{
    let resp = await usuarioController.login(req.body.email, req.body.senha);
    res.status(200).send(resp);
}))


module.exports=app;