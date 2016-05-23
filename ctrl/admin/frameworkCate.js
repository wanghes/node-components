var session = require('express-session');
var cookieParser = require('cookie-parser');
var frameworkCate = require('../../model/frameworkCate');
var eventproxy = require('eventproxy');


exports.frameworkCate = function(req,res){
    res.render('admin/frameworkCate',{
        crumbs:[
            {selected:3,value:"管理框架文章"},
            {selected:1,value:"添加框架文章分类"}
        ],
        title:'添加框架文章分类',
        adminUser:req.session.user
    });
};
exports.doFrameworkCate = function(req,res){
    var body = req.body;
    if(body.cateid=='' || body.name==''){
        return res.json({status:false,message:'每项都是必填项！'});
    }
    frameworkCate.add(body,function(err,doc){
        if(err){
            res.json({status:false,message:JSON.stringify(err)});
        }else{
            res.json({status:true,message:"添加成功！"});
        }
    });
};

exports.queryFrameworkCate = function(req,res){
    frameworkCate.queryFrameworkCate(function(err,docs){
        if(err){
            res.json({status:true,message:err});
        }else{
            res.json({status:true,docs:docs,message:'fetch ok'});
        }
    });
};

exports.addFramework = function(req,res){
    res.render('admin/addFramework',{
        crumbs:[
            {selected:3,value:"管理框架文章"},
            {selected:2,value:"添加框架文章"}
        ],
        title:'添加框架文章',
        adminUser:req.session.user
    })
};

