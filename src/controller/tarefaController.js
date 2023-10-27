const tarefaModel = require('../model/tarefaModel')


exports.listarTarefas= async (iduser)=>{
    return await tarefaModel.listarTarefas(iduser);
}

exports.criarTarefa = async (titulo, descricao, status, iduser) =>{
    return await tarefaModel.criarTarefa(titulo, descricao, status, iduser);
}