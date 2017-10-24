/*
    Users Routes
*/
var express = require('express');
var users_r =  express.Router();
var mongoose = require('.././models/model');


users_r.get('/users',function(req, res){
                res.set('x-powered-by','Spabulous');
                mongoose.model('spa_users').find(function(err, data)
                {
                    if(err){
                        console.log(err);
                    }else{
                        res.json(data);
                    }
                })
        })
        .get('/users/:id',function(req, res){
            res.set('x-powered-by','Spabulous');
            mongoose.model('spa_users').findOne(mongoose.Types.ObjectId(req.params.id))
                           .exec(function(err,data){
                            if(err){
                                    console.log(err);
                                }else{
                                    res.json(data);
                                }
                           });
         })
        .post('/users',function(req, res){
             newUser = mongoose.model('spa_users');
             let nUser =  new newUser(req.body)
             .save(function(err)
             {
               if(err)
               {    
                   errors = [];
                    list = ['_username','_password','_fname','_lname','_email','_status','_type','_contact'];
                    for (var i = 0; i < list.length; i++) {
                        if(err.errors[list[i]])
                        {
                            f = (list[i].replace('_','').charAt(0).toUpperCase() + list[i].replace('_','').substring(1));
                            errors.push({field:f,msg:err.errors[list[i]]['message'].replace(list[i],f)});
                        }
                    }
                    res.json(errors);
               }else{
                   res.json({msg:'Account Successfully Created!'});
               }
            })
        })
        .put('/users',function(req, res){
            console.log('put');
        })
        .delete('/users/:id',function(req,res){
            mongoose.model('spa_users').find({_id:mongoose.Types.ObjectId(req.params.id)})
            .remove(function(err,data){
                if(err){console.log(err.errors)};
                res.jsonp(data);
            }).exec();
        })



module.exports = users_r;