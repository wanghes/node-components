var session = require('express-session');
var cookieParser = require('cookie-parser');
var frameworkCate = require('../../model/frameworkCate');
var articleCate = require('../../model/articleCate');
var eventproxy = require('eventproxy');


exports.index = function(req,res){
    var currentUser = req.session.user;
    res.render('admin/index',{
        index:1,
        title:'后台首页',
        adminUser:currentUser
    })
};

exports.list = function(req,res){
    res.render('admin/list',{
        crumbs:[
            {selected:1,value:"仪表盘"}
        ],
        title:'管理代码',
        adminUser:req.session.user
    })
};








