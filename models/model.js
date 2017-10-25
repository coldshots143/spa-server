
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/spa', { useMongoClient: true });
mongoose.Promise = global.Promise;

/*
    Users Model
*/
mongoose.model("spa_users",
                mongoose.Schema({
                            _username:{type:String,required:true,unique:true,dropDups:true},
                            _password:{type:String,required:true},
                            _fname:{type:String,required:true},
                            _lname:{type:String,required:true},
                            _email:{type:String,required:true},
                            _status:{type:String,required:true},
                            _type:{type:String,required:true},
                            _contact:{type:Number,required:false},
                            _created:{type:Date,default:Date.now}
                        })
                );
/*
    Rooms Model
*/
mongoose.model("spa_rooms",
                mongoose.Schema({
                        room_name:{type:String,required:false,unique:true},
                        })
                );
/*
    Services Model
*/
mongoose.model('spa_services',
                mongoose.Schema({
                    _name:{type:String,required:true},
                    _class:{type:String,required:true},
                    _description:{type:String,required:true},
                    _price:{type:Number,required:true},//in decimal
                    _duration:{type:Number,required:true},//in minutes
                    _created:{type:Date,default:Date.now}
                })
);

// module.exports.users_m = users_m;
module.exports = mongoose;
