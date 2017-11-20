const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const io = require('socket.io');
const url = require('url');
const regs = require('./libs/regs.js');

//链接数据库
  let db = mysql.createPool({host:'localhost',user:'root',password:'123456',database:'chatroom'});

//1.创建http服务
  let httpServer = http.createServer(function (request,response) {
    let str=request.url;
    //第一种解析字符串方法
    //let [project,agu] = url.split('?');   //es6中结构赋值
    let {pathname,query}= url.parse(str,true);
    //  console.log(pathname);
    //  console.log(query);
    //console.log(query);
    //如果请求的是注册接口
    if(pathname == '/signin'){
      //console.log('请求了注册接口');
      let {username,password} = query;  //接到数据
      // console.log(username);
      // console.log(password);
      //第一步，验证是否符合注册要求
      if(!regs.usernameP.test(username)){
        response.write(JSON.stringify({code:1,msg:'不符合命名规范！'}));
        response.end();
      }else if (!regs.passwordP.test(password)) {
        response.write(JSON.stringify({code:1,msg:'密码过于简单！'}));
        response.end();
      }else{
        //第二步，查看数据库是否存在此用户名
        db.query(`SELECT ID FROM user WHERE user_name='${username}'`,function (err,data) {
          if(err){
            response.write(JSON.stringify({code:1,msg:`数据库有错！`}));
            response.end();
          }else if(data.length>0){
            response.write(JSON.stringify({code:1,msg:`此用户已经存在！`}));
            response.end();
          }else{
            //第三步，插入数据库
            db.query(`INSERT INTO user(user_name,user_pass,on_line)VALUES('${username}','${password}',0)`,function(err){
              if(err){
                response.write(JSON.stringify({code:1,msg:'数据出错'}));
                response.end();
              }else {
                response.write(JSON.stringify({code:0,msg:'注册成功'}));
                response.end();
              }
            });
          }
        });
      }
    }else if(pathname == '/login'){ //如果请求的是登录接口
      //console.log('请求了登录接口');
      //1.校验命名是否规范
      let {username,password} = query;
      if (!regs.usernameP.test(username)) {
        response.write(JSON.stringify({code:1,msg:'输入的用户名不符合规范'}));
        response.end();
      } else if(!regs.passwordP.test(password)){
        response.write(JSON.stringify({code:1,msg:'输入的密码不符合规范'}));
        response.end();
      } else {
        //2.查询出改用户名的id和密码做校验
        db.query(`SELECT ID,user_pass FROM user WHERE user_name='${username}'`,function (err,data) {
          if(err){
            response.write(JSON.stringify({code:1,msg:'数据出错'}));
            response.end();
          }else if (data[0].user_pass != password) {
            response.write(JSON.stringify({code:1,msg:'用户名或密码错误'}));
            response.end();
          }else if (data.length == 0) {
            response.write(JSON.stringify({code:1,msg:'用户不存在'}));
            response.end();
          }else{
            //3.登录成功
            //修改登录状态
            db.query(`UPDATE user SET on_line = 1 WHERE id=${data[0].ID}`,function (err,data) {
              if (err) {
                response.write(JSON.stringify({code:1,msg:'数据库出错'}));
                response.end();
              } else {
                response.write(JSON.stringify({code:0,msg:'登录成功'}));
                response.end();
              }
            });
          }
        });
      }
    }else{
      fs.readFile(`www${pathname}`,function (err,data) {
        if (err) {
          response.writeHeader(404);
          response.write('NOT Found');
          response.end();
        } else {
          response.write(data);
          response.end();
        }
      });
    }
  });
  httpServer.listen(8080);
