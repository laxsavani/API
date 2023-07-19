const user = require("../model/user");
const express = require("express");
const jwt = require("jsonwebtoken");

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

                res.json({message: "Login Successfull"})
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