var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cateSchema = new Schema({
    cateid:Number,
    name: String,
    date:{ type: Date, default: Date.now }
});

var cateModel = mongoose.model('frameworkCate',cateSchema);

var frameworkCate = function(){};
frameworkCate.prototype.add = function(body,callback){
    if(body){
        var cateExample = new cateModel(body);
    }
    cateExample.save(function(err,doc){
        callback(err,doc);
    });
};

frameworkCate.prototype.queryFrameworkCate = function(callback){
    cateModel.find({}).exec(function(err,docs){
        callback(err,docs);
    });
};

frameworkCate.prototype.getById = function(id,callback){
    if(id){
        var conditions = {
            cateid:id
        };
        var query = cateModel.findOne(conditions);
        query.exec(function(err,doc){
            callback(err,doc);
        });
    }
};

module.exports = new frameworkCate();