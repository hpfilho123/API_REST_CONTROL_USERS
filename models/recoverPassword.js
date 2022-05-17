const connection = require('../database/connection');
const user = require('./User');
const uuid =  require('uuid');
const bcrypt = require('bcrypt');
const res = require('express/lib/response');


class passwordToken{

    async create(email){
    
        var users  = await user.findUserEmail(email);
        var token = uuid.v4();
        console.log(users.ID);
        

        if (users != undefined) {

            try {
                await connection('PASSWORD_TOKENS').insert([{TOKEN:token,USERID:users[0].ID,USED:0}]);                  
                return {status:true,token:token};
            } catch (error) {
                return {status:false,err:error};   
            }
            
        } else {
            res.json({status:false,err:'Email Não Cadastrado!'})
        }
    }
    
    async changepassword(id,newsenha,token){
        let hashsenha = await bcrypt.hash(newsenha, 10)

        try {
            await connection('USUARIOS').where('ID',id).update({SENHA:hashsenha});   
            
        } catch (error) {
            console.log(error);
        }
         

    }

}


module.exports = new passwordToken();