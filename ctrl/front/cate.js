var jsCate = require('../../model/jsCate');
var frameworkCate = require('../../model/frameworkCate');
var articleCate = require('../../model/articleCate');
var js = require('../../model/jsCateCode');
var framework = require('../../model/framework');
var article = require('../../model/article');
var runLog = require("../../lib/log/log").logger("前端分类");
var eventProxy = require('eventproxy');
var moment = require('moment');

exports.jsIndex = function(req,res){
    var proxy = new eventProxy();
    var page = parseInt(req.params.page ? req.params.page : 1);
    var limit = 50;
    proxy.all('jsCates','frameworkCates','articleCates','jsCodes','counts',function(jsCates,frameworkCates,articleCates,jsCodes,counts){

        var i_length = Math.ceil(counts/limit);
        var i_arr = [];

        for(var i=1; i<=i_length; i++){
            i_arr.push(i);
        }
        var pageInfo = {
            counts:counts,
            pageList:i_arr,
            active:page
        };
        res.render('front/jsIndex',{
            jsCates:jsCates,
            frameworkCates:frameworkCates,
            articleCates:articleCates,
            jsCodes:jsCodes,
            pageInfo:pageInfo,
            moment:moment,
            index:2
        })
    });
    jsCate.queryCate(function(err,docs){
        if(err){
            runLog.error("查询代码分类的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询代码分类的分类成功结果如下\n", docs);
                proxy.emit('jsCates',docs);
            }
        }
    });
    frameworkCate.queryFrameworkCate(function(err,docs){
        if(err){
            runLog.error("查询WEb前端开发框架的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询WEB前端开发框架的分类成功结果如下\n", docs);
                proxy.emit('frameworkCates',docs);
            }
        }
    });

    articleCate.queryArticleCate(function(err,docs){
        if(err){
            runLog.error("查询全栈试开发社区的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询全栈试开发社区的分类成功结果如下\n", docs);
                proxy.emit('articleCates',docs);
            }
        }
    });

    js.queryCounts(function(err,number){
        if(err){
            runLog.error('查询代码分类总文章数失败结果如下\n',err);
        }else{
            if(number){
                runLog.info('查询代码分类总文章数成功结果如下\n',number);
                proxy.emit('counts',number);
            }
        }
    });

    js.queryAll({limit:limit,page:page},function(err,docs){
        if(err){
            runLog.error('查询代码分类全部文章失败结果如下\n',err);
        }else{
            if(docs){
                runLog.info('查询代码分类全部文章成功结果如下\n',docs);
                proxy.emit('jsCodes',docs);
            }
        }
    })
};


exports.frameworkIndex = function(req,res){
    var proxy = new eventProxy();
    var page = parseInt(req.params.page ? req.params.page : 1);
    var limit = 10;
    proxy.all('jsCates','frameworkCates','articleCates','frameworks','counts',function(jsCates,frameworkCates,articleCates,frameworks,counts){
        var i_length = Math.ceil(counts/limit);
        var i_arr = [];

        for(var i=1; i<=i_length; i++){
            i_arr.push(i);
        }
        var pageInfo = {
            counts:counts,
            pageList:i_arr,
            active:page
        };

        res.render('front/frameworkIndex',{
            jsCates:jsCates,
            frameworkCates:frameworkCates,
            articleCates:articleCates,
            frameworks:frameworks,
            pageInfo:pageInfo,
            moment:moment,
            index:2
        })
    });
    jsCate.queryCate(function(err,docs){
        if(err){
            runLog.error("查询代码分类的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询代码分类的分类成功结果如下\n", docs);
                proxy.emit('jsCates',docs);
            }
        }
    });
    frameworkCate.queryFrameworkCate(function(err,docs){
        if(err){
            runLog.error("查询WEb前端开发框架的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询WEB前端开发框架的分类成功结果如下\n", docs);
                proxy.emit('frameworkCates',docs);
            }
        }
    });

    articleCate.queryArticleCate(function(err,docs){
        if(err){
            runLog.error("查询全栈试开发社区的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询全栈试开发社区的分类成功结果如下\n", docs);
                proxy.emit('articleCates',docs);
            }
        }
    });

    framework.queryCounts(function(err,number){
        if(err){
            runLog.error('查询WEB前端开发框架总文章数失败结果如下\n',err);
        }else{
            runLog.info('查询WEB前端开发框架总文章数成功结果如下\n',number);
            proxy.emit('counts',number);
        }
    });

    framework.queryAll({limit:16},function(err,docs){
        if(err){
            runLog.error('查询WEB前端开发框架全部文章失败结果如下\n',err);
        }else{
            if(docs){
                runLog.info('查询WEb前端开发框架全部文章成功结果如下\n',docs);
                proxy.emit('frameworks',docs);
            }
        }
    })
};


