const express = require('express');
const router = express.Router();
const admin = require('../model/user');
const admin_token = require('../middleware/user.middleware')
const {
    register,login
} = require('../controller/user.controller')

router.post('/register',register)
// router.get('/:email',async(req,res)=>{
//     var data = await admin.find({email: req.params.email})
//     res.json(data)
// })

router.post('/login',login)

module.exports = router