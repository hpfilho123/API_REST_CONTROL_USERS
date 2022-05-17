const user = require('../models/User');
const passwordrec =  require('../models/recoverPassword');
const passwordtoken = require('../models/passwordToken') ;
const jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');

const secret = 'JKLJkjkjhJHGf2243@#$#lçdblskfnbfgbjfkngbfgnbfgkçgf'

class UserController{
 
    async updateUser(req,res){
        let {id,nome,email,role}  = req.body;
           let result = await user.updateUsers(id,nome,email,role);
           console.log(result)

           if (result != undefined) {
               if (result.status) {
                   res.json({status:'atualização realizada com sucesso!'})
               } else {
                res.status(406)
                res.json({status:result.error});
               }
           } else {
                res.status(406)
                res.json({status:result.error});
           }
  
        

    }

    async deleteUsers(req,res){
        let id = req.params.id;
        try {
            await user.deleteUser(id);    
            res.json({response:'Usuario Deletado!'})
        } catch (error) {
            console.log(error);
        }

    }

    async findUser(req,res){
        let id = req.params.id;
        try {
            let find = await user.findUser(id);  
            if (find ==  undefined) {
                res.status(400);
                res.json({});
                return;
            } else {
                res.status(200);
                res.json(find);
                return;
            }  
            return;
        } catch (error) {
            console.log(error)
        }
    }
    
    async index(req,res){

        let findUser = await user.findAllUsers()
            res.status(200);
            res.json({listUsers:findUser});
            return   
        
    }

    async create(req,res){

        let {nome,email,password,role} = req.body;

        if (email == undefined) {
            res.status(400);
            res.json({err:"email invalido!"});
            return;
        }

        let emailExists = await user.findEmail(email)
        console.log(emailExists)

        if (emailExists.status) {
            res.status(406);
            res.json({err:"email ja cadastrado"});
            return
        } 

        try {
            await user.new(nome,email,password,role);  
            res.status(200);
            res.json({status:'email cadastrado'}); 
        } catch (error) {
            console.log(error);
        }       
       
    }

    async recoverPassword(req,res){
        let email = req.body.email;

        try {
            let result = await passwordrec.create(email); 

            if (result.status) {
                res.status(200);
                res.json({status:true,token:result.token})
            } else {
                res.json({status:result.err});
            }

        } catch (error) {
            console.log(error);
        }
        
    }


    async changepassword(req,res){
        let {token,newsenha} = req.body;

        let istoken = await passwordtoken.validate(token);


        if (istoken.status) {
            console.log(istoken);

            await passwordrec.changepassword(istoken.token.USERID,newsenha,istoken.token.TOKEN);
            await passwordtoken.setused(istoken.token.TOKEN);
            res.json({status:'nova senha gerada com sucesso!'})
        } else {
            res.status(406);
            res.json({status:'Token Invalido!'})
        }

    }

    async login(req,res){
        let {email,password} = req.body;

        let users = await user.findUserEmail(email);
        if (users[0] != undefined) {
            let bcryptSenha = await bcrypt.compare(password,users[0].SENHA);
            console.log(bcryptSenha);
            if (bcryptSenha) {
                let token = jwt.sign({ NOME: users[0].NOME,EMAIL:users[0].EMAIL,ROLE:users[0].ROLE}, secret)
                res.status(200);
                res.json({status:`seja bem vindo ${users[0].NOME}`,token:token})
            } else {
                res.json({status:'senha invalida!'})
            }
            
        } else {
            res.status(406);
            res.send({status:'usuario invalido'})
        }
    

    }


}

module.exports = new UserController();