const User = require('../models/user');

function isnotValid(string){
    if (string==undefined||string.length===0){
        return true
    }return false;
}
exports.signup = (req,res)=>{
    const {name,email,password} = req.body;

    if(isnotValid(name)||isnotValid(email)||isnotValid(password)){
        return res.status(400).json({err:'Something is missing'})
    }
    User.create({name,email,password}).then(()=>{
        res.status(201).json({message:'New user created'})
    }).catch(err=>{
        res.status(403).json(err);
    })
}

exports.login = async (req,res,next)=>{
    const {email,password} = req.body;
    const user = await User.findOne({where:{email:email}})
    if (!user){
        return res.status(404).json({err:"User not found"})
    }else{
        if(user.password != password){
            return res.status(401).json({err:"User not authorized"})
        }
    }
    return res.status(200).json({message:"User login Successfully"})
    
}
function generateAccessToken(id){

}