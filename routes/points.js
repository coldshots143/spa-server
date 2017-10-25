/*
   Services Routes
*/
var express = require('express');
var points =  express.Router();
var mongoose = require('.././models/model');


points.get('/points',function(req, res){
             
                mongoose.model('spa_points').find(function(err, data)
                {
                    if(err){
                        console.log(err);
                    }else{
                        res.json(data);
                    }
                })
        })
        .get('/points/:id',function(req, res){
            
            mongoose.model('spa_points').findOne(mongoose.Types.ObjectId(req.params.id))
                           .exec(function(err,data){
                            if(err){
                                    console.log(err);
                                }else{
                                    res.json(data);
                                }
                           });
         })
        .post('/points',function(req, res){
            
             newUser = mongoose.model('spa_points');
             let nUser =  new newUser(req.body)
             .save(function(err)
             {
               if(err)
               {    
                   errors = [];
                    list = ['_name','_class','_desc','_price','_duration'];
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
        .put('/points',function(req, res){
            
            console.log('put');
        })
        .delete('/points/:id',function(req,res){
            
            mongoose.model('spa_points').find({_id:mongoose.Types.ObjectId(req.params.id)})
            .remove(function(err,data){
                if(err){console.log(err.errors)};
                res.json(data);
            }).exec();
        })



module.exports = points;