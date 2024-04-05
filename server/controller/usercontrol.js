const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.signup = async(req,res) => {
    try {
        const { name, email, password, address} = req.body;

        const existsUser = await User.findOne({email});
        if(existsUser){
            return res.status(400).json({
                success: false,
                message: 'User already exists!',
            });
        }
        
        let hashedPassword = '';
        try {
            hashedPassword = await bcrypt.hash(password, 9);
        }
        catch(error){
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
        
        const user = await User.create({
            name, email, password: hashedPassword, address
        })
        return res.status(200).json({
            success: true,
            message: 'User created successfully!',
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "User cannot be registered !" + error.message
        });
    }
}

exports.login = async(req,res) => {
    try {
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Username/ password should not be blank !',
            });
        }
        
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'User does not exists!',
            });
        }
        
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
            }
            //token generation
            const token = jwt.sign(
                payload, 
                process.env.jwtSecret,
                {
                    expiresIn:"1h",
                }
            );
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000), 
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                    success: true,
                    token,
                    user,
                    message: 'Logged in successfully!'
                })
        }
        else{
            return res.status(403).json({
                success: false, message: 'Password is incorrect!',
            });
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'failed to login!'
        })
    }
}

exports.getData = async(req,res) =>{
    try{
        

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}