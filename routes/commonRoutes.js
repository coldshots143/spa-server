/*
    Common Routes
*/

var express      = require('express');
var commonRoutes =  express.Router();
var jwt          = require('jsonwebtoken');
var mongoose     = require('.././models/model');

commonRoutes.use('/:link',function(req, res, next)
{
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['x-api-key '];
            list = ['users','rooms','services','promos','reservations','points'];
            if(token)
            {
                jwt.verify(token, require('.././config/config').secret, function(err, decoded)
                {
                    if(err){
                        return res.json({success:false,message:'Failed to Authenticate token!.'});
                    }else{
                        if(list.includes(req.params.link))
                        {
                            req.decoded = decoded;
                            next();
                        }else{
                            res.status(404);
                            res.send('404 Page Not Found');
                        }
                    }
                });
            }else{
                return res.status(403).send({success:false,message:'No Token Provided!.'});
            }
});
commonRoutes.get('/:link',function(req, res)
            {
               mongoose.model('spa_'+req.params.link)
                       .find(function(err, data)
                        {
                            if(err) throw err;
                            res.json(data);
                        })
            })
            .get('/:link/:id',function(req, res){
                mongoose.model('spa_'+req.params.link)
                        .findOne(mongoose.Types.ObjectId(req.params.id))
                        .exec(function(err,data)
                        {
                            if(err) throw err;
                            res.json(data);
                        });
             
            })
            .post('/:link',function(req, res){
                    newData = mongoose.model('spa_'+req.params.link);
                    let nData =  new newData(req.body)
                    .save(function(err)
                    {
                    if(err)
                    {  
                        res.json(err.errors);
                    }else{
                        res.json({msg:'Success!!!'});
                    }
                    })
               
            })
            .put('/:link',function(req, res){
                console.log('put');
                
            })
            .delete('/:link/:id',function(req,res){
                mongoose.model('spa_'+req.params.link)
                        .find({_id:mongoose.Types.ObjectId(req.params.id)})
                        .remove(function(err,data){
                            if(err){console.log(err.errors)};
                            res.json(data);
                        }).exec();
               
            });


module.exports = commonRoutes;