exports.articleIndex = function(req,res){
    var proxy = new eventProxy();
    var page = parseInt(req.params.page ? req.params.page : 1);
    var limit = 10;
    proxy.all('jsCates','frameworkCates','articleCates','articles','counts',function(jsCates,frameworkCates,articleCates,articles,counts){
        var i_length = Math.ceil(counts/limit);
        var i_arr = [];

        for(var i=1; i<=i_length; i++){
            i_arr.push(i);
        }
        var pageInfo = {
            counts:counts,
            pageList:i_arr,
            active:page
        };

        res.render('front/articleIndex',{
            jsCates:jsCates,
            frameworkCates:frameworkCates,
            articleCates:articleCates,
            articles:articles,
            moment:moment,
            pageInfo:pageInfo,
            index:2
        })
    });
    jsCate.queryCate(function(err,docs){
        if(err){
            runLog.error("查询代码分类的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询代码分类的分类成功结果如下\n", docs);
                proxy.emit('jsCates',docs);
            }
        }
    });
    frameworkCate.queryFrameworkCate(function(err,docs){
        if(err){
            runLog.error("查询WEb前端开发框架的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询WEB前端开发框架的分类成功结果如下\n", docs);
                proxy.emit('frameworkCates',docs);
            }
        }
    });

    articleCate.queryArticleCate(function(err,docs){
        if(err){
            runLog.error("查询全栈试开发社区的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询全栈试开发社区的分类成功结果如下\n", docs);
                proxy.emit('articleCates',docs);
            }
        }
    });

    article.queryCounts(function(err,number){
        if(err){
            runLog.error('查询全栈试开发社区总文章数失败结果如下\n',err);
        }else{
            runLog.info('查询全栈试开发社区总文章数成功结果如下\n',number);
            proxy.emit('counts',number);
        }
    });

    article.queryAll({limit:limit,page:page},function(err,docs){
        if(err){
            runLog.error('查询全栈试开发社区全部文章失败结果如下\n',err);
        }else{
            if(docs){
                runLog.info('查询全栈试开发社区全部文章成功结果如下\n',docs);
                proxy.emit('articles',docs);
            }
        }
    })
};

exports.jsCateList = function(req,res){
    var proxy = new eventProxy();
    var cateId = req.params.id;
    var limit = 18;
    var page = req.params.page ? req.params.page : 1;
    proxy.all('jsCate','frameworkCate','articleCate','jsCodes','cateName','counts',function(jsCates,frameworkCates,articleCates,jsCodes,cateName,counts){
        var i_arr = [];
        var pageInfo = null;
        if(counts>0){
            var i_length = Math.ceil(counts/limit);
            for(var i=1; i<=i_length; i++){
                i_arr.push(i);
            }
            pageInfo = {
                counts:counts,
                pageList:i_arr,
                active:page
            };
        }

        res.render('front/jsCateCode',{
            jsCates:jsCates,
            frameworkCates:frameworkCates,
            articleCates:articleCates,
            jsCodes:jsCodes,
            moment:moment,
            cateId:cateId,
            pageInfo:pageInfo,
            cateName:cateName,
            index:2
        })
    });

    jsCate.queryCate(function(err,docs){
        if(err){
            runLog.error("查询代码分类的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询代码分类的分类成功结果如下\n", docs);
                docs.forEach(function(ele,index){
                    if(ele['cateid']==cateId){
                        proxy.emit('cateName',ele['name']);
                    }
                });
                proxy.emit('jsCate',docs);
            }
        }
    });

    frameworkCate.queryFrameworkCate(function(err,docs){
        if(err){
            runLog.error("查询WEB前端开发框架的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询WEB前端开发框架的分类成功结果如下\n", docs);
                proxy.emit('frameworkCate',docs);
            }
        }
    });

    articleCate.queryArticleCate(function(err,docs){
        if(err){
            runLog.error("查询全栈试开发社区的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询全栈试开发社区的分类成功结果如下\n", docs);
                proxy.emit('articleCate',docs);
            }
        }
    });

    js.queryCateCounts(cateId,function(err,number){
        if(err){
            runLog.error('查询代码分类为'+cateId+'的文章总数失败结果如下\n',err);
        }else{
            runLog.info('查询代码分类为'+cateId+'的文章总数成功结果如下\n',number);
            proxy.emit('counts',number);
        }
    });

    js.getByCateId(cateId,{limit:limit,page:page},function(err,docs){
        if(err){
            runLog.error('查询代码分类为'+cateId+'的文章失败\n',err);
        }else{
            if(docs){
                runLog.info('查询代码分类为'+cateId+'的文章成功\n',docs);
                proxy.emit('jsCodes',docs);
            }
        }
    })
};


