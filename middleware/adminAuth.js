const jwt = require('jsonwebtoken');
const secret = 'JKLJkjkjhJHGf2243@#$#lçdblskfnbfgbjfkngbfgnbfgkçgf';

module.exports = function(req,res,next){

    var authToken = req.headers['authorization'];

    if (authToken != undefined) {
        let tokenSplit  =  authToken.split(' ');
        let token  =  tokenSplit[1];
    
        var decode = jwt.decode(token,secret);

        try {
            if (decode.ROLE = '0') {
                next();
            } else {
                res.status(403);
                res.json({status:'Você não esta autenticado!'}) 
            }
        } catch (error) {
            res.status(403);
            res.json({status:'Você não esta autenticado!'})
        }
    
    } else {
        res.status(403);
        res.json({status:'Você não esta autenticado!'})
    }

}

