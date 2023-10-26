const usuarioModel = require('../model/usuarioModel');
const token = require('../util/token')

exports.login = async (email, senha) =>{
    let resp = await usuarioModel.logarUsuario(email, senha);

    if(resp.id_usuario){
        return{
            "auth": true,
            "token": await token.setToken(JSON.stringify(resp.id_usuario).replace(/"/g, ""),resp.nome),
            "user": {
                "id": resp.id_usuario,
                "nome": resp.nome,
                "email": resp.email
            }
        }
    }
    
    return(resp);
}