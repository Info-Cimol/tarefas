const db = require('./db');

let logarUsuario = async (email, senha) =>{
    const sql = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';
    const values = [email, senha];
    
    try {
        const rows = await db.query(sql, values);
        if (rows.length > 0) {
            return rows[0]
            
        } else {
            return {msg:'Email ou senha incorretos'}
        }
    } catch (error) {
        console.error(error);
        return  {msg:'Erro ao realizar o login'}
    }
}

module.exports ={logarUsuario}