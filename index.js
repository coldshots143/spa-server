var express = require('express');
var bodyParser = require('body-parser');
// var userType = ["admin","manager","cashier","member","therapist","walk_in"];

var app = express();



// midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',require('./routes/commonRoutes'));
// app.use('/',require('./routes/services'));
// app.use('/',require('./routes/promos'));
// app.use('/',require('./routes/points'));
// app.use('/',require('./routes/reservations'));


app.listen(8800);


