var articleCate = require('../../model/articleCate');
var eventProxy = require('eventproxy');
var runLog = require('../../lib/log/log').logger('文章分类');


exports.articleCate = function(req,res){
    res.render('admin/articleCate',{
        title:'添加文章分类',
        crumbs:[
            {selected:4,value:"管理JS代码"},
            {selected:1,value:"添加文章分类"}
        ],
        adminUser:req.session.user
    });
};

exports.doArticleCate = function(req,res){
    var body = req.body;
    if(body.cateid=='' || body.name==''){
        return res.json({status:false,message:'每项都是必填项！'});
    }
    articleCate.add(body,function(err,doc){
        if(err){
            runLog.error('添加文章失败：\n',err);
            res.json({status:false,message:JSON.stringify(err)});
        }else{
            runLog.info('添加文章成功：\n',doc);
            res.json({status:true,message:"添加成功！"});
        }
    });
};

exports.queryArticleCate = function(req,res){
    var proxy = new eventProxy();
    proxy.all('articles',function(articles){
        res.json({status:true,docs:articles,message:'fetch ok'});
    });
    articleCate.queryArticleCate(function(err,docs){
        if(err){
            runLog.error('查询文章失败：\n',err);
            res.json({status:true,message:err});
        }else{
            runLog.info('查询文章成功：\n',docs);
            proxy.emit('articles',docs);
        }
    });
};