exports.jsCodeDetail = function(req,res){
    var proxy = new eventProxy();
    var cateId = req.params.id;
    var did = req.params.did;
    proxy.all('jsCate','frameworkCate','articleCate','code','cateName','prev','next',function(jsCates,frameworkCates,articleCates,code,cateName,prev,next){
        res.render('front/jsCateCodeDetail',{
            jsCates:jsCates,
            frameworkCates:frameworkCates,
            articleCates:articleCates,
            code:code,
            prev:prev,
            next:next,
            moment:moment,
            cateName:cateName,
            index:2
        })
    });

    jsCate.queryCate(function(err,docs){
        if(err){
            runLog.error("查询代码分类的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询代码分类的分类成功结果如下\n", docs);
                docs.forEach(function(ele,index){
                    if(ele['cateid']==cateId){
                        proxy.emit('cateName',ele['name']);
                    }
                });
                proxy.emit('jsCate',docs);
            }
        }
    });

    frameworkCate.queryFrameworkCate(function(err,docs){
        if(err){
            runLog.error("查询全栈试开发社区的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询WEB前端开发框架的分类成功结果如下\n", docs);
                proxy.emit('frameworkCate',docs);
            }
        }
    });

    articleCate.queryArticleCate(function(err,docs){
        if(err){
            runLog.error("查询全栈试开发社区的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询全栈试开发社区的分类成功结果如下\n", docs);
                proxy.emit('articleCate',docs);
            }
        }
    });

    js.getById(did,function(err,doc){
        if(err){
            runLog.error('查询代码分类文章失败结果如下\n',err);
        }else{
            if(doc){
                runLog.info('查询代码分类文章成功结果如下\n',doc);
                js.getPrevIdByDate(doc.date,function(err,prev){
                    if(err){
                        runLog.error('查询代码分类上一篇文章失败结果如下\n',err);
                    }else{
                        if(doc){
                            runLog.info('查询代码分类上一篇文章成功结果如下\n',prev);
                            proxy.emit('prev',prev);
                        }
                    }
                });

                js.getNextIdByDate(doc.date,function(err,next){
                    if(err){
                        runLog.error('查询代码分类下一篇文章失败结果如下\n',err);
                    }else{
                        if(doc){
                            runLog.info('查询代码分类下一篇文章成功结果如下\n',next);
                            proxy.emit('next',next);
                        }
                    }
                });
                proxy.emit('code',doc);
            }
        }
    });

};



exports.frameworksList = function(req,res){
    var proxy = new eventProxy();
    var cateId = req.params.id;
    var limit = 10;
    var page = req.params.page ? req.params.page : 1;
    proxy.all('jsCate','frameworkCate','articleCate','frameworks','cateName','counts',function(jsCates,frameworkCates,articleCates,frameworks,cateName,counts){
        var i_arr = [];
        var pageInfo = null;
        if(counts>0){
            var i_length = Math.ceil(counts/limit);
            for(var i=1; i<=i_length; i++){
                i_arr.push(i);
            }
            pageInfo = {
                counts:counts,
                pageList:i_arr,
                active:page
            };
        }
        res.render('front/frameworks',{
            jsCates:jsCates,
            frameworkCates:frameworkCates,
            articleCates:articleCates,
            frameworks:frameworks,
            moment:moment,
            pageInfo:pageInfo,
            cateId:cateId,
            cateName:cateName,
            index:2
        })
    });

    jsCate.queryCate(function(err,docs){
        if(err){
            runLog.error("查询代码分类的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询代码分类的分类成功结果如下\n", docs);
                proxy.emit('jsCate',docs);
            }
        }
    });

    frameworkCate.queryFrameworkCate(function(err,docs){
        if(err){
            runLog.error("查询全栈试开发社区的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询WEB前端开发框架的分类成功结果如下\n", docs);
                docs.forEach(function(ele,index){
                    if(ele['cateid']==cateId){
                        proxy.emit('cateName',ele['name']);
                    }
                });
                proxy.emit('frameworkCate',docs);
            }
        }
    });

    articleCate.queryArticleCate(function(err,docs){
        if(err){
            runLog.error("查询全栈试开发社区的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询全栈试开发社区的分类成功结果如下\n", docs);
                proxy.emit('articleCate',docs);
            }
        }
    });

    framework.queryCateCounts(cateId,function(err,number){
        if(err){
            runLog.error('查询WEB前端开发框架分类为'+cateId+'的文章总数失败结果如下\n',err);
        }else{
            runLog.info('查询WEB前端开发框架分类为'+cateId+'的文章总数成功结果如下\n',number);
            proxy.emit('counts',number);
        }
    });

    framework.getByCateId(cateId,{limit:limit,page:page},function(err,docs){
        if(err){
            runLog.error('查询WEB前端开发框架分类为'+cateId+'的文章失败结果如下\n',err);
        }else{
            if(docs){
                runLog.info('查询WEB前端开发框架分类为'+cateId+'的文章成功结果如下\n',docs);
                proxy.emit('frameworks',docs);
            }
        }
    })
};


