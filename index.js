var express = require('express');
var bodyParser = require('body-parser');
// var userType = ["admin","manager","cashier","member","therapist","walk_in"];

var app = express();



// midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',require('./routes/users'));

// app.post('/users',function(req,res)
// {
//     console.log(req.body);
//     res.set('x-powered-by','Spabulous');
//     res.json(req.body);
// });

app.get('/',function( req, res)
{
    console.log("hello world!");
});

app.listen(8800);


