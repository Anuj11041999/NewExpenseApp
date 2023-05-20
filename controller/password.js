const ForgotPassword = require('../models/forgotPassword');
const User = require('../models/user');
require('dotenv').config()
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const Sib = require('sib-api-v3-sdk')

exports.forgotPassword = async (req,res)=>{
    try{
        const email = req.body.email;
        const user = await User.findOne({where:{email:email}});
        if (user){
            const id = uuid.v4();
            // user.createForgotPassword({id,active:true})
            // .catch(err=>{
            //     throw new Error(err);
            // })
        
        const client = Sib.ApiClient.instance
        const apiKey = client.authentications['api-key']
        apiKey.apiKey = process.env.API_KEY
        const tranEmailApi = new Sib.TransactionalEmailsApi();
        const sendSmtpEmail = new Sib.SendSmtpEmail();
        sendSmtpEmail.subject ='Change you password here';
        sendSmtpEmail.htmlContent=`<a href='https://localhost:3000/password/resetpassword/${id}'>Click here</a>`   
        sendSmtpEmail.sender = {
            email: 'anujchilwery@gmail.com',
            name : 'From Anuj Chilwery'
        }
        sendSmtpEmail.to = [{email}]
        sendSmtpEmail.replyTo = {email:'lele@mailinator.com',name:'Reply name'}
        console.log(sendSmtpEmail);

        console.log(tranEmailApi.sendTransacEmail);
        await tranEmailApi.sendTransacEmail(sendSmtpEmail)
        return res.status(200).json({success:true, message:'Email Sent successfully'});
    }else{
        throw new Error("User doesn't exist");
    }
    }catch(err){
        res.status(500).json(err);
    }
}

exports.resetPassword = async(req,res)=>{
    const id = req.params.id;
    const forgotpassword = await ForgotPassword.findOne({where:{id:id}})
    if (forgotpassword){
        forgotpassword.update({active:false})
        res.status(200).send(`<html><script> function formsubmi(e){
            e.preventDefault();
            console.log('success);
        }</script>
        <form action="/password/updatepassword/${id} method="get">
            <label for="password">Enter new password</label>
            <input name="password" type="password" required></input>
            <button>reset</button>
            </form>
            </html>`)
            res.end()
    }
}
exports.updatePassword = async(req,res)=>{
    try{
        const newpassword = req.query.password;
        const id = req.params.id;
        const forgotpassword = await ForgotPassword.findOne({where:{id:id}})
        if (forgotpassword){
            const user = await User.findOne({where:{id:forgotpassword.userId}})
            if(user){
                const saltrounds = 10;
                bcrypt.hash(password, saltrounds, async (err, hash)=>{
                    if(err){
                        throw new Error(err);
                    }
                    await user.update({password:hash})
                    return res.status(200).json({message:'Password updated successfully'})
                })
            }
        }else{
            return res.status(404).json({message:"User doesn't exists"})
        }
    }catch(e){
        throw new Error(e)
    }
}

