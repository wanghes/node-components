var session = require('express-session');
var cookieParser = require('cookie-parser');
var cate = require('../../model/jsCate');
var eventproxy = require('eventproxy');


exports.cate = function(req,res){
    res.render('admin/cate',{
        crumbs:[
            {selected:2,value:"管理JS代码"},
            {selected:1,value:"添加JS分类"}
        ],
        title:'管理JS代码',
        adminUser:req.session.user
    });
};
exports.doCate = function(req,res){
    var body = req.body;
    if(body.cateid=='' || body.name==''){
        return res.json({status:false,message:'每项都是必填项！'});
    }
    cate.add(body,function(err,doc){
        if(err){
            res.json({status:false,message:JSON.stringify(err)});
        }else{
            res.json({status:true,message:"添加成功！"});
        }
    });
};

exports.queryCate = function(req,res){
    cate.queryCate(function(err,docs){
        if(err){
            res.json({status:true,message:err});
        }else{
            res.json({status:true,docs:docs,message:'fetch ok'});
        }
    });
};


