const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { BucketModel } = require('../model/bucket.model');





const bucketRoute = express.Router();

bucketRoute.post('/',authentication,async(req,res)=>{
    const data = req.body;
    try{
        const add_item = new BucketModel(data);
        await add_item.save();
        res.send({
            'msg':'Product Added!'
        });
    }catch(err){
        res.send(err);
    }
})

bucketRoute.get('/',authentication,async(req,res)=>{
    let email = req.query.email;
    try{
        let data = await BucketModel.find({added_by:email});
        res.status(200).send(data);
    }catch(err){
        res.status(t404).send({
            'msg':'Something went Wrong!'
        })
    }
})





bucketRoute.delete('/deleteAll',authentication,async(req,res)=>{
    let email = req.query.email;
    console.log(email);
    try{
        await BucketModel.deleteMany({added_by:email})
        res.status(200).send({
            'msg':'Order Placed Successfully'
        })
    }catch(err){
        console.log(err);
        res.status(404).send({
            'msg':'Order Not Placed!!'
        })
    }
})

bucketRoute.delete('/delete/:id',authentication,async(req,res)=>{
    let id = req.params.id;
    let email = req.query.email;
    try{
        await BucketModel.findByIdAndDelete({_id:id});
        res.status(200).send(await BucketModel.find({added_by:email}));
    }catch(err){
        res.status(404).send({
            'msg':'Something went Wrong!'
        })
    }
})
module.exports = {bucketRoute};