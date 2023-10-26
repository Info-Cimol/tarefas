const db = require("./db");

let listarTarefas = async (iduser) => {
  const sql = 'SELECT * FROM tarefa WHERE usuario_id_usuario = ?';
  const value = [iduser]
  return await db.query(sql, value);
};

module.exports = { listarTarefas };