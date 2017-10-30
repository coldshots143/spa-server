/*
    Common Routes
*/

var express = require('express');
var commonRoutes =  express.Router();
var mongoose = require('.././models/model');


commonRoutes.get('/:link',function(req, res){
        if(linkChecker(req.params.link))
           {     mongoose.model('spa_'+req.params.link).find(function(err, data)
                {
                    if(err){
                        console.log(err);
                    }else{
                        res.json(data);
                    }
                })
            }else{
                res.status(404);
                res.send('404 Page Not Found');
                
            }
        })
        .get('/:link/:id',function(req, res){
            if(linkChecker(req.params.link))
            {
                mongoose.model('spa_'+req.params.link).findOne(mongoose.Types.ObjectId(req.params.id))
                            .exec(function(err,data){
                                if(err){
                                        console.log(err);
                                    }else{
                                        res.json(data);
                                    }
                            });
            }else{
                res.status(404);
                res.send('404 Page Not Found');
            }
         })
        .post('/:link',function(req, res){
            if(linkChecker(req.params.link))
            {
                newUser = mongoose.model('spa_'+req.params.link);
                let nUser =  new newUser(req.body)
                .save(function(err)
                {
                if(err)
                {    1
                        res.json(err.errors);
                }else{
                    res.json({msg:'Success!!!'});
                }
                })
            }else{
                res.status(404);
                res.send('404 Page Not Found');
            }
        })
        .put('/:link',function(req, res){
            if(linkChecker(req.params.link))
            {
                 console.log('put');
            }else{
                res.status(404);
                res.send('404 Page Not Found');
            }
        })
        .delete('/:link/:id',function(req,res){
            if(linkChecker(req.params.link))
            {
                mongoose.model('spa_'+req.params.link).find({_id:mongoose.Types.ObjectId(req.params.id)})
                .remove(function(err,data){
                    if(err){console.log(err.errors)};
                    res.json(data);
                }).exec();
            }else{
                res.status(404);
                res.send('404 Page Not Found');
            }
        });

linkChecker = function(l){
    list = ['users','rooms','services','promos','reservations','points'];
    return list.includes(l);
}


module.exports = commonRoutes;