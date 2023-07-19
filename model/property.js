const mongoose = require('mongoose')
const property =new mongoose.Schema({
    name:{
        type: String
    },
    address:{
        type: String
    },
    price:{
        type: String
    },
    imageId:{
        type: Array
    },
    image:{
        type: Array
    },
    size:{
        type: String
    },
    facilities:{
        type: Array
    },
    house:{
        type: String
    }
})

module.exports=mongoose.model('property',property);