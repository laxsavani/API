const express = require('express');
const router = express.Router();
const admin = require('../model/user');
const image = require('../helper/multer');
const admin_token = require('../middleware/user.middleware')

const {
    register,login,addProperty,showProperty,house
} = require('../controller/user.controller')

router.post('/register',register)
// router.get('/:email',async(req,res)=>{
//     var data = await admin.find({email: req.params.email})
//     res.json(data)
// })

router.post('/login',login)
router.post('/addProperty',admin_token,image.array('image'),addProperty)
router.get('/showProperty',admin_token,showProperty)
router.get('/house/:house/:price',admin_token,house)

module.exports = router