var express      = require('express');
var login        =  express.Router();
var jwt          = require('jsonwebtoken');
var mongoose     = require('.././models/model');

login.post('/auth',function(req,res){
    mongoose.model('spa_users').findOne({_username:req.body.username},function(err,user){
        if(err) throw err;
        if(!user){
            res.json({success:false,message:'Authentication Failed!!!'});
        }else if(user){
            if(user._password != req.body.password)
            {
                res.json({success:false,message:'Authentication Failed!!!'});
            }else{
               res.json({success:true,
                          message:'Success',
                          token:  jwt.sign({user},//data
                                            require('.././config/config').secret,//secret key
                                            {algorithm:'HS512', expiresIn:'24h'}
                                         )
                        });
            }
        }
    })
});

module.exports = login;
