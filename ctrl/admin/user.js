var crypto = require('crypto');
var adminUser = require('../../model/adminUser');
var eventproxy = require('eventproxy');

exports.showRegister = function(req,res){
    if(!req.session.user){
        res.redirect('/admin');
    }else{
        res.render('admin/showRegister',{
            title:'后台用户添加',
            crumbs:[
                {selected:5,value:"添加后台用户"}
            ],
            adminUser:req.session.user
        });
    }
};

exports.doRegister = function(req,res){
    var user = req.body;
    user.password = crypto.createHash('sha1').update(user.password).digest('hex');
    adminUser.save(user,function(err,doc){
        if(err){
            res.json({status:false,message:JSON.stringify(err)});
        }else{
            res.json({status:true,message:'添加成功'});
        }
    });
};

exports.login = function(req,res){
    /*res.clearCookie('name2');*/
    if(req.session.user){
        res.redirect('/admin');
    }else {
        res.render('admin/login', {
            title: '后台用户登录'
        });
    }
};

exports.doLogin = function(req,res){
    var body = req.body;
    if(body.username =='' || body.password ==''){
        res.json({stauts:false,message:"用户名和密码都是必填项！"});
    }
    var password = crypto.createHash('sha1').update(body.password).digest('hex');
    adminUser.findAdminByName(body.username,function(err,doc){
        if(err){
            res.json({stauts:false,message:JSON.stringify(err)});
        }else{
            if(doc){
                if(doc.password != password){
                    res.json({status:false,message:'密码不对'});
                    return;
                }
                req.session.user = doc;
                res.cookie('adminUser', doc.username, { maxAge: 900000, httpOnly: true });
                res.send({status:true,message:'登录成功'});
            }else{
                res.json({status:false,message:'还没有该用户！'});
            }
        }
    });
};

exports.logout = function(req,res){
    req.session.destroy(function () {
        res.redirect('/admin/login');
    });
};

