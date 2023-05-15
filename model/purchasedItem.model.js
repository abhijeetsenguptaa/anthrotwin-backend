const mongoose = require('mongoose');


const purchased = mongoose.Schema({
    image : String,
    title : String,
    category : String,
    price : String,
    color : {
        type : String,
        enum : ['red','yellow']
    },
    size : {
        type : String,
        enum : ['S','M','L']
    },
    purchased_by : String,
    purchased_on : {
        type : Date,
        default : Date.now
    }
})

const Purchased = mongoose.model('purchases',purchased);

module.exports = {Purchased};