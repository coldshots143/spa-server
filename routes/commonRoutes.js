/*
    Users Routes
*/
var express = require('express');
var commonRoutes =  express.Router();
var mongoose = require('.././models/model');


commonRoutes.get('/:link',function(req, res){
                mongoose.model('spa_'+req.params.link).find(function(err, data)
                {
                    if(err){
                        console.log(err);
                    }else{
                        res.json(data);
                    }
                })
        })
        .get('/:link/:id',function(req, res){
        
            mongoose.model('spa_'+req.params.link).findOne(mongoose.Types.ObjectId(req.params.id))
                           .exec(function(err,data){
                            if(err){
                                    console.log(err);
                                }else{
                                    res.json(data);
                                }
                           });
         })
        .post('/:link',function(req, res){
        
             newUser = mongoose.model('spa_'+req.params.link);
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
        .put('/:link',function(req, res){
        
            console.log('put');
        })
        .delete('/:link/:id',function(req,res){
        
            mongoose.model('spa_'+req.params.link).find({_id:mongoose.Types.ObjectId(req.params.id)})
            .remove(function(err,data){
                if(err){console.log(err.errors)};
                res.json(data);
            }).exec();
        })



module.exports = commonRoutes;