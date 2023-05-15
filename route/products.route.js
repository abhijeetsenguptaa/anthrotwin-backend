const express = require('express');
const { ProductModel } = require('../model/products.model');
const { authentication } = require('../middleware/authentication.middleware');
const { Purchased } = require('../model/purchasedItem.model');






const productRoute = express.Router();



productRoute.post('/',async(req,res)=>{
    const {title,image,image2,price,category,description,added_on}=req.body;
    try{
        const data = new ProductModel({title,image,image2,price,category,description,added_on});
        const item = await data.save();
        res.status(200).send(item);
    }catch(err){
        res.status(404).send('Something went wrong!');
    }
})


productRoute.post('/purchase',authentication,async(req,res)=>{
    const data = req.body;
    try{
        const purchased_item = new Purchased(data);
        await purchased_item.save();
        res.send({
            'msg':'Item successfully Purchased'
        })
    }catch(err){
        res.status(404).send({
            'msg':'Something went Wrong!'
        })
    }
})

productRoute.get('/search/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const data = await ProductModel.find({_id:id});
        res.status(200).send(data);
    }catch(err){
        res.status(404).send('Something went wrong!');
    }
})

productRoute.get('/',async(req,res)=>{
    try{
        const data = await ProductModel.find();
        res.status(200).send(data);
    }catch(err){
        res.status(404).send('Something went wrong!');
    }
})


productRoute.patch('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const update = req.body;
        const data = await ProductModel.findByIdAndUpdate({_id:id},update);
        res.status(200).send(data);
    }catch(err){
        res.status(404).send('Something went wrong!');
    }
})

productRoute.delete('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        await ProductModel.findByIdAndDelete({_id:id});
        res.status(200).send(await ProductModel.find());
    }catch(err){
        res.status(404).send('Something went wrong!');
    }
})


module.exports = {productRoute};