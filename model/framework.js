var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var frameworkSchema = new Schema({
    title: String,
    des:String,
    cateid: Number,
    comments:[{body:String,date:{ type: Date, default: Date.now }}],
    content:String,
    author:{
        type:String,
        default:'wang_hes'
    },
    date:{ type: Date, default: Date.now }
});
var frameworkModel = mongoose.model('framework',frameworkSchema);

var framework = function(){};

framework.prototype.save = function(body,callback){
    if(body){
        var example = new frameworkModel(body);
    }

    example.save(function (err, doc) {
        callback(err,doc)
    });
};

framework.prototype.edit = function(id,body,callback){
    frameworkModel.update({ _id: id }, body, { multi: false }, function (err, raw) {
        callback(err,raw);
    });
};

framework.prototype.delete = function(id, options, callback){
    frameworkModel.findOneAndRemove({ _id: id }, options, function(err,doc){
        callback(err,doc);
    });
};


framework.prototype.getByCateId = function(cateId,body,callback){
    var conditions = {cateid:cateId},query;
    if(body){
        if(body.page){
            var offset = (body.page-1)*body.limit;
            query = frameworkModel.find(conditions,null,{limit:body.limit,skip:offset});
        }else{
            query = frameworkModel.find(conditions,null,{limit:body.limit});
        }
    }else{
        query = frameworkModel.find(conditions,null,{});
    }
    query.sort({data:-1});
    query.exec(function(err,doc){
        callback(err,doc);
    });
};


framework.prototype.getById = function(id,callback){
    if(id){
        var conditions = {
            _id:id
        };
        var query = frameworkModel.findOne(conditions);
        query.exec(function(err,doc){
            callback(err,doc);
        });
    }
};

framework.prototype.queryAll = function(body,callback){
    var query;
    if(body){
        if(body.page){
            var offset = (body.page-1)*body.limit;
            query = frameworkModel.find({},null,{limit:body.limit,skip:offset});
        }else{
            query = frameworkModel.find({},null,{limit:body.limit});
        }
    }else{
        query = frameworkModel.find({});
    }
    query.select('author title date des cateid').sort({date:-1});
    query.exec(function(err,docs){
        callback(err,docs);
    });
};

framework.prototype.queryCounts = function(callback){
    var count = frameworkModel.find({}).count();
    count.exec(function(err,count){
        //console.log('%s,%s',err,count);
        callback(err,count);
    });
};

framework.prototype.queryCateCounts = function(cateId,callback){
    var count = frameworkModel.find({cateid:cateId}).count();
    count.exec(function(err,count){
        callback(err,count);
    });
};

framework.prototype.getNextIdByDate = function(date,callback){
    frameworkModel.find({ date: { $gt: date }}).limit(1).select('_id cateid')
    .sort({date:1}).exec(function(err,next){
        if(err){
            callback(err,next);
        }else{
            if(next){
                callback(err,next[0]);
            }else{
                callback(err,null);
            }
        }
    });
};

framework.prototype.getPrevIdByDate = function(date,callback){
    frameworkModel.find({ date: { $lt: date }}).limit(1).select('_id cateid')
    .sort({date:-1}).exec(function(err,prev){
        if(err){
            callback(err,prev);
        }else{
            if(prev){
                callback(err,prev[0]);
            }else{
                callback(err,null);
            }
        }
    });
};

module.exports = new framework();