exports.frameworkDetail = function(req,res){
    var proxy = new eventProxy();
    var cateId = req.params.id;
    var did = req.params.did;
    proxy.all('jsCate','frameworkCate','articleCate','framework','cateName','prev','next',function(jsCates,frameworkCates,articleCates,framework,cateName,prev,next){
        res.render('front/frameworkDetail',{
            jsCates:jsCates,
            frameworkCates:frameworkCates,
            articleCates:articleCates,
            framework:framework,
            prev:prev,
            next:next,
            moment:moment,
            cateName:cateName,
            index:2
        })
    });

    jsCate.queryCate(function(err,docs){
        if(err){
            runLog.error("查询代码分类的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询代码分类的分类成功结果如下\n", docs);
                proxy.emit('jsCate',docs);
            }
        }
    });

    frameworkCate.queryFrameworkCate(function(err,docs){
        if(err){
            runLog.error("查询WEB前端开发框架的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询WEB前端开发框架的分类成功结果如下\n", docs);
                docs.forEach(function(ele,index){
                    if(ele['cateid']==cateId){
                        proxy.emit('cateName',ele['name']);
                    }
                });
                proxy.emit('frameworkCate',docs);

            }
        }
    });

    articleCate.queryArticleCate(function(err,docs){
        if(err){
            runLog.error("查询全栈试开发社区的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询全栈试开发社区的分类成功结果如下\n", docs);
                proxy.emit('articleCate',docs);
            }
        }
    });

    framework.getById(did,function(err,doc){
        if(err){
            runLog.error('查询WEB前端开发框架文章失败结果如下\n',err);
        }else{
            if(doc){
                runLog.info('查询WEB前端开发框架文章成功结果如下\n',doc);
                framework.getPrevIdByDate(doc.date,function(err,prev){
                    if(err){
                        runLog.error('查询WEB前端开发框架上一篇文章失败结果如下\n',err);
                    }else{
                        if(doc){
                            runLog.info('查询WEB前端开发框架上一篇文章成功结果如下\n',prev);
                            proxy.emit('prev',prev);
                        }
                    }
                });

                framework.getNextIdByDate(doc.date,function(err,next){
                    if(err){
                        runLog.error('查询WEB前端开发框架下一篇文章失败结果如下\n',err);
                    }else{
                        if(doc){
                            runLog.info('查询WEB前端开发框架下一篇文章成功结果如下\n',next);
                            proxy.emit('next',next);
                        }
                    }
                });
                proxy.emit('framework',doc);
            }
        }
    });

};



