var path = require("path");
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var RedisStore = require('connect-redis')(session);
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var log = require("./lib/log/log");
var route = require('./webRouter');
mongoose.connect('mongodb://localhost/webFront');

var sessionConfig = {
    secret: 'webFront',
    name: 'code',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie:{
        maxAge: 1000*60*60*24*30
    }
};

log.configure("worker");
var app = express();
if (app.get('env') === 'production'){
    app.set('trust proxy', 1);
    app.use(log.useLog());//去掉则不显示请求的log信息
    sessionConfig.cookie.secure = true;
    sessionConfig.cookie.httpOnly = true;
}else{
    sessionConfig.cookie.secure = false;
    sessionConfig.cookie.httpOnly = true;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('webFront'));
app.use(session(sessionConfig));
app.use(express.static(__dirname));
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');




app.use(route);
/*
app.use(function(req,res,next){
    if(req.session.user){
        res.redirect('/admin');
    }else{
        res.redirect('/');
    }
});
*/







var runLog = log.logger("worker");
app.set('port', process.env.PORT || 3001);
app.listen(app.get("port"),function(){
    runLog.info("start worker, pid is " + process.pid);
    runLog.info('请在浏览器中访问端口号为localhost:'+app.get('port')+'服务器地址');
});

process.on("uncaughtException", function(err) {
    runLog.error("Error caught in uncaughtException event:", err);
});
