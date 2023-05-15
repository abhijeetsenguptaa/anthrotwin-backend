const mongoose = require('mongoose');

const moreUserDetails = mongoose.Schema({
    email : String,
    firstName : String,
    LastName : String,
    streetName : String,
    addressTwo : String,
    city : String,
    province : String,
    mob_no : Number,
})


const MoreUserDetails = mongoose.model('moreDetails',moreUserDetails);

module.exports = {MoreUserDetails};