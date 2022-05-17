const connection = require('../database/connection');

class passwordtoken{

    async validate(token){

        try {
            
        let result = await connection.select('*').table('PASSWORD_TOKENS').where('TOKEN',token)


        if (result.length > 0) {
            
            if (result[0].USED == 0) {
                return {status:true,token: result[0]}
            } else {
                return {status:false}
            }
        } else {
            return {status:false}
        }
        } catch (error) {
            console.log(error)
            return {status:false}
        }
    }

    async setused(token){
        try {
            await connection('PASSWORD_TOKENS').where('TOKEN',token).update({USED:1});  
        } catch (error) {
            console.log({errorUpdate:error})
        }
       
    }

}


module.exports = new passwordtoken();