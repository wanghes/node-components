var jsCate = require('../../model/jsCate');
var jsCateCode = require('../../model/jsCateCode');
var eventproxy = require('eventproxy');
var fs = require('fs');
var multiparty = require('multiparty');

exports.addCode = function(req,res){
    var proxy = new eventproxy();
    proxy.all('jsCates',function(jsCates){
        console.log(jsCates);
        res.render('admin/addCode',{
            title:'添加代码',
            crumbs:[
                {selected:2,value:"管理JS代码"},
                {selected:2,value:"添加JS代码"}
            ],
            jsCates:jsCates,
            adminUser:req.session.user
        });
    });

    jsCate.queryCate(function(err,docs){
        if(err){
            console.log(err);
        }else{
            if(docs){
                proxy.emit('jsCates',docs);
            }
        }
    });
};

exports.imageFile = function(req, res){
    var form = new multiparty.Form({uploadDir: './upload/jscode'});
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files,null,2);
        if(err){
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            //console.log(files);
            var inputFile = files.photo[0];
            var uploadedPath = inputFile.path;
            var ext = inputFile.originalFilename.substr(inputFile.originalFilename.indexOf('.')+1);
            var date = new Date().getTime();
            var dstPath = './upload/jscode/' + date+'.'+ext;
            fs.rename(uploadedPath, dstPath, function(err) {  //重命名为真实文件名
                if(err){
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                    res.send('<img id="showImg" src="/upload/jscode/'+date+'.'+ext+'">');
                }
            });
        }
    });
};


exports.doAddCode = function(req,res){
    var body = req.body;
    if(body.imgpath==''){
        body.imgpath = '/static/images/default.jpg';
    }
    jsCateCode.save(body,function(err,doc){
        if(err){
            res.json({status:false,message:'lose!'});
        }else{
            res.json({status:true,message:'ok!'});
        }
    });
};

exports.editCode = function(req,res){
    var id = req.params.id;
    var proxy = new eventproxy();
    proxy.all('jsCode','jsCates',function(jsCode,jsCates){
        res.render('admin/editCode',{
            title:"JS代码修改",
            crumbs:[
                {selected:2,value:"管理JS代码"},
                {selected:3,value:"查看所有代码列表 > "+jsCode['title']}
            ],
            jsCode:jsCode,
            jsCates:jsCates,
            adminUser:req.session.user
        })
    });
    jsCate.queryCate(function(err,docs){
        if(err){
            console.log(err);
        }else{
            if(docs){
                proxy.emit('jsCates',docs);
            }
        }
    });
    jsCateCode.getById(id,function(err,docs){
        if(err){
            console.log(err);
        }else{
            if(docs){
                proxy.emit('jsCode',docs);
            }
        }
    });
};

exports.doEditCode = function(req,res){
    var body = req.body;
    var id = req.params.id;
    if(body.imgpath==''){
        body.imgpath = '/static/images/default.jpg';
    }
    delete body.id;
    jsCateCode.edit(id,body,function(err,doc){
        if(err){
            res.json({status:false,message:'lose!'});
        }else{
            console.log(doc);
            res.json({status:true,message:'ok!'});
        }
    });
};

exports.deleteCode = function(req,res){
    var id = req.params.id;
    var options = {};
    jsCateCode.delete(id,options,function(err,doc){
        if(err){
            res.json({status:false,message:'lose!'});
        }else{
            console.log(doc);
            res.json({status:true,message:'delete ok!'});
        }
    });
};

exports.queryAll = function(req,res){
    var proxy = new eventproxy();
    proxy.all('jsCateCodes',function(jsCateCodes){
        res.render('admin/codeList',{
            title:"查看所有JS代码列表",
            crumbs:[
                {selected:2,value:"管理JS代码"},
                {selected:3,value:"查看所有JS代码列表"}
            ],
            jsCateCodes:jsCateCodes,
            adminUser:req.session.user
        })
    });
    jsCateCode.queryAll({},function(err,docs){
        if(err){
            console.log(err);
        }else{
            if(docs){
                proxy.emit('jsCateCodes',docs);
            }
        }
    });
};

exports.cateList = function(req,res){
    var cateId = req.params.cateid;
    var proxy = new eventproxy();

    proxy.all('lists','cate',function(lists,cate){
        res.render('admin/jsCateList',{
            title:'JS代码列表',
            crumbs:[
                {selected:2,value:"管理JS代码 > 分类【" + cate['name'] +"】代码列表"}
            ],
            lists:lists,
            adminUser:req.session.user
        })
    });

    jsCateCode.getByCateId(cateId,null,function(err,docs){
        if(err){
            console.log(err);
        }else{
            proxy.emit('lists',docs);
        }
    });
    jsCate.getById(cateId,function(err,doc){
        if(err){
            console.log(err);
        }else{
            proxy.emit('cate',doc);
        }
    });
};

exports.queryById = function(req,res){
    var id = req.params.id;
    var proxy = new eventproxy();
    proxy.all('jsCode',function(jsCode){
        res.render('admin/codeOne',{
            title:"代码文章",
            crumbs:[
                {selected:2,value:"管理JS代码"},
                {selected:3,value:"查看所有代码列表 > "+jsCode['title']}
            ],
            jsCode:jsCode,
            adminUser:req.session.user
        })
    });
    jsCateCode.getById(id,function(err,docs){
        if(err){
            console.log(err);
        }else{
            if(docs){
                proxy.emit('jsCode',docs);
            }
        }
    });
};
