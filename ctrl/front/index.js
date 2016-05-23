var moment = require('moment');
var eventProxy = require('eventproxy');
var runLog = require("../../lib/log/log").logger("前端首页");
var jsCate = require('../../model/jsCate');
var frameworkCate = require('../../model/frameworkCate');
var articleCate = require('../../model/articleCate');
var jsCateCode = require('../../model/jsCateCode');
var framework = require('../../model/framework');
var article = require('../../model/article');


exports.index = function(req,res){
    var proxy = new eventProxy();
    proxy.all('jsCate','frameworkCate','articleCate','jsList','frameworks','articles',function(jsCates,frameworkCates,articleCates,jsList,frameworks,articles){
        res.render('front/index',{
            jsCates:jsCates,
            frameworkCates:frameworkCates,
            articleCates:articleCates,
            jsList:jsList,
            frameworks:frameworks,
            articles:articles,
            moment:moment,
            index:1
        })
    });
    jsCate.queryCate(function(err,docs){
        if(err){
            runLog.error("查询js代码分类失败结果如下\n", err);
        }else{
           if(docs){
               runLog.info("查询js代码分类成功结果如下\n", docs);
               proxy.emit('jsCate',docs);
           }
        }
    });

    frameworkCate.queryFrameworkCate(function(err,docs){
        if(err){
            runLog.error("查询js框架分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询框架成功结果如下\n", docs);
                proxy.emit('frameworkCate',docs);
            }
        }
    });

    articleCate.queryArticleCate(function(err,docs){
        if(err){
            runLog.error("查询文章分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询文章分类成功结果如下\n", docs);
                proxy.emit('articleCate',docs);
            }
        }
    });

    jsCateCode.queryAll({limit:12},function(err,docs){
        if(err){
            runLog.error("查询js代码列表错误\n",err);
        }else{
            runLog.info("查询js代码列表结果如下\n", docs);
            proxy.emit('jsList',docs);
        }
    });

    framework.queryAll({limit:12},function(err,docs){
        if(err){
            runLog.error("查询WEB前端框架文章失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询WEB前端框架文章成功结果如下\n", docs);
                proxy.emit('frameworks',docs);
            }
        }
    });
    article.queryAll({limit:12},function(err,docs){
        if(err){
            runLog.error("查询所有分类文章失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询所有分类文章成功结果如下\n", docs);
                proxy.emit('articles',docs);
            }
        }
    });

};