exports.articleCateList = function(req,res){
    var proxy = new eventProxy();
    var cateId = req.params.id;
    var limit = 10;
    var page = req.params.page ? req.params.page : 1;
    proxy.all('jsCate','frameworkCate','articleCate','articles','cateName','counts',function(jsCates,frameworkCates,articleCates,articles,cateName,counts){
        var i_arr = [];
        var pageInfo = null;
        if(counts>0){
            var i_length = Math.ceil(counts/limit);
            for(var i=1; i<=i_length; i++){
                i_arr.push(i);
            }
            pageInfo = {
                counts:counts,
                pageList:i_arr,
                active:page
            };
        }
        res.render('front/articles',{
            jsCates:jsCates,
            frameworkCates:frameworkCates,
            articleCates:articleCates,
            articles:articles,
            moment:moment,
            pageInfo:pageInfo,
            cateId:cateId,
            cateName:cateName,
            index:2
        })
    });

    jsCate.queryCate(function(err,docs){
        if(err){
            runLog.error("查询代码分类的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询代码分类的分类成功结果如下\n", docs);
                proxy.emit('jsCate',docs);
            }
        }
    });

    frameworkCate.queryFrameworkCate(function(err,docs){
        if(err){
            runLog.error("查询WEB前端开发框架的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询WEB前端开发框架的分类成功结果如下\n", docs);
                proxy.emit('frameworkCate',docs);
            }
        }
    });

    articleCate.queryArticleCate(function(err,docs){
        if(err){
            runLog.error("查询全栈试开发社区的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询全栈试开发社区的分类成功结果如下\n", docs);
                docs.forEach(function(ele,index){
                    if(ele['cateid']==cateId){
                        proxy.emit('cateName',ele['name']);
                    }
                });
                proxy.emit('articleCate',docs);
            }
        }
    });

    article.queryCateCounts(cateId,function(err,number){
        if(err){
            runLog.error('查询全栈试开发社区分类为'+cateId+'的文章总数失败结果如下\n',err);
        }else{
            runLog.info('查询全栈试开发社区分类为'+cateId+'的文章总数成功结果如下\n',number);
            proxy.emit('counts',number);
        }
    });

    article.getByCateId(cateId,{limit:limit,page:page},function(err,docs){
        if(err){
            runLog.error('查询全栈试开发社区分类为'+cateId+'的文章失败结果如下结果如下\n',err);
        }else{
            if(docs){
                runLog.info('查询全栈试开发社区分类为'+cateId+'的文章成功结果如下结果如下\n',docs);
                proxy.emit('articles',docs);
            }
        }
    })
};


exports.articleDetail = function(req,res){
    var proxy = new eventProxy();
    var cateId = req.params.id;
    var did = req.params.did;

    proxy.all('jsCate','frameworkCate','articleCate','article','cateName','next','prev',function(jsCates,frameworkCates,articleCates,article,cateName,next,prev){
        res.render('front/articleDetail',{
            jsCates:jsCates,
            frameworkCates:frameworkCates,
            articleCates:articleCates,
            article:article,
            prev:prev,
            next:next,
            moment:moment,
            cateName:cateName,
            index:2
        })
    });

    jsCate.queryCate(function(err,docs){
        if(err){
            runLog.error("查询代码分类的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询代码分类的分类成功结果如下\n", docs);
                proxy.emit('jsCate',docs);
            }
        }
    });

    frameworkCate.queryFrameworkCate(function(err,docs){
        if(err){
            runLog.error("查询WEB前端开发框架的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询WEB前端开发框架的分类成功结果如下\n", docs);
                proxy.emit('frameworkCate',docs);

            }
        }
    });

    articleCate.queryArticleCate(function(err,docs){
        if(err){
            runLog.error("查询全栈试开发社区的分类失败结果如下\n", err);
        }else{
            if(docs){
                runLog.info("查询全栈试开发社区的分类成功结果如下\n", docs);
                docs.forEach(function(ele,index){
                    if(ele['cateid']==cateId){
                        proxy.emit('cateName',ele['name']);
                    }
                });
                proxy.emit('articleCate',docs);
            }
        }
    });

    article.getById(did,function(err,doc){
        if(err){
            runLog.error('查询全栈试开发社区文章失败结果如下\n',err);
        }else{
            if(doc){
                runLog.info('查询全栈试开发社区文章成功结果如下\n',doc);
                article.getPrevIdByDate(doc.date,function(err,prev){
                    if(err){
                        runLog.error('查询全栈试开发社区上一篇文章失败结果如下\n',err);
                    }else{
                        if(doc){
                            runLog.info('查询全栈试开发社区上一篇文章成功结果如下\n',prev);
                            proxy.emit('prev',prev);
                        }
                    }
                });

                article.getNextIdByDate(doc.date,function(err,next){
                    if(err){
                        runLog.error('查询全栈试开发社区下一篇文章失败结果如下\n',err);
                    }else{
                        if(doc){
                            runLog.info('查询全栈试开发社区下一篇文章成功结果如下\n',next);
                            proxy.emit('next',next);
                        }
                    }
                });

                proxy.emit('article',doc);
            }
        }
    });
};
