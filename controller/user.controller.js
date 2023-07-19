const user = require("../model/user");
const property = require("../model/property");
const express = require("express");
const cloudinary = require("../helper/cloudinary");
const jwt = require("jsonwebtoken");
const path = require("path");

exports.register = async(req,res)=>{
    console.log(req.body);
    const{name,email,pass}=req.body
    if(name==''||email==''||pass=='')
    {
        res.json({message: "fild is requried"})
    }
    else
    {
        var data = await user.findOne({email})
        if(data==null)
        {
            var newuser = await user.create({name,email,pass});
            if(newuser)
            {
                res.json({message: "User Register Successfully"})
            }
            else
            {
                res.json({message: "User Not Register"})
            }
        }
        else
        {
            res.json({message:"email aldray exist"})
        }
    }
}

exports.login = async(req,res)=>{

    const{email,pass}=req.body
    if(email==''||pass=='')
    {
        res.json({message: "fild is requried"})
    }
    else
    {
        var data = await user.findOne({email})
        if(data!=null)
        {
            if(data.pass==pass)
            {
                var token = await jwt.sign({userId:data._id},process.env.KEY)
                res.cookie("jwt", token, {
                    expires:new Date(Date.now() + 24*60*60*1000)
                }) 

                res.json({message: "Login Successfull",token})
            }
            else
            {
                res.json({message: "Invalid Password"})
            }
        }
        else
        {
            res.json({message: "Invalid Email"})
        }
    }
}

exports.addProperty = async(req,res)=>{
    const{name,address,price,image,size,facilities,house}=req.body
    if(name=='' || address=='' || price=='' || image=='' || size=='' || facilities=='' || house=='')
    {
        res.json({message: "all fild required"})
    }
    else{
        var img = []
        var imgId = []
        var files = req.files
        for (var file of files) {
            var imageData = await cloudinary.uploader.upload(file.path)
            var images = imageData.secure_url
            img.push(images)
            var imageId = imageData.public_id 
            imgId.push(imageId)
        }

        var data = await property.create({name,address,price,image:img,size,facilities,imageId:imgId,house})
        if(data)
        {
            res.json({message: "Property Added Successfully"})
        }
        else
        {
            res.json({message: "Property Not Added"})
        }
    }
}

exports.showProperty = async(req,res)=>{
    var data = await property.find({})
    if(data)
    {
        res.json(data);
    }
}
exports.house = async(req,res)=>{
    var data = await property.find({house:req.params.house,price:{
        $lte:req.params.price
    }})
    if(data)
    {
        res.json(data);
    }
}