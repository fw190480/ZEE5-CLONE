const express = require("express");
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')
const app = express.Router();
const User = require("./user.model")

// login post request
app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    // console.log(req.body)
    try{
        let user= await User.findOne({email});
        if(!user) return res.status(404).send({msg:"User not exits"});
        let verification = await argon2.verify(user.hash,password);
        if(!verification) return res.status(404).send({msg:"Invalid Credentatial"});
        let token = jwt.sign({name:user.name,email:user.email},process.env.SECRET_KEY,{expiresIn:"28d"});

        res.status(200).send({token})

    
    }catch(err){
        res.status(500).send(err.message)
    }

})

app.post("/signup",async(req,res)=>{
    let {email,password,name}=req.body;
    try{
       const verification = await User.findOne({email});
       if(verification) return res.status(401).send({msg:"User already Exits "});
       let hash = await argon2.hash(password);
       let user = new User({email,hash,name});
       await user.save();
       res.status(201).send({msg:"User created successfully"})

    }catch(err){
        res.status(500).send(err.message)
    }
})

// get data of all the users ==> It is for admin use only ==>
app.get('/details',async(req,res)=>{
    let token = req.headers.token
    try{
        let details =await User.find()
        if(token!=="rahul"){
            return res.status(404).send("Authorization failed")
        }
        res.send(details)
    }catch(e){
        res.status(500).send(e.message)
    }
})
module.exports =app