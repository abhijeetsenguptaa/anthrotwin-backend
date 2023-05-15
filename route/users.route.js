const express = require('express');
const { UserModel } = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authentication } = require('../middleware/authentication.middleware');
const { MoreUserDetails } = require('../model/userDetails.model');

const userRoute = express.Router();

userRoute.get('/',authentication,async(req,res)=>{
    try{
        const data = await UserModel.find({role:'Customer'});
        res.send(data);
    }catch{
        res.send(err);
    }
})


userRoute.post('/register',async(req,res)=>{
    const {name,email,password,role,registered_on} = req.body;
    try{
        let existingUser = await UserModel.findOne({email});
        if(existingUser){
            res.status(400).json({
                'msg':'Email-id already registered!'
            })
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    res.status(404).json({
                        'msg':'Error in hashing the password!'
                    })
                }else{
                    const data = new UserModel({name,email,password:hash,role,registered_on});
                    await data.save();
                    res.status(200).json({
                        'msg':'Registered Successfully'
                    })
                }
            })
        }
    }catch(err){
        res.status(404).json({
            'msg':'Error in registering the new-user!'
        })
    }
})

userRoute.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    try{
        const data = await UserModel.find({email});
        if(data){
            bcrypt.compare(password,data[0].password,async(err,result)=>{
                if(result){
                    const token = jwt.sign({user_email:data[0].email},process.env.secret_key,{expiresIn:'1hr'});
                    res.status(200).json({
                        'msg':'Login Successful',
                        'token':token,
                        'name':data[0].name,
                        'role':data[0].role,
                        'email':data[0].email
                    })
                }else{
                    res.status(400).json({
                        'msg':'Wrong Credentials!'
                    })
                }
            })
        }else{
            res.status(400).json({
                'msg':'User not Found'
            })
        }
    }catch(err){
        res.status(200).json({
            'msg':'Something went Wrong!'
        })
    }
})

userRoute.post('/more',authentication,async(req,res)=>{
    const data = req.body;
    try{
        const moreDetails = new MoreUserDetails(data);
        await moreDetails.save()
        res.status(200).send({
            'msg':'More details added!'
        })
    }catch(err){
        res.status(404).send({
            'msg':'Something went Wrong!'
        })
    }
})

module.exports = {userRoute};