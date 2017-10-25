/*
   Promos Routes
*/
var express = require('express');
var promos =  express.Router();
var mongoose = require('.././models/model');


promos.get('/promos',function(req, res){
             
                mongoose.model('spa_promos').find(function(err, data)
                {
                    if(err){
                        console.log(err);
                    }else{
                        res.json(data);
                    }
                })
        })
        .get('/promos/:id',function(req, res){
            
            mongoose.model('spa_promos').findOne(mongoose.Types.ObjectId(req.params.id))
                           .exec(function(err,data){
                            if(err){
                                    console.log(err);
                                }else{
                                    res.json(data);
                                }
                           });
         })
        .post('/promos',function(req, res){
            
             newUser = mongoose.model('spa_promos');
             let nUser =  new newUser(req.body)
             .save(function(err)
             {
               if(err)
               {    
                   errors = [];
                    list = ['_amount','_price','_duration'];
                    // console.log(err.errors[0]);
                    for (var i = 0; i < list.length; i++) {
                        if(err.errors[list[i]])
                        {
                            f = (list[i].replace('_','').charAt(0).toUpperCase() + list[i].replace('_','').substring(1));
                            errors.push({field:f,msg:err.errors[list[i]]['message'].replace(list[i],f)});
                        }
                    }
                    res.json(errors);
               }else{
                    res.json({msg:'New Service Successfully Added!'});
               }
            })
        })
        .put('/promos',function(req, res){
            
            console.log('put');
        })
        .delete('/promos/:id',function(req,res){
            
            mongoose.model('spa_promos').find({_id:mongoose.Types.ObjectId(req.params.id)})
            .remove(function(err,data){
                if(err){console.log(err.errors)};
                res.json(data);
            }).exec();
        })



module.exports = promos;