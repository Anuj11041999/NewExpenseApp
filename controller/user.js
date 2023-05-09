const User = require('../models/user');
const bcrpyt = require('bcrypt');
function isnotValid(string){
    if (string==undefined||string.length===0){
        return true
    }return false;
}
exports.signup = async (req,res)=>{
    try{
        const {name,email,password} = req.body;

    if(isnotValid(name)||isnotValid(email)||isnotValid(password)){
        return res.status(400).json({err:'Something is missing'})
    }
    const saltrounds = 10
    bcrpyt.hash(password, saltrounds, async(err,hash)=>{
        console.log(err);
        await User.create({name,email,password:hash})
        res.status(201).json({message:'New user created'})
    })
    
    }catch(err){
        res.status(403).json(err);
    }
}

exports.login = async (req,res,next)=>{
    try{
        const {email,password} = req.body;
        if (isnotValid(email)||isnotValid(password)){
            return res.status(400).json({message:"Something was missing",success:false})
        }
        const user = await User.findOne({where:{email:email}})
        if (!user){
            return res.status(404).json({err:"User not found"})
        }else{
            bcrpyt.compare(password,user.password,(err,result)=>{
                if(err){
                    throw new Error('Something went wrong');
                }if(result==true){
                    return res.status(200).json({success:true, message:"User login Successfully"})
                }else{
                    return res.status(401).json({success:false,message:"User not authorized"})
                }
            })
        }
    }catch(err){
        res.status(500).json({message:err,success:false})
    }
}

function generateAccessToken(id){

}