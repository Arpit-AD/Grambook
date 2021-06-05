const jwt = require("jsonwebtoken"); 
const {JWT_SECRET} = require("../keys");
const mongoose = require("mongoose");
const User = require("../model/user.js");

module.exports = (req,res,next) => {

        const {authorization} = req.headers;
        if(!authorization) {
            res.status(401).json({error: "You must be Logged In"})
        }
        
        const token = authorization.replace("Bearer ", "")
        jwt.verify(token, JWT_SECRET , (err , payload) =>{
            if(err){
                res.status(401).json({error: "You must be logged in"})
            }

            const {_id} = payload
            User.findById(_id).then(userdata =>{
                req.user=userdata
                next()
            })
        })
}