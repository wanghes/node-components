var frameworkCate = require('../../model/frameworkCate');
var framework = require('../../model/framework');
var eventproxy = require('eventproxy');

exports.addFramework = function(req,res){
    var proxy = new eventproxy();
    proxy.all('frameworkCates',function(frameworkCates){
        res.render('admin/addFramework',{
            title:'添加框架文章',
            crumbs:[
                {selected:3,value:"管理框架文章"},
                {selected:2,value:"添加框架文章"}
            ],
            frameworkCates:frameworkCates,
            adminUser:req.session.user
        });
    });

    frameworkCate.queryFrameworkCate(function(err,docs){
        if(err){
            console.log(err);
        }else{
            if(docs){
                proxy.emit('frameworkCates',docs)
            }
        }
    });

};

exports.doAddFramework = function(req,res){
    var body = req.body;
    framework.save(body,function(err,doc){
        if(err){
            res.json({status:false,message:'lose!'});
        }else{
            console.log(doc);
            res.json({status:true,message:'ok!'});
        }
    });
};

exports.editFramework = function(req,res){
    var id = req.params.id;
    var proxy = new eventproxy();
    proxy.all('framework','frameworkCates',function(framework,frameworkCates){
        res.render('admin/editFramework',{
            title:"WEB前端开发框架文章修改",
            crumbs:[
                {selected:3,value:"管理框架文章"},
                {selected:3,value:"查看所有框架文章列表 > "+framework['title']}
            ],
            framework:framework,
            frameworkCates:frameworkCates,
            adminUser:req.session.user
        })
    });
    frameworkCate.queryFrameworkCate(function(err,docs){
        if(err){
            console.log(err);
        }else{
            if(docs){
                proxy.emit('frameworkCates',docs)
            }
        }
    });
    framework.getById(id,function(err,docs){
        if(err){
            console.log(err);
        }else{
            if(docs){
                proxy.emit('framework',docs);
            }
        }
    });
};

exports.doEditFramework = function(req,res){
    var body = req.body;
    var id = req.params.id;
    if(body.imgpath==''){
        body.imgpath = '/static/images/default.jpg';
    }
    delete body.id;
    framework.edit(id,body,function(err,doc){
        if(err){
            res.json({status:false,message:'lose!'});
        }else{
            res.json({status:true,message:'ok!'});
        }
    });
};

exports.deleteFramework = function(req,res){
    var id = req.params.id;
    var options = {};
    framework.delete(id,options,function(err,doc){
        if(err){
            res.json({status:false,message:'lose!'});
        }else{
            res.json({status:true,message:'delete ok!'});
        }
    });
};

exports.queryAll = function(req,res){
    var proxy = new eventproxy();
    proxy.all('frameworks',function(frameworks){
        res.render('admin/frameworkList',{
            title:'查看所有框架文章列表',
            crumbs:[
                {selected:3,value:"管理框架文章"},
                {selected:3,value:"查看所有框架文章列表"}
            ],
            frameworks:frameworks,
            adminUser:req.session.user
        });
    });

    framework.queryAll({},function(err,docs){
        if(err){
            console.log(err);
        }else{
            if(docs){
                proxy.emit('frameworks',docs)
            }
        }
    });
};


exports.cateList = function(req,res){
    var cateId = req.params.cateid;
    var proxy = new eventproxy();

    proxy.all('lists','cate',function(lists,cate){
        res.render('admin/frameworkCateList',{
            title:'框架文章列表',
            crumbs:[
                {selected:3,value:"管理框架文章 > 分类【"+cate['name']+"】框架文章列表"}
            ],
            lists:lists,
            adminUser:req.session.user
        })
    });

    framework.getByCateId(cateId,null,function(err,docs){
        if(err){
            console.log(err);
        }else{
            proxy.emit('lists',docs);
        }
    });

    frameworkCate.getById(cateId,function(err,doc){
        if(err){
            console.log(err);
        }else{
            proxy.emit('cate',doc);
        }
    })
};

exports.queryById = function(req,res){
    var id = req.params.id;
    var proxy = new eventproxy();
    proxy.all('framework',function(framework){
        res.render('admin/frameworkOne',{
            title:framework.title,
            crumbs:[
                {selected:3,value:"管理框架文章"},
                {selected:3,value:"查看所有框架文章列表 > "+framework['title']}
            ],
            framework:framework,
            adminUser:req.session.user
        })
    });
    framework.getById(id,function(err,docs){
        if(err){
            console.log(err);
        }else{
            if(docs){
                proxy.emit('framework',docs);
            }
        }
    });
};
