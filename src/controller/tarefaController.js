const tarefaModel = require('../model/tarefaModel')


exports.listarTarefas= async (iduser)=>{
    return await tarefaModel.listarTarefas(iduser);
}

exports.criarTarefa = async (titulo, descricao, status, iduser) =>{
    return await tarefaModel.criarTarefa(titulo, descricao, status, iduser);
}

exports.buscarTarefa = async (iduser, tarefaId) =>{
    return await tarefaModel.buscarTarefa(iduser, tarefaId);
}

exports.deletarTarefa = async (iduser, tarefaId) =>{
    return await tarefaModel.deletarTarefa(iduser, tarefaId);
}

exports.alterarTabela = async (iduser, tarefaId, titulo, descricao, status) =>{
    return await tarefaModel.alterarTarefa(iduser, tarefaId, titulo, descricao, status);
}