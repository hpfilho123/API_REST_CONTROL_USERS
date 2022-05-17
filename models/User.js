let connection = require('../database/connection');
let bcrypt = require('bcrypt');


class user {

    async updateUsers(id,nome,email,role){

        let user = id;
        let editUser = {};

        if (user != undefined) {
          

            if (email != undefined) {
                let findEmail = await this.findEmail(email);
                if (findEmail == false) {
                    editUser.EMAIL = email;
                }
            }
            
            if (nome != undefined) {
                editUser.NOME = nome;
            };

            if (role != undefined) {
                editUser.ROLE = role;
            };

        } else {
            res.json({status: 'Usuaio Não existe!'})
        }
       

        try {
            await connection('USUARIOS').where('ID',id).update(editUser);
            return {status:true}    
        } catch (error) {
            return {status:false,error}    
     
        }

    };

    async deleteUser(id){
        try {
            await connection('USUARIOS').where('ID',id).del();    
        } catch (error) {
            console.log(error);
        }
        

    }

    async findUser(id){
        try {
            let result = await connection.select(['ID','NOME','EMAIL','ROLE','DATA_CAD']).table('USUARIOS').where('ID',id);
            return result;            
        } catch (error) {
            console.log(error);
        }
    }

    async findAllUsers(){
        try {
            let result = await connection.select(['ID','NOME','EMAIL','ROLE','DATA_CAD']).table('USUARIOS');
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
        
    }
    

    async findUserEmail(email){
        try {
            let result = await connection.select(['ID','NOME','SENHA','EMAIL','ROLE','DATA_CAD']).table('USUARIOS').where('EMAIL',email);
            return result;            
        } catch (error) {
            console.log(error);
        }
    }

    async new(nome,email,password,role){
        let hash = await bcrypt.hash(password, 10)
        try {
            await connection('USUARIOS').insert([{NOME:nome,EMAIL:email,SENHA:hash,ROLE:role}])      
        } catch (error) {
            console.log(error)
        }     
    };

    async findEmail(email){
        try {
            let result = await connection.select('EMAIL').table('USUARIOS').where('EMAIL', email)
            if (result.length > 0) {
                return {status: true,token:result[0].token};
            } else {
                return {status: false};
            }
                
        } catch (error) {
            console.log(error);
            return {status: false};
        }
    }
}

module.exports = new user();
