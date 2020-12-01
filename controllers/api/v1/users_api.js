const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message:"Invalid Username or Passwrord"
            })
        }
        else{
            return res.json(200,{
                message:"sign In Successful, here is your token, please keep it safe!",
                data:{
                    token: jwt.sign(user.toJSON(),'Connect',{expiresIn:'100000'})
                }
            })
        }
    }catch(err){
       console.log("Error in fetching user while handling API request",err);
       return res.json(500,{
           message:"Internal Server Error"
       }); 
    }
}