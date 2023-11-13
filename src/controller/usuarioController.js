require('dotenv').config();
const usuarioModel = require('../model/usuarioModel');
const token = require('../util/token');
const key = process.env.KEY;
const criptoJs =  require('crypto-js');


exports.login = async (email, senha) =>{
    const senhaCripto = criptoJs.MD5(senha).toString();
    let resp = await usuarioModel.logarUsuario(email, senhaCripto);
    if(resp.id_usuario){
        return{
            "auth": true,
            "token": await token.setToken(JSON.stringify(resp.id_usuario).replace(/"/g, ""),key),
            "user": {
                "id": resp.id_usuario,
                "nome": resp.nome,
                "email": resp.email
            }
        }
    }
    console.log(resp.id_usuario)
    
    return(resp);
}