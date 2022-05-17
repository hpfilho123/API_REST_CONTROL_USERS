const user = require('../models/User');
const bcrypt = require('bcrypt');



    async function teste(){
        
    let usuario = await user.findUserEmail('hpsantos123@gmail.com');

    return usuario
    }
    
async function teste2(){
     let result = await teste()
     console.log(result[0].SENHA)
     let compar = await bcrypt.compare('salmos125',result[0].SENHA)

     console.log(compar);
}

teste2()




