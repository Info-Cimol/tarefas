const db = require("./db");

let listarTarefas = async (iduser) => {
  const sql = 'SELECT * FROM tarefa WHERE usuario_id_usuario = ?';
  const value = [iduser]
  return await db.query(sql, value);
};

let criarTarefa = async (titulo, descricao, status, iduser) =>{
  const sql = 'INSERT INTO tarefa (title, description, status, usuario_id_usuario) VALUES (?, ?, ?, ?)'
  const values = [titulo, descricao, status, iduser]

  const novaTarefa = await db.query(sql, values);
  if(novaTarefa.affectedRows > 0){
    return {
       "idTarefa": novaTarefa.insertId,
       "titulo": titulo,
       "descricao": descricao,
       "status": status
    }
  }
}

let buscarTarefa = async (iduser, tarefaId) =>{
  const sql = 'SELECT * FROM tarefa WHERE id_tarefa = ? AND usuario_id_usuario = ?';
  const values = [tarefaId, iduser];

  const tarefa = await db.query(sql, values);

  if(tarefa.length > 0){
    return tarefa;
  }else{
    return {msg:"Tarefa não encontrada"}
  }

}

let deletarTarefa = async (iduser, tarefaId) =>{
  const sql = 'DELETE FROM tarefa WHERE id_tarefa = ? AND usuario_id_usuario = ?';
  const values = [tarefaId, iduser]

  const tarefa = await db.query(sql, values);
  if(tarefa.affectedRows ===1){
    return {msg: "Tarefa deletada com sucesso"}
  }else{
    return {msg: "Tarefa não encontrada"}
  }
}

module.exports = { listarTarefas, criarTarefa, buscarTarefa, deletarTarefa };