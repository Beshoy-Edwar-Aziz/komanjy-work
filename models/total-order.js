const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const totalSchema = new Schema({
    reelsCreation:{
        qty:{type:Number},
        price:{type:Number}
    },
    socialMediaMarketing:{
        qty:{type:Number},
        price:{type:Number}
    },
    contentCreation:{
        qty:{type:Number},
        price:{type:Number}
    },
    totalPrice:{
        type:Number
    }
})

module.exports = mongoose.model('Total',totalSchema);