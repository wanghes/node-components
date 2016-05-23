var artcleCate = require('../../model/articleCate');
var article = require('../../model/article');
var eventproxy = require('eventproxy');
var runLog = require("../../lib/log/log").logger("后台文章");

exports.addArticle = function(req,res){
    var proxy = new eventproxy();
    proxy.all('articleCate',function(articleCate){
        res.render('admin/addArticle',{
            crumbs:[
                {selected:4,value:"管理文章"},
                {selected:2,value:"添加文章"}
            ],
            title:'添加文章',
            articleCate:articleCate,
            adminUser:req.session.user
        })
    });

    artcleCate.queryArticleCate(function(err,docs){
        if(err){
            runLog.error('查询文章分类失败错误如下\n',err);
        }else{
            if(docs){
                runLog.info('查询文章成功：\n',docs);
                proxy.emit('articleCate',docs);
            }
        }
    });
};

exports.doAddArticle = function(req,res){
    var body = req.body;
    article.save(body,function(err,doc){
        if(err){
            runLog.error('添加文章失败\n',err);
            res.json({status:false,message:'lose!'});
        }else{
            runLog.info('添加文章成功：\n',doc);
            res.json({status:true,message:'ok!'});
        }
    });
};

exports.editArticle = function(req,res){
    var id = req.params.id;
    var proxy = new eventproxy();
    proxy.all('article','articleCates',function(article,articleCates){
        res.render('admin/editArticle',{
            title:article['title'],
            crumbs:[
                {selected:4,value:"管理文章"},
                {selected:3,value:"查看所有文章列表 > " + article['title']}
            ],
            article:article,
            articleCates:articleCates,
            adminUser:req.session.user
        })
    });
    artcleCate.queryArticleCate(function(err,docs){
        if(err){
            runLog.error('查询文章分类失败错误如下\n',err);
        }else{
            if(docs){
                runLog.info('查询文章成功：\n',docs);
                proxy.emit('articleCates',docs);
            }
        }
    });
    article.getById(id,function(err,doc){
        if(err){
            runLog.error('按照文章ID查询文章失败\n',err);
        }else{
            if(doc){
                runLog.info('按照文章ID查询文章成功：\n',doc);
                proxy.emit('article',doc);
            }
        }
    });
};

exports.doEditArticle = function(req,res){
    var body = req.body;
    var id = req.params.id;
    if(body.imgpath==''){
        body.imgpath = '/static/images/default.jpg';
    }
    delete body.id;
    article.edit(id,body,function(err,doc){
        if(err){
            res.json({status:false,message:'lose!'});
        }else{
            res.json({status:true,message:'ok!'});
        }
    });
};

exports.deleteArticle = function(req,res){
    var id = req.params.id;
    var options = {};
    article.delete(id,options,function(err,doc){
        if(err){
            res.json({status:false,message:'lose!'});
        }else{
            res.json({status:true,message:'delete ok!'});
        }
    });
};

exports.queryAll = function(req,res){
    var proxy = new eventproxy();
    proxy.all('articles',function(articles){
        res.render('admin/articleList',{
            title:'查看所有文章列表',
            crumbs:[
                {selected:4,value:"管理文章"},
                {selected:3,value:"查看所有文章列表"}
            ],
            articles:articles,
            adminUser:req.session.user
        });
    });
    article.queryAll({},function(err,docs){
        if(err){
            runLog.error('查询所有文章失败\n',err);
        }else{
            if(docs){
                runLog.info('查询所有文章成功：\n',docs);
                proxy.emit('articles',docs);
            }
        }
    });

};

exports.queryById = function(req,res){
    var id = req.params.id;
    var proxy = new eventproxy();
    proxy.all('article',function(article){
        res.render('admin/articleOne',{
            title:article['title'],
            crumbs:[
                {selected:4,value:"管理文章"},
                {selected:3,value:"查看所有文章列表 > " + article['title']}
            ],
            article:article,
            adminUser:req.session.user
        });
    });
    article.getById(id,function(err,doc){
        if(err){
            runLog.error('按照文章ID查询文章失败\n',err);
        }else{
            if(doc){
                runLog.info('按照文章ID查询文章成功：\n',doc);
                proxy.emit('article',doc);
            }
        }
    });
};

exports.cateList = function(req,res){
    var cateId = req.params.cateid;
    var proxy = new eventproxy();
    proxy.all('lists','cate',function(lists,cate){
        res.render('admin/articleCateList',{
            title:'文章列表',
            crumbs:[
                {selected:4,value:"管理文章 > 分类【"+cate['name']+"】文章列表"}
            ],
            lists:lists,
            adminUser:req.session.user
        })
    });

    article.getByCateId(cateId,null,function(err,docs){
        if(err){
            runLog.error('按照分类ID查询该分类ID下的所有文章失败\n',err);
        }else{
            if(docs){
                runLog.info('按照分类ID查询该分类ID下的所有文章成功：\n',docs);
                proxy.emit('lists',docs);
            }
        }
    });
    artcleCate.getById(cateId,function(err,doc){
        if(err){
            console.log(err);
        }else{
            proxy.emit('cate',doc);
        }
    })
};
