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

module.exports = { listarTarefas, criarTarefa };