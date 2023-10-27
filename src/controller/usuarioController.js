require('dotenv').config();
const usuarioModel = require('../model/usuarioModel');
const token = require('../util/token')
const key = process.env.KEY;

exports.login = async (email, senha) =>{
    let resp = await usuarioModel.logarUsuario(email, senha);

    if(resp.id_usuario){
        return{
            "auth": true,
            "token": await token.setToken(JSON.stringify(resp.id_usuario).replace(/"/g, ""),key),
            "user": {
                "id": resp.id_user,
                "nome": resp.nome,
                "email": resp.email
            }
        }
    }
    console.log(resp.id_usuario)
    
    return(resp);
}