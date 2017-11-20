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
  let pathname = request.url;
  fs.readFile(`www${pathname}`,function (err,data) {
    if(err){
      response.writeHeader(404);
      response.write('not found');
    }else{
      response.write(data);
    }
    response.end();
  });
});
  httpServer.listen(8080);

let aSock=[];
let  wsServer = io.listen(httpServer);
wsServer.on('connection',function (sock) {


  aSock.push(sock);


  let cur_username='';
  let cur_userID=0;
  //注册接口
  sock.on('signin',function (username,password) {
    //接到用户名和密码，进行验证
    //1.进行格式验证
    // console.log(username);
    // console.log(password);
    if(!regs.usernameP.test(username)){  //用户名不符合规则
      sock.emit('sign_ret',1,'不符合用户名命名要求');
    }else if (!regs.passwordP.test(password)) {
      sock.emit('sign_ret',1,'不符合用密码命名要求');
    }else{
      db.query(`SELECT ID FROM user WHERE user_name='${username}'`, (err, data)=>{
        if(err){
          sock.emit('sign_ret', 1, '数据库有错误');
        }else if(data.length>0){
          sock.emit('sign_ret', 1, '用户名已存在');
        }else{
          //3.插入
          db.query(`INSERT INTO user (user_name, user_pass, on_line) VALUES('${username}','${password}', 0)`, err=>{
            if(err){
              sock.emit('sign_ret', 1, '数据库有错误');
            }else{
              sock.emit('sign_ret', 0, '注册成功');
            }
          });
        }
      });
    }
  });

//登录接口
sock.on('login', (username, password)=>{
  //1.校验数据
  if(!regs.usernameP.test(username)){
    sock.emit('login_ret', 1, '用户名不符合规范');
  }else if(!regs.passwordP.test(username)){
    sock.emit('login_ret', 1, '密码不符合规范');
  }else{
    //2.用户信息
    db.query(`SELECT ID,user_pass FROM user WHERE user_name='${username}'`, (err, data)=>{
      if(err){
        sock.emit('login_ret', 1, '数据库有错');
      }else if(data.length==0){
        sock.emit('login_ret', 1, '此用户不存在');
      }else if(data[0].user_pass!=password){
        sock.emit('login_ret', 1, '用户名或密码有误');
      }else{
        //3.改在线状态
        db.query(`UPDATE user SET on_line=1 WHERE ID=${data[0].ID}`, err=>{
          if(err){
            sock.emit('login_ret', 1, '数据库有错');
          }else{
            sock.emit('login_ret', 0, '登陆成功');
            cur_username=username;
            cur_userID=data[0].ID;
          }
        });
      }
    });
  }
});

//发送消息
sock.on('msg', txt=>{
  if(!txt){
    sock.emit('msg_ret', 1, '消息文本不能为空');
  }else{
    //广播给所有人
    aSock.forEach(item=>{
      if(item==sock)return;

      item.emit('msg', cur_username, txt);
    });

    sock.emit('msg_ret', 0, '发送成功');
  }
});


//离线
sock.on('disconnect', function (){
  console.log(cur_userID);
  db.query(`UPDATE user SET on_line=0 WHERE ID=${cur_userID}`, err=>{
    if(err){
      console.log('数据库有错', err);
    }

    cur_username='';
    cur_userID=0;

    aSock=aSock.filter(item=>item!=sock);
  });
});

});
