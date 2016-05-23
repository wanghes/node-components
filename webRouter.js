var express = require('express');
var router = express.Router();
var adminCtrl = require('./ctrl/admin/index');
var userCtrl = require('./ctrl/admin/user');
var jsCateCtrl = require('./ctrl/admin/jsCate');
var frameworkCtrl = require('./ctrl/admin/frameworkCate');
var articleCtrl = require('./ctrl/admin/articleCate');
var jsCateCodeCtrl = require('./ctrl/admin/jsCateCode');
var frameworkInfoCtrl = require('./ctrl/admin/framework');
var articleInfoCtrl = require('./ctrl/admin/article');
var frontIndexCtrl = require('./ctrl/front/index');
var cateCtrl = require('./ctrl/front/cate');




/**
 * 当我们一个页面需要登录的时候才能访问时，就需要控制用户在没有登录的时候，自动跳转到登录页面去执行登录。
 * */
function requiredAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
       // req.session.error = 'Access denied!';
        res.redirect('/admin/login');
    }
}


/**
 * 在注册的时候，我们会校验用户注册的用户名是否已经存在数据库中，通过这个函数可以实现这个功能：
 * */
function userExist(req, res, next) {
    User.count({
        username: req.body.username
    }, function (err, count) {
        if (count === 0) {
            next();
        } else {
            req.session.error = "User Exist"
            res.redirect("/signup");
        }
    });
}

/**
 * @des 后台管理系统
 * */
router.get('/admin',requiredAuthentication,adminCtrl.index);
router.get('/admin/index',requiredAuthentication,adminCtrl.index);
router.get('/admin/list',requiredAuthentication,adminCtrl.list);

/************登录*************/
router.get('/admin/showRegister',requiredAuthentication,userCtrl.showRegister);
router.post('/admin/doRegister',userCtrl.doRegister);
router.get('/admin/login',userCtrl.login);
router.post('/admin/doLogin',userCtrl.doLogin);
router.get('/admin/logout',userCtrl.logout);


/************js代码分类*************/
router.get('/admin/jsCate',requiredAuthentication,jsCateCtrl.cate);
router.post('/admin/doJsCate',jsCateCtrl.doCate);
router.get('/admin/queryCate',jsCateCtrl.queryCate);
router.post('/admin/imageFile',jsCateCodeCtrl.imageFile);
router.get('/admin/addCode',requiredAuthentication,jsCateCodeCtrl.addCode);
router.post('/admin/doAddCode',jsCateCodeCtrl.doAddCode);
router.get('/admin/editCode/:id',requiredAuthentication,jsCateCodeCtrl.editCode);
router.post('/admin/doEditCode/:id',jsCateCodeCtrl.doEditCode);
router.get('/admin/deleteCode/:id',jsCateCodeCtrl.deleteCode);
router.get('/admin/jsCodes',requiredAuthentication,jsCateCodeCtrl.queryAll);
router.get('/admin/jsCodes/:id',requiredAuthentication,jsCateCodeCtrl.queryById);
router.get('/admin/jscodes/cate/:cateid',requiredAuthentication,jsCateCodeCtrl.cateList);

/************前端框架分类*************/
router.get('/admin/frameworkCate',requiredAuthentication,frameworkCtrl.frameworkCate);
router.post('/admin/doFrameworkCate',frameworkCtrl.doFrameworkCate);
router.get('/admin/queryFrameworkCate',requiredAuthentication,frameworkCtrl.queryFrameworkCate);
router.get('/admin/addFramework',requiredAuthentication,frameworkInfoCtrl.addFramework);
router.post('/admin/doAddFramework',frameworkInfoCtrl.doAddFramework);
router.get('/admin/editFramework/:id',requiredAuthentication,frameworkInfoCtrl.editFramework);
router.post('/admin/doEditFramework/:id',frameworkInfoCtrl.doEditFramework);
router.get('/admin/deleteFramework/:id',frameworkInfoCtrl.deleteFramework);
router.get('/admin/frameworks',requiredAuthentication,frameworkInfoCtrl.queryAll);
router.get('/admin/frameworks/:id',requiredAuthentication,frameworkInfoCtrl.queryById);
router.get('/admin/frameworks/cate/:cateid',requiredAuthentication,frameworkInfoCtrl.cateList);

/************文章分类*************/
router.get('/admin/articleCate',requiredAuthentication,articleCtrl.articleCate);
router.post('/admin/doArticleCate',articleCtrl.doArticleCate);
router.get('/admin/queryArticleCate',requiredAuthentication,articleCtrl.queryArticleCate);
router.get('/admin/addArticle',articleInfoCtrl.addArticle);
router.post('/admin/doAddArticle',articleInfoCtrl.doAddArticle);
router.get('/admin/editArticle/:id',requiredAuthentication,articleInfoCtrl.editArticle);
router.post('/admin/doEditArticle/:id',articleInfoCtrl.doEditArticle);
router.get('/admin/deleteArticle/:id',articleInfoCtrl.deleteArticle);
router.get('/admin/articles',requiredAuthentication,articleInfoCtrl.queryAll);
router.get('/admin/articles/:id',requiredAuthentication,articleInfoCtrl.queryById);
router.get('/admin/articles/cate/:cateid',requiredAuthentication,articleInfoCtrl.cateList);


/****************************************前端代码api部分********************************************/
/**
 * @des operater 前台操作
 * 添加操作
 * */
router.get('/', frontIndexCtrl.index);
/*router.get('/project/jQuery/citySelect', function (req, res) { res.sendFile('/project/jQuery/cityselect/index.html',{root:__dirname}); });*/
router.get('/jsCodes/index/:page',cateCtrl.jsIndex);
router.get('/frameworks/index/:page',cateCtrl.frameworkIndex);
router.get('/articles/index/:page',cateCtrl.articleIndex);
router.get('/jsCodes/cate/:id/:page',cateCtrl.jsCateList);
router.get('/frameworks/cate/:id/:page',cateCtrl.frameworksList);
router.get('/articles/cate/:id/:page',cateCtrl.articleCateList);
router.get('/jsCodes/cate/:id/detail/:did',cateCtrl.jsCodeDetail);
router.get('/frameworks/cate/:id/detail/:did',cateCtrl.frameworkDetail);
router.get('/articles/cate/:id/detail/:did',cateCtrl.articleDetail);




module.exports = router;
