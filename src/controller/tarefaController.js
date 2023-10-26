const tarefaModel = require('../model/tarefaModel')


exports.listarTarefas= async (iduser)=>{
    return await tarefaModel.listarTarefas(iduser);
}