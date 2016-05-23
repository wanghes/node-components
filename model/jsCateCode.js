var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jsCateCodeSchema = new Schema({
    title: String,
    cateid: Number,
    des:String,
    comments:[{body:String,date:{ type: Date, default: Date.now }}],
    path:String,
    content:String,
    imgpath:{
        type:String
    },
    author:{
        type:String,
        default:'wang_hes'
    },
    date:{ type: Date, default: Date.now }
});
var jsCateCodeModel = mongoose.model('jsCateCode', jsCateCodeSchema);

var jsCateCode = function(){};
jsCateCode.prototype.save = function(body,callback){
    if(body){
        var example = new jsCateCodeModel(body);
    }
    example.save(function (err, doc) {
        callback(err,doc)
    });
};

jsCateCode.prototype.edit = function(id,body,callback){
    jsCateCodeModel.update({ _id: id }, body, { multi: false }, function (err, raw) {
        callback(err,raw);
    });
};

jsCateCode.prototype.delete = function(id, options, callback){
    jsCateCodeModel.findOneAndRemove({ _id: id }, options, function(err,doc){
        callback(err,doc);
    });
};

jsCateCode.prototype.getById = function(id,callback){
    if(id){
        var conditions = {
            _id:id
        };
        var query = jsCateCodeModel.findOne(conditions);
        query.exec(function(err,doc){
             callback(err,doc);
        });
    }
};

jsCateCode.prototype.getByCateId = function(cateId,body,callback){
    var conditions = {cateid:cateId},query;
    if(body){
        if(body.page){
            var offset = (body.page-1)*body.limit;
            query = jsCateCodeModel.find(conditions,null,{limit:body.limit,skip:offset});
        }else{
            query = jsCateCodeModel.find(conditions,null,{limit:body.limit});
        }
    }else{
        query = jsCateCodeModel.find(conditions,null,{});
    }

    query.sort({date:-1});
    query.exec(function(err,doc){
        callback(err,doc);
    });
};


jsCateCode.prototype.queryAll = function(body,callback){
    var query;
    if(body){
        if(body.page){
            var offset = (body.page-1)*body.limit;
            query = jsCateCodeModel.find({},null,{limit:body.limit,skip:offset});
        }else{
            query = jsCateCodeModel.find({},null,{limit:body.limit});
        }
    }else{
        query = jsCateCodeModel.find({});
    }
    query.select('author title date des cateid imgpath').sort({date:-1});
    query.exec(function(err,docs){
        callback(err,docs);
    });

};


jsCateCode.prototype.queryCounts = function(callback){
    var count = jsCateCodeModel.find({}).count();
    count.exec(function(err,count){
        callback(err,count);
    });
};

jsCateCode.prototype.queryCateCounts = function(cateId,callback){
    var count = jsCateCodeModel.find({cateid:cateId}).count();
    count.exec(function(err,count){
        callback(err,count);
    });
};

jsCateCode.prototype.del = function(id,callback){
    var conditions = {_id:id};
    jsCateCodeModel.remove(conditions,function(err,user){
        if(err){
            callback(err);
        }else{
            jsCateCodeModel.findById(id, function (err, user) {
                callback(null,user);
            })
        }

    })
};

jsCateCode.prototype.getNextIdByDate = function(date,callback){
    jsCateCodeModel.find({ date: { $gt: date }}).limit(1).select('_id cateid').sort({date:1}).exec(function(err,next){
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

jsCateCode.prototype.getPrevIdByDate = function(date,callback){
    jsCateCodeModel.find({ date: { $lt: date }}).limit(1).select('_id cateid').sort({date:-1}).exec(function(err,prev){
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

module.exports = new jsCateCode();
