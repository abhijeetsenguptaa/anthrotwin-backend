const mongoose = require('mongoose');




const productSchema = mongoose.Schema({
    title : String,
    image : String,
    image2 : String,
    price : Number,
    category : {
        type : String,
        enum : ['Sweater','Pants','Top','swim-wears','Dresses']
    },
    description : String,
    added_on : {
        type : Date,
        default : Date.now
    }
},
{
    versionKey : false
})


const ProductModel = mongoose.model('products',productSchema);


module.exports = {ProductModel};