const User = require('../models/user');
const Sib = require('sib-api-v3-sdk');
require('dotenv').config();

exports.forgotPassword = async (req,res)=>{
    try{
        const email = req.body.email;
        const client = Sib.ApiClient.instance;
        const apiKey = client.authentication['api-key'];
        apiKey.apikey = process.env.API-KEY;
        const tranEmailApi = new Sib-TransactionalEmailsApi();

        const sender = {
            email: 'anujchilwery@gmail.com'
        }
        const receiver = [{
            email: email
        },]
        await tranEmailApi.sendTransacEmail({
            sender,
            to:receiver,
            subject:'Change you password here',
            textContent:`This is a email for changing your password`,
            htmlContent:`<a href="../frontend/signup/signup.html">Click here</a>`
        })
        
    }catch(err){
        res.status(500).json(err);
    }
}
