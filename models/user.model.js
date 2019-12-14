const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

//simple schema
const Userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:3,
        maxlength:255
    }
})

//custom method to generate authToken

Userschema.methods.generateAuthToken = ()=>{
    const token = jwt.sign({_id:this._id},config.get('myprivatekey'));
    return token;
}

const User = mongoose.model('User',Userschema)

//function to validate user

validateUser = (user) =>{
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(3).max(255).required()
    };

    return Joi.validate(user,schema);
}

exports.User = User;
exports.validate = validateUser;