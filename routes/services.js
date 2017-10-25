/*
    Users Routes
*/
var express = require('express');
var services =  express.Router();
var mongoose = require('.././models/model');


services.get('/services',function(req, res){
             res.set('x-powered-by','Spabulous');
                mongoose.model('spa_services').find(function(err, data)
                {
                    if(err){
                        console.log(err);
                    }else{
                        res.jsonp(data);
                    }
                })
        })
        .get('/services/:id',function(req, res){
            res.set('x-powered-by','Spabulous');
            mongoose.model('spa_services').findOne(mongoose.Types.ObjectId(req.params.id))
                           .exec(function(err,data){
                            if(err){
                                    console.log(err);
                                }else{
                                    res.jsonp(data);
                                }
                           });
         })
        .post('/services',function(req, res){
            res.set('x-powered-by','Spabulous');
             newUser = mongoose.model('spa_services');
             let nUser =  new newUser(req.body)
             .save(function(err)
             {
               if(err)
               {    
                   errors = [];
                    list = ['_name','_class','_desc','_price','_duration'];
                    for (var i = 0; i < list.length; i++) {
                        if(err.errors[list[i]])
                        {
                            f = (list[i].replace('_','').charAt(0).toUpperCase() + list[i].replace('_','').substring(1));
                            errors.push({field:f,msg:err.errors[list[i]]['message'].replace(list[i],f)});
                        }
                    }
                    res.json(errors);
               }else{
                   alert({msg:'New Service Successfully Added!'});
               }
            })
        })
        .put('/services',function(req, res){
            res.set('x-powered-by','Spabulous');
            console.log('put');
        })
        .delete('/services/:id',function(req,res){
            res.set('x-powered-by','Spabulous');
            mongoose.model('spa_services').find({_id:mongoose.Types.ObjectId(req.params.id)})
            .remove(function(err,data){
                if(err){console.log(err.errors)};
                res.jsonp(data);
            }).exec();
        })



module.exports = services;