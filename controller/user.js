const User = require('../models/user');

exports.signup = (req,res)=>{
    const {name,email,password} = req.body;

    if(name==undefined|| name.length===0|| password==undefined||password.length===0|| email==undefined||email.length===0){
        return res.status(400).json({err:'Something is missing'})
    }
    User.create({name,email,password}).then(()=>{
        res.status(201).json({message:'New user created'})
    }).catch(err=>{
        res.status(403).json(err);
    })
}

function generateAccessToken(id){

}