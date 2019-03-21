//app.js
//1:加载模块 express
const express = require("express");
const session=require("express-session");
const bodyParser=require("body-parser");
const users = require("./router/users");
//加载处理跨域的模块

//2:创建express
var app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const cors=require("cors");
app.use(cors({
  origin:['http://localhost:8080'],
  credentials:true
}))
//3:绑定监听端口 
app.listen(5050,console.log('后台开启成功'));
//4:指定静态目录 public
//__dirname 当前程序所有目录完整路径
//console.log(__dirname)
app.use(session({
  secret:'随机字符串',
  resave:false,
  saveUninitialized:true
}))
app.use(express.static(__dirname+"/static"));
app.use("/api/users",users);