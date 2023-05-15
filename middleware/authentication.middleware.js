const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();



const authentication = (req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        jsonwebtoken.verify(token,process.env.secret_key,async(err,decode)=>{
            if(decode){
                user_email = decode.user_email;
                req.body.added_by = user_email;
                req.body.email = user_email;
                req.body.purchased_by = user_email;
                next();
            }else{
                res.send({
                    'msg':'Login Required'
                })
            }
        })
    }else{
        res.send({
            'msg':'Login Required'
        })
    }
}


module.exports = {authentication};