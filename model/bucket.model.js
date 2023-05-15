const mongoose = require('mongoose');


const bucketSchema = mongoose.Schema({
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
    added_by : String,
    added_on : {
        type : Date,
        default : Date.now
    }
})

const BucketModel = mongoose.model('bucket',bucketSchema);

module.exports = {BucketModel,bucketSchema};