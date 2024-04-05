const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async(req, res, next) =>{
    try {
        const token = req.cookies.token || req.body.token || 
          req.header("Authorization").replace('Bearer ', ""); 

        if(!token || token === undefined){
            return res.status(401).json({
                success: false,
                message: 'Token missing, try again!',
            });
        }

        try{
            const decodeval = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodeval;
            console.log(decodeval);
        } catch(error){
            return res.status(401).json({
                success: false,
                message: 'Token is invalid, try again!',
            })
        }
        next();
    } catch(error){
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}