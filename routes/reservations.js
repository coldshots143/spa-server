/*
   Reservations Routes
*/
var express = require('express');
var reservations =  express.Router();
var mongoose = require('.././models/model');


reservations.get('/reservations',function(req, res){
             
                mongoose.model('spa_reservations').find(function(err, data)
                {
                    if(err){
                        console.log(err);
                    }else{
                        res.json(data);
                    }
                })
        })
        .get('/reservations/:id',function(req, res){
            
            mongoose.model('spa_reservations').findOne(mongoose.Types.ObjectId(req.params.id))
                           .exec(function(err,data){
                            if(err){
                                    console.log(err);
                                }else{
                                    res.json(data);
                                }
                           });
         })
        .post('/reservations',function(req, res){
            
             newUser = mongoose.model('spa_reservations');
             let nUser =  new newUser(req.body)
             .save(function(err)
             {
               if(err)
               {    
                   errors = [];
                    // list = ['_name','_class','_desc','_price','_duration'];
                    // console.log(err.errors[0]);
                    // for (var i = 0; i < list.length; i++) {
                    //     if(err.errors[list[i]])
                    //     {
                            // f = (list[i].replace('_','').charAt(0).toUpperCase() + list[i].replace('_','').substring(1));
                    //         errors.push({field:f,msg:err.errors[list[i]]['message'].replace(list[i],f)});
                    //     }
                    // }
                    res.json(err.errors);
               }else{
                    res.json({msg:'New Service Successfully Added!'});
               }
            })
        })
        .put('/reservations',function(req, res){
            
            console.log('put');
        })
        .delete('/reservations/:id',function(req,res){
            
            mongoose.model('spa_reservations').find({_id:mongoose.Types.ObjectId(req.params.id)})
            .remove(function(err,data){
                if(err){console.log(err.errors)};
                res.json(data);
            }).exec();
        })



module.exports = reservations;