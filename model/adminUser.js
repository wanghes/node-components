var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adminUserSchema = new Schema({
    username: {
        type:String,
        require:true
    },
    password:{
        type : String,
        required : true
    }
});

var userModel = mongoose.model('adminUser',adminUserSchema);

var user = function(){};

user.prototype.save = function(body,callback){
    if(body){
        var user = new userModel(body);
    }else {
        return;
    }
    user.save(function(err,doc){
        callback(err,doc);
    })
};

user.prototype.findAdminByName = function(username,callback){
    if(username){
        var conditions = {
            username:username
        };
        var query = userModel.findOne(conditions);
        query.exec(function(err,doc){
            callback(err,doc);
        });
    }
};

module.exports = new user();
