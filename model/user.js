const mongoose = require('mongoose')
const useSchema =new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    pass:{
        type: String
    }
})

module.exports=mongoose.model('users',useSchema